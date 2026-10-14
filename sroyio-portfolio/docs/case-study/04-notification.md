# Notification

## Problem

알림 원본의 DB 저장과 WebSocket 전달은 실패 시점이 다릅니다. 저장 후 전송이 실패할 수 있고, 전송 직후 연결이 끊기면 성공 여부를 알 수 없습니다. 확인 없이 재시도하면 중복 전달 가능성이 있습니다.

## Design

원본 `notification_item` 또는 메시지·메일과 전달 작업 `notification_delivery`를 분리합니다. Worker는 기한이 된 작업을 `FOR UPDATE SKIP LOCKED`로 선점하여 `PROCESSING`, claim token, 90초 lease, attempt를 기록합니다. 전송 결과가 불확실하면 UNKNOWN으로 남겨 확인되지 않은 자동 재전송을 피합니다. Source: `NotificationDeliveryWorker`, `NotificationDeliveryRepository`.

## Transaction

회의 알림의 원본 생성과 delivery 등록은 같은 DB Transaction에 둡니다. 시작 임박 알림은 기존 polling 대상이라 이 전달 경로에서 제외합니다. WebSocket I/O는 Worker의 별도 처리입니다. Mail Entry는 발송 DB commit 후 `notification_pending`을 가진 Entry를 별도 worker가 delivery로 등록합니다. 따라서 메일 발송 결과와 알림 전달 결과는 분리됩니다.

## DB / Constraint / Index

- `V1__sroyio_v1_baseline.sql`: `notification_state`는 사용자별 표시 상태 오버레이입니다.
- `V10__meeting_calendar_notification_lifecycle.sql`: `notification_item.dedupe_key` Unique Constraint.
- `V22__notification_delivery_outbox.sql`: 원본·수신자별 delivery Unique와 PENDING due·PROCESSING lease 부분 Index.
- `V23__internal_mail_core.sql`: mail Entry·수신자별 delivery Unique 및 FK.
- `V36__notification_delivery_attempt.sql`: 전송 시작 시점과 시도 이력.

## Concurrency

잠긴 작업은 다른 Worker가 건너뛰고 별도 작업을 선점합니다. 전송 직전에는 해당 회의 접근권, bot room 멤버십 또는 mail entry 접근권을 현재 상태로 확인합니다. lease가 만료됐을 때 전송 전인 작업은 재시도 대상으로 복구할 수 있지만, 전송 시작 뒤 결과가 불확실하면 UNKNOWN으로 남깁니다. `DELIVERED`는 당시 socket write 완료이며 앱 표시나 사용자 읽음의 증거는 아닙니다.

## Test

- **Unit Test PASS:** `NotificationDeliveryWorkerTest` 6개. 성공, 오프라인 재시도 요청, 전송 예외의 UNKNOWN, lease 상실, source access 상실, 재시작 복구 호출 순서를 Mock 기반으로 확인했습니다.
- **PostgreSQL Integration Test PASS (2026-10-13):** `NotificationDeliveryPostgresTest` 9개, `NotificationDeliveryAttemptPgTest` 3개, `InboxItemStatePgTest` 3개. 격리된 PostgreSQL에서 동시 Worker의 단일 선점, lease 만료·복구, UNKNOWN·시도 이력, Inbox 상태 변경을 확인했습니다.

## Limitations

모든 수신함 목록 항목의 원본 ACL을 조회할 때마다 재검증하는 구조는 아닙니다. 정확히 한 번 전달, 중복 전달 완전 방지, Index 성능 향상을 주장하지 않습니다.
