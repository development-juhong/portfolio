# Sroyio

## Project Overview

Sroyio는 업무 메시지, 채널 협업, 인증, 알림, 내부 메일을 제공하는 개인 프로젝트입니다. 이 문서는 구현 구조와 검증 범위를 요약하며, 상세한 설계 선택은 Notion의 `서주홍 Backend Portfolio`에서 관리합니다.

## Architecture

Electron Client → Spring Boot Server(`core`·`gw`·`app`) → PostgreSQL 구조입니다. Handy/GW는 외부 연동 경계입니다. [Architecture](docs/architecture/architecture.md) · [ERD 개요](docs/erd/overview.md)

## Tech Stack

- Backend: Java 17, Spring Boot 3.4.13, Spring Web, WebSocket, Spring JDBC/JdbcTemplate, MyBatis
- Database: PostgreSQL, Flyway
- Test: JUnit 5, Mockito, Testcontainers
- Client: Electron, JavaScript, esbuild

## Case Studies

- [Messenger](docs/case-study/01-messenger.md): 재전송 멱등성을 위한 DB Unique Constraint·Transaction·참여자 Lock 순서
- [Collaboration](docs/case-study/02-collaboration.md): 연관 데이터 삭제 순서와 `row_version` 충돌 제어
- [Authentication & Permission](docs/case-study/03-authentication.md): refresh rotation·세션 철회·access_revision·WebSocket frame gate
- [Notification](docs/case-study/04-notification.md): Outbox 선점과 lease·retry·UNKNOWN
- [Internal Mail](docs/case-study/05-internal-mail.md): 발송 Transaction·idempotency·BCC와 후속 알림 실패 경계

## Test Status

검증 근거는 각 Case Study의 처리 경계와 함께 기록했습니다. Unit Test는 8개 Class·150개 Test, 격리된 PostgreSQL의 Integration Test는 10개 Class·61개 Test가 PASS했습니다. 별도 Concurrency Regression Test 3개(Messenger 2개, Collaboration 1개)가 PASS했으며, 61개 집계에 포함하지 않습니다. 운영 부하·성능 및 실제 외부 Provider 동작은 검증 범위에 포함하지 않습니다.

## AI Usage

AI Coding Agent를 코드 초안, 반복 작업, Test Case 제안, 코드 리뷰와 설계 검토에 사용했습니다. 결과는 Source·DB Schema·Test로 확인하며, 직접 설명하거나 수정할 수 없는 코드는 완료 구현으로 취급하지 않습니다.
