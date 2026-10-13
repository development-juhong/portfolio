# Sroyio

## Project Overview

Sroyio는 업무 메시지, 채널 협업, 인증, 알림, 내부 메일을 제공하는 개인 프로젝트입니다. 이 디렉터리는 Private Repository에서 관리하는 포트폴리오 문서 초안입니다. 설명의 정본은 Notion의 `서주홍 Backend Portfolio`이며, 여기에는 구현 근거와 검증 범위를 요약합니다.

## Architecture

Electron Client → Spring Boot Server → Main PostgreSQL 구조입니다. Server는 `app`, `core`, `gw` 모듈을 사용하며, Handy/GW는 외부 연동 경계입니다. 상세 내용은 [Architecture](docs/architecture/architecture.md)와 [ERD 개요](docs/erd/overview.md)에 정리했습니다.

## Tech Stack

Java 17, Spring Boot 3.4.13, Spring Web, WebSocket, Spring JDBC/JdbcTemplate, MyBatis, PostgreSQL, Flyway, JUnit 5, Mockito, Testcontainers, Electron, JavaScript, esbuild.

## Case Studies

- [Messenger](docs/case-study/01-messenger.md): 재전송 멱등성과 메시지 저장 경계
- [Collaboration](docs/case-study/02-collaboration.md): Tab 삭제 순서와 변경 충돌
- [Authentication & Permission](docs/case-study/03-authentication.md): 세션 회전·철회·접근 revision
- [Notification](docs/case-study/04-notification.md): 전달 선점과 불확실한 결과
- [Internal Mail](docs/case-study/05-internal-mail.md): 내부 발송의 정합성과 후속 알림 경계

## Test Status

2026-10-13 기준 핵심 단위 테스트 8개 Class, 150개 Test PASS. PostgreSQL Integration Test는 환경 부족으로 NOT_RUN입니다. 각 문서에서 기능별 검증 범위를 별도로 표시합니다.

## AI Usage

AI Coding Agent를 초안, 반복 작업, Test Case 제안과 검토에 사용했습니다. 구현과 검증 상태는 실제 Source, Migration, Test를 기준으로 확인했습니다.
