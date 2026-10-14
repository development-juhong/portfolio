# Authentication & Permission

**Source Code:** [세션 회전](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/main/java/com/sroyio/server/auth/ClientAuthSessionService.java) · [WebSocket frame gate](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/main/java/com/sroyio/server/messenger/WsFrameGate.java) · [PostgreSQL Test](https://github.com/development-juhong/sroyio/blob/main/Backend/sroyio-server/app/src/test/java/com/sroyio/server/auth/ClientAuthSessionServicePgIntegrationTest.java)

## Problem

로그인 뒤에도 refresh token 재사용, 로그아웃·강제 철회, 사용자 접근 상태 변경을 처리해야 합니다. WebSocket 연결은 오래 유지되므로 연결 시점의 권한 판정만으로 이후 입력 프레임을 신뢰할 수 없습니다.

## Design

서버는 opaque refresh token 원문 대신 SHA-256 hash를 저장합니다. refresh 시 현재 hash를 조건부 UPDATE로 교체합니다. 같은 옛 토큰과 같은 `requestId`의 제한된 재시도는 이전 회전 슬롯이 남아 있을 때 HMAC으로 같은 새 토큰을 재생성해 수용합니다. 다른 `requestId`의 재사용은 `AUTH_REFRESH_REPLAY`로 거절하지만, 이 거절만으로 활성 세션을 자동 철회하지는 않습니다. Source: `ClientAuthSessionService`, `SessionRevocationService`, `WsFrameGate`.

## Transaction

로컬 사용자 생성은 `app_user`·local mapping·credential을, 신규 GW JIT 생성은 `app_user`·GW mapping을 각각 한 Transaction에 둡니다. 전역 접근 전이는 사용자 행 잠금 아래 `access_revision` 증가와 기존 세션 철회를 같은 Transaction에 둡니다. 세션 발급은 사용자 행을 `FOR SHARE`로 확인합니다. Source: `NativeAuthService`, `ClientAuthSessionService`, `SessionRevocationService`.

## DB / Constraint / Index

- `V1__sroyio_v1_baseline.sql`: `client_auth_session.refresh_token_hash` Unique Constraint, 로컬 로그인 ID와 외부 신원 매핑 제약을 정의합니다.
- `V4__dual_entry_client_sessions.sql`: GW/NATIVE 세션 구분을 추가합니다.
- `V25__identity_access_revision.sql`: `app_user.access_revision`과 세션 발급 시 revision을 추가합니다.

## Concurrency

refresh 회전의 UPDATE는 현재 hash·미철회·미만료·revision 일치를 조건으로 삼습니다. Bearer REST 요청과 새 WebSocket 연결은 세션 철회 상태를 확인합니다. 기존 WebSocket의 입력 프레임은 `WsFrameGate`에서 현재 사용자 상태와 `access_revision`을 확인하되, 세션별 3초 cache 구간이 있습니다. 인증, 세션 유효성, 전역 접근 revision, 방 참여자 같은 리소스 인가는 서로 다른 판단입니다.

## Test

- **Unit Test PASS:** `NativeUserCreateTxTest` 13개, `SessionRevocationTest` 11개, `WsFrameGateTest` 5개, 총 29개. 사용자 생성 Transaction 문맥, 철회 판단, WebSocket frame gate의 revision·TTL·조회 실패 처리를 확인했습니다.
- **PostgreSQL Integration Test PASS (2026-10-13):** `ClientAuthSessionServicePgIntegrationTest` 13개. 격리된 PostgreSQL에서 refresh token hash 저장, rotation, 동일 requestId 재시도, 다른 requestId 재사용 거절, 동시 회전 1승, revoke와 access_revision 전이를 확인했습니다.

## Limitations

기존 WebSocket 프레임마다 개별 세션 행을 다시 조회하지 않습니다. logout endpoint의 서버 철회 실패는 호출자에게 전파되지 않는 최선 시도 경로입니다. 따라서 모든 기존 연결의 즉시 차단이나 refresh 재사용의 완전한 방어를 주장하지 않습니다.
