# AI Calendar Platform

이 프로젝트는 React(Vite) 프론트엔드와 Node.js(Express) 백엔드로 구성된 AI 기반 캘린더 플랫폼입니다. 
추후 지속적인 기능 추가와 쉬운 유지보수를 위해, 프론트엔드는 **기능 중심(Feature-based)** 아키텍처, 백엔드는 **계층형(Layer-based)** 아키텍처로 세밀하게 분리되어 있습니다.

## 📂 프로젝트 아키텍처

### 1. Frontend (`/frontend`)
React 컴포넌트들이 거대해지는 것을 방지하기 위해 기능(Domain)과 용도별로 계층을 철저히 나누었습니다.

```text
frontend/
├── index.html              # 메인 HTML 템플릿
├── vite.config.js          # Vite 번들러 플러그인 및 개발 서버 환경 설정 파일
├── eslint.config.js        # 문법 검사(ESLint) 및 코딩 컨벤션 룰 세팅 파일
└── src/
    ├── main.jsx            # React 애플리케이션 진입점 (DOM 렌더링)
    ├── App.jsx             # 최상위 컴포넌트 (주로 글로벌 레이아웃 및 페이지 결합 역할)
    ├── index.css           # 전역 폰트 및 Tailwind CSS 선언부
    ├── config/             # 전역 상수(constants.js) 및 설정값 모음
    ├── pages/              # 사용자에게 보여지는 하나의 완전한 화면(페이지) 단위 컴포넌트 모음
    ├── components/         # 도메인 속성과 무관한 공용 컴포넌트 및 앱 뼈대 레이아웃 (Header, Sidebar)
    ├── features/           # 특정 기능(도메인)에 특화된 컴포넌트 묶음
    │   ├── calendar/       # 달력 렌더링과 관련된 내부 부품 모음
    │   └── dashboard/      # 대시보드 요약 카드, 스마트 스케줄 등 특정 화면 부품 모음
    └── utils/              # 프로젝트 전반에서 재사용되는 헬퍼 함수들 (theme.js, colors.js)
```

### 2. Backend (`/backend`)
Node.js Express 생태계의 표준과도 같은 MVC 방식의 역할을 기반으로 코드를 분류했습니다.

```text
backend/
├── .env                    # DB 접속 정보, 포트 번호 등 민감한 환경변수
├── index.js                # 실제 서버를 구동(listen)시키는 최상위 진입 파일 (Entry Point)
└── src/
    ├── app.js              # Express 앱 생성, CORS 설정 및 메인 라우터 연결 총괄
    ├── config/             # 데이터베이스 연결 풀 등 외부 시스템 설정 (db.config.js)
    ├── routes/             # 어떤 URL로 요청이 들어왔을 때 누구에게 토스할지 정의하는 길잡이 (event.routes.js)
    ├── controllers/        # 실제 요청(Req)을 까보고, 알맞은 응답(Res)을 뱉어내는 로직 지휘관 (event.controller.js)
    └── models/             # 실제 데이터베이스에 접속하여 쿼리(SELECT, INSERT 등)를 날리는 데이터 전담반 (event.model.js)
```

## 🚀 실행 방법

### Frontend (개발 모드)
```bash
cd frontend
npm install
npm run dev
```

### Backend (서버 구동)
```bash
cd backend
npm install
node index.js
```