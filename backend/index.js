// ----------------------------------------------------------------------
// 웹 서버(Express) 진입점 (Entry Point)
// ----------------------------------------------------------------------
const path = require('path');
const dotenv = require('dotenv');

// 설정된 NODE_ENV에 따라 불러올 환경 변수 파일을 결정합니다. (기본값: 로컬 개발 환경)
const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev';
dotenv.config({ path: path.join(__dirname, envFile) });
const app = require('./src/app');

// 서버가 실행될 포트 설정. .env 파일에 PORT가 없으면 3000번 포트를 사용합니다.
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------------------------
// 서버 실행
// 설정한 PORT에서 요청을 기다립니다(listen).
// ----------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});