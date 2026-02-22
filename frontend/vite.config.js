// ----------------------------------------------------------------------
// Vite 설정 파일: React 프로젝트를 빠르고 가볍게 실행시켜주는 빌드 도구(Vite)의 설정입니다.
// ----------------------------------------------------------------------
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // React 화면을 그리고(react()), Tailwind CSS로 스타일을 적용(tailwindcss())하는 플러그인 사용
  plugins: [react(), tailwindcss()],
})
