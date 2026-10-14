# Messenger

**Source Code:** [처리 흐름](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/main/java/com/sroyio/server/messenger/MessengerService.java) · [저장소와 중복 판정](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/main/java/com/sroyio/server/messenger/MessengerJdbcRepository.java) · [PostgreSQL 동시성 Test](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/test/java/com/sroyio/server/messenger/MessengerConcurrencyPostgresTest.java)

## Problem

네트워크 재시도와 중복 클릭으로 같은 전송 요청이 여러 번 도착할 수 있습니다. 사전 조회만으로 중복을 판단하면 동시 요청이 모두 미존재 상태를 읽을 수 있습니다. 방 참여자만 전송하고, 답글 부모 메시지는 같은 방에 있어야 합니다.

## Design

`room_id`, `sender_id`, `client_msg_id`의 부분 Unique Index를 중복 저장의 마지막 판정 경계로 둡니다. 저장소는 `ON CONFLICT … DO NOTHING`을 사용하고, 같은 키의 다른 payload는 fingerprint 비교 후 거절합니다. Source: `MessengerService`, `MessengerJdbcRepository`, `MessengerController`.

## Transaction

`MessengerService`는 메시지 저장, 새 루트 메시지의 방 미리보기·미읽음 갱신, fingerprint·멘션·스레드 팔로우 기록을 한 Transaction에서 처리합니다. Controller는 Service가 정상 반환한 뒤 새 메시지만 broadcast합니다. 따라서 실패가 전파된 요청은 성공 방송 경로에 도달하지 않습니다.

## DB / Constraint / Index

- `V1__sroyio_v1_baseline.sql`: `ux_msg_message_client`는 `client_msg_id IS NOT NULL`인 행의 `(room_id, sender_id, client_msg_id)`를 Unique하게 만듭니다.
- `V45__msg_message_revision_send_hash.sql`: 메시지 전송 fingerprint와 revision을 추가합니다.

## Concurrency

`MessengerJdbcRepository.bumpUnread`는 참여자 행을 `user_id` 순서로 `FOR UPDATE` 잠급니다. 과거 커밋 `2f14a7c55`의 deadlock 기록과 잠금 순서 변경이 이 선택의 근거입니다. 현재 동일 부하 조건에서 재측정한 성능 수치는 없습니다.

## Test

- **Unit Test PASS:** `MessengerServiceTest` 81개, `MessengerTxBoundaryTest` 24개. 동일 키·다른 payload 충돌, 다른 방 부모 거절, 전송 Transaction 경계와 실패 전파를 확인했습니다.
- **PostgreSQL Integration Test PASS (2026-10-13):** `MessengerJdbcRepositoryPgIntegrationTest` 8개. 격리된 PostgreSQL에서 동일 `clientMsgId`의 순차 재전송 멱등성과 부분 Unique Index를 사용하는 Repository SQL 동작을 확인했습니다.
- **별도 Concurrency Regression Test PASS (2026-10-13):** `MessengerConcurrencyPostgresTest` 2개. 동일 요청 8 threads × 10회(80 requests)는 회차마다 메시지 1건·중복 row 0건이었습니다. 서로 다른 발신자 3명 × 경로별 20회(120 requests)는 Service Transaction 경로와 참여자 잠금 SQL 경로에서 deadlock·timeout·부분 반영이 없었습니다. 기존 PostgreSQL Integration Test 61개 집계와 분리합니다.

## Limitations

일반 REST 전송의 비방송은 Controller의 호출 순서로 확인했습니다. 전용 롤백 방송 Test는 현재 PASS 범위에 없습니다. 별도 Concurrency Regression Test는 과거의 발신자별 잠금 대상 차이를 재현하지만, 당시의 정확한 부하 수치나 운영 환경을 재현한 것은 아닙니다. 과거 수정 기록을 현재 성능 향상 수치로 사용하지 않습니다.
