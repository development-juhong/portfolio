# Collaboration

## Problem

채널 Tab은 Item, Workflow Rule과 연결되고 Rule에는 Run과 실행 기록이 이어집니다. Tab 선삭제는 FK 충돌이나 부분 정리를 만들 수 있습니다. 산출물·기록의 삭제와 복원에는 동시 요청의 덮어쓰기를 막을 변경 판정이 필요합니다.

## Design

채널장 권한을 확인한 뒤 서버에서 Tab 삭제를 수행합니다. 연결 Rule을 `rule_id` 순서로 잠그고 RUNNING Run이 있으면 `WORKFLOW_RUNNING`으로 거절합니다. 산출물과 기록은 DB `row_version`과 요청 `expectedVersion`을 비교합니다. 별도의 `revision` 컬럼이나 `expectedRevision` 계약으로 표현하지 않습니다. Source: `ChannelTabController`, `ChannelTabService`, `WorkflowService`, `ChannelArtifactService`, `ChannelRecordService`.

## Transaction

`ChannelTabService.delete`와 `WorkflowService.deleteRulesForTab`은 같은 DB Transaction에 참여합니다. 삭제 순서는 `wf_run_action` → `wf_run` → `wf_bot_session` → `wf_rule` → `channel_tab`입니다. `channel_tab_item`은 Tab FK의 `ON DELETE CASCADE`로 정리됩니다. 중간 실패는 앞선 DB 변경도 rollback합니다. 성공 감사와 변경 broadcast는 Service 정상 반환 뒤 Controller에서 수행합니다.

## DB / Constraint / Index

- `V1__sroyio_v1_baseline.sql`: `wf_rule(room_id, tab_id)` → `channel_tab(room_id, tab_id)`는 `ON DELETE RESTRICT`; `wf_run` → Rule, `channel_tab_item` → Tab 관계를 정의합니다. Tab에는 `(room_id, tab_id)` Unique Constraint가 있습니다.
- `V20__channel_record_logical_delete.sql`: 기록의 삭제 상태·`row_version`, 활성·삭제 유지관리 Index를 정의합니다.
- `V21__channel_artifact_maintenance.sql`: 산출물의 삭제 상태·`row_version`, 삭제 목록 Index를 정의합니다.

## Concurrency

`WorkflowRepository.lockRulesByTabLifecycle`는 Rule을 `FOR UPDATE` 잠급니다. 산출물의 활성 행 변경 및 삭제된 산출물·기록 복원도 대상 행 잠금과 `row_version` 조건부 UPDATE를 사용합니다. 버전이 맞지 않으면 충돌로 처리합니다. Index는 조회 패턴에 맞춰 정의돼 있으며 성능 향상은 측정하지 않았습니다.

## Test

- **PASS:** `ChannelTabDeleteTest` 4개. Rule 정리 실패, DB 실패 전파, 커밋 전 성공 방송 방지 등을 단위 테스트에서 확인했습니다.
- **NOT_RUN:** `ChannelTabDeletePostgresTest`, `ChannelArtifactLifecyclePostgresTest`, `ChannelRecordLifecyclePostgresTest`. 실제 PostgreSQL의 FK·rollback·복원 경합 결과는 이번 실행의 검증 범위가 아닙니다.

## Limitations

Tab 삭제는 현재 물리 삭제이고 산출물·기록은 삭제 상태를 남기는 별도 수명주기입니다. 부서 채널 전체 동기화, 분산 Lock, 이벤트 기반 정리를 완료된 구현으로 소개하지 않습니다. 관련 Source와 정합성 보고서는 패키징 커밋 `6f350b2f6`에서 확인했으며 원 수정 커밋은 별도로 확정하지 못했습니다.
