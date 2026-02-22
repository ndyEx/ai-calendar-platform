import { useMemo } from 'react';
import { menuItems } from '../../config/constants';

export default function Header({ activeMenu, isSidebarOpen, setIsSidebarOpen, theme, setTheme }) {
    const activeMenuLabel = useMemo(
        () => menuItems.find((item) => item.key === activeMenu)?.label ?? '캘린더',
        [activeMenu],
    );

    return (
        <header className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/75 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl transition-colors dark:border-slate-700/70 dark:bg-slate-900/65">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                    AI Calendar
                </p>
                <h1 className="text-2xl font-extrabold">{activeMenuLabel}</h1>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="rounded-xl border border-slate-300 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    type="button"
                >
                    {isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
                </button>
                <button
                    className="rounded-xl border border-slate-300 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={() => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))}
                    type="button"
                >
                    {theme === 'dark' ? '라이트 모드' : '다크 모드'}
                </button>
                <button
                    className="rounded-xl border border-slate-300 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    type="button"
                >
                    공유
                </button>
                <button
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                    type="button"
                >
                    + 새 일정
                </button>
            </div>
        </header>
    );
}
