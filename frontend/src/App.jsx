// ----------------------------------------------------------------------
// React에서 제공하는 핵심 기능(Hooks)들을 불러옵니다.
import { useEffect, useState } from 'react';
import { getInitialTheme } from './utils/theme';
import { THEME_KEY } from './config/constants';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';

// ----------------------------------------------------------------------
// App 컴포넌트: 화면에 그려질 UI와 동작 로직을 결합한 메인 함수입니다.
// ----------------------------------------------------------------------
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return window.matchMedia('(min-width: 1024px)').matches;
  });

  const [theme, setTheme] = useState(getInitialTheme);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // 현재 선택된 메뉴에 따라 알맞은 페이지(화면)를 반환하는 함수
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardPage theme={theme} />;
      case 'calendar':
        return <CalendarPage theme={theme} />;
      default:
        // 'team', 'analytics', 'settings' 등 아직 구현되지 않은 페이지들에 대한 임시 처리
        return (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900/50">
            <p>이 화면은 아직 준비 중입니다. ({activeMenu})</p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100 selection:bg-teal-500/30">
      {/* Background Orbs with Animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-300/20 blur-[100px] transition-all duration-1000 dark:bg-teal-500/15 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 -right-40 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-sky-300/20 blur-[120px] transition-all duration-1000 dark:bg-sky-500/10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-300/20 blur-[100px] transition-all duration-1000 dark:bg-indigo-500/10 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        {/* Fine Noise Texture Overlay for premium feel (Subtle) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none"></div>
      </div>

      <div
        className={`relative mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-10 ${isSidebarOpen
          ? 'lg:grid-cols-[240px_minmax(0,1fr)]'
          : 'lg:grid-cols-[92px_minmax(0,1fr)]'
          }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <main>
          <Header
            activeMenu={activeMenu}
            theme={theme}
            setTheme={setTheme}
          />
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
