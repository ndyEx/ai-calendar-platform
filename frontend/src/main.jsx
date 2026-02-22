// React의 개발 모드 보조 컴포넌트
import { StrictMode } from 'react';
// createRoot: React 18 방식으로 DOM에 앱을 붙이는 함수
import { createRoot } from 'react-dom/client';
// 전역 스타일 (index.css) 불러오기
import './index.css';
// 우리가 만든 메인 컴포넌트
import App from './App.jsx';

// public/index.html 안의 <div id="root">를 찾아서 React 트리를 렌더링
createRoot(document.getElementById('root')).render(
  // StrictMode: 개발 중 잠재적 문제를 더 빨리 발견하도록 도와주는 래퍼
  <StrictMode>
    <App />
  </StrictMode>,
);
