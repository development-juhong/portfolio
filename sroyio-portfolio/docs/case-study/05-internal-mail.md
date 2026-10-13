# Internal Mail

## Problem

Sroyio 내부 메일은 메시지 한 행만 저장하면 발송이 끝나지 않습니다. 수신자의 Inbox Entry가 빠지면 부분 성공이 됩니다. 재시도 중복, BCC 노출, 필수 audit 누락, 발송 이후 알림 실패를 서로 다른 경계에서 다뤄야 합니다.

## Design

요청의 `Idempotency-Key` 헤더는 UUID 형식을 요구합니다. `mail_send_log`의 `(user_id, idem_key)` Unique Constraint와 `ON CONFLICT DO NOTHING`을 동시 멱등 요청의 DB 판정 경계로 둡니다. 같은 key와 같은 payload는 기존 결과를 반환하고, 다른 payload는 충돌로 거절합니다. `mail_recipient`에는 역할을 저장하고, 수신자의 상세 조회 응답에서 BCC 목록을 제외합니다. Source: `MailController`, `MailOperationsService`, `InternalMailService`, `MailSendLogRepository`.

## Transaction

`InternalMailService.send`는 ledger claim·완료, `mail_message`, `mail_recipient`, 발신자의 Sent Entry, 수신자의 Inbox Entry, DB 첨부 참조, 필수 audit를 한 Main PostgreSQL Transaction에 둡니다. 발신자·수신자 사용자 행을 정해진 순서로 잠그고 상태를 다시 확인합니다. 필수 audit가 실패하면 발송 DB 작업도 rollback합니다. commit 후 notification enqueue·전달의 실패는 이미 commit된 메일을 취소하지 않습니다.

## DB / Constraint / Index

- `V1__sroyio_v1_baseline.sql`: `mail_send_log(user_id, idem_key)` Unique Constraint.
- `V23__internal_mail_core.sql`: `mail_message`, `mail_recipient`, `mail_mailbox_entry`, `mail_draft`, `mail_attachment`; `mail_mailbox_entry(account_id, message_id, delivery_role)` Unique Constraint와 알림 대기 Entry Index.
- `mail_attachment.file_object_id`는 논리 참조이며 FK가 아닙니다. 물리 파일 준비·정리까지 DB 원자성에 포함하지 않습니다.

## Concurrency

`UserIdentityService.activeMailAccounts`는 사용자 ID 순서로 `FOR SHARE` 잠금을 얻습니다. Draft는 `FOR UPDATE`와 `row_version` 조건으로 충돌을 판단합니다. 발송 후 Inbox Entry의 `notification_pending`을 worker가 `FOR UPDATE SKIP LOCKED`로 선점해 delivery를 등록합니다. 이 후속 작업의 실패는 pending 상태를 남깁니다.

## Test

- **PASS:** `InternalMailRoutingTest` 6개. 내부·외부 메일 경로 선택을 단위 테스트에서 확인했습니다.
- **NOT_RUN:** `InternalMailCorePostgresTest`, `InternalMailAccountPostgresTest`. 발송 원자성, 동시 멱등성, BCC DB 격리, rollback, 계정 lifecycle의 PostgreSQL 동작은 이번 PASS 범위에 없습니다.

## Limitations

이 문서는 Sroyio 내부 메일만 다룹니다. Handy/GW 또는 외부 IMAP/SMTP 운영 결과와 합치지 않습니다. 물리 첨부 lifecycle은 발송 DB Transaction과 실패 경계가 다릅니다. 관련 구현은 패키징 커밋 `6f350b2f6`에서 확인했습니다.
