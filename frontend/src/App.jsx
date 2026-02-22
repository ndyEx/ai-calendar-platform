// ----------------------------------------------------------------------
// React에서 제공하는 핵심 기능(Hooks)들을 불러옵니다.
// ----------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { getInitialTheme } from './utils/theme';
import { THEME_KEY } from './config/constants';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';

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
  const [activeMenu, setActiveMenu] = useState('calendar');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-teal-300/24 blur-3xl dark:bg-teal-400/20" />
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20" />
        <div className="absolute bottom-10 left-1/4 h-56 w-56 rounded-full bg-cyan-200/16 blur-3xl dark:bg-cyan-400/10" />
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
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            theme={theme}
            setTheme={setTheme}
          />
          <DashboardPage theme={theme} />
        </main>
      </div>
    </div>
  );
}

export default App;
