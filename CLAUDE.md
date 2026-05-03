# Link — CLAUDE.md

## 프로젝트 개요

**"여행의 시작, 함께하는 설렘을 더하다"**

여행 준비 시 참여자-주최자 간 양방향 소통 서비스. 의견 충돌 없이 카테고리별 정보 제공과 투표 기반 의사결정으로 여행 계획을 효율적으로 조율한다.

포트폴리오용 풀스택 웹 애플리케이션. AWS를 통한 실제 배포까지 목표.

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Java, Spring Boot |
| Frontend | React, TypeScript |
| Deployment | AWS |

## 디렉토리 구조

```
Link/
├── backend/    # Spring Boot 프로젝트
└── frontend/   # React + TypeScript 프로젝트
```

## 주요 기능 (피그마 기준)

### 인증
- 스플래시 화면
- Google 소셜 로그인

### 여행 생성 (주최자)
- 여행 제목, 날짜, 장소, 인원 등 단계별 입력 플로우
- 생성된 여행에 참여자 초대

### 홈
- 캘린더 뷰 (여행 일정 확인)
- 카테고리별 탐색 (숙소, 식당, 관광지 등)
- 결정 현황 (투표 진행 중 / 완료)

### 탐색 / 피드
- 여행지 카드 목록
- 여행 상세 페이지

### 결정 투표
- 참여자가 항목에 투표
- 결과 시각화

### 채팅
- 여행 그룹 내 실시간 채팅

### 마이페이지
- 내 여행 목록, 프로필 관리

## 진행 현황

### 완료
- 프로젝트 폴더 구조 생성 (`backend/`, `frontend/`)
- `backend/`: Spring Boot 초기 프로젝트 생성 (Maven, Java 21, Spring Web / Spring Data JPA / MySQL Driver / Lombok / DevTools / Validation)
- `frontend/`: Vite + React + TypeScript 초기 프로젝트 생성
- 루트 / backend / frontend `.gitignore` 설정 완료
- GitHub push 완료

### 다음 작업
- DB 설계 및 Entity 작성
- Spring Security + Google OAuth2 로그인 구현
- React 라우팅 구조 설계

## Claude와 협업 방식 — 중요

**이 프로젝트는 사용자가 직접 코드를 작성하는 학습/연습 프로젝트입니다.**

### Claude가 하지 말아야 할 것
- 코드를 대신 작성하거나 완성된 구현체를 제공하지 않는다
- 수정이 필요한 코드를 직접 Edit/Write 도구로 바꾸지 않는다
- "이렇게 수정하면 됩니다" 식의 완성 코드 블록을 제시하지 않는다

### Claude가 해도 되는 것
- 개념 설명, 동작 원리 안내
- 어떤 방향으로 접근할지 아이디어 제안 (코드 없이)
- 사용자가 작성한 코드 리뷰 및 피드백
- 에러 메시지 해석 및 원인 설명
- Spring Boot / React / AWS 관련 공식 문서나 참고 자료 안내
- 막혔을 때 힌트 제공 (단, 정답 코드는 제공하지 않음)

### 예외
- 사용자가 명시적으로 "코드 작성해줘", "구현해줘" 라고 요청한 경우에만 코드 제공 가능
