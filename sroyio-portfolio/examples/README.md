# Sample Code 후보

현재 이 디렉터리에는 실행 가능한 Source를 넣지 않았습니다. Private 문서 초안에서 공개 후보를 선별하는 단계입니다. 실제 예제를 만들 때는 현재 구현과 동일한 Transaction·DB 제약·실패 경계를 유지해야 합니다.

| Case Study | 검토할 코드 범위 | 공개 전 확인 |
| --- | --- | --- |
| Messenger | 전송 Service 흐름, 중복 판정 Query, 관련 Test | 인증·방 참여 경계와 DB 제약을 함께 설명할 수 있는지 |
| Collaboration | Tab 삭제 Service, Workflow 정리 Query, 관련 Test | FK·권한·감사 호출을 누락하지 않는지 |
| Authentication | refresh 회전의 조건부 UPDATE, frame gate, 관련 Test | token·secret·외부 로그인 계약이 드러나지 않는지 |
| Notification | Worker 선점, lease·UNKNOWN 처리, 관련 Test | source access 재검증과 미실행 PostgreSQL Test를 구분하는지 |
| Internal Mail | 발송 Transaction, 멱등 ledger, 알림 pending 처리, 관련 Test | BCC·감사·첨부 물리 경계를 정확히 보존하는지 |

원본 Java/JSP, 설정, Secret, 내부 IP, 고객사 정보, Handy/GW 자료, 회사 Source는 이 디렉터리에 복사하지 않습니다. 실제 Sample 작성과 공개 범위 판정은 별도 단계에서 진행합니다.
