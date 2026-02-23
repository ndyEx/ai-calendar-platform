import { useMemo } from 'react';
import { menuItems } from '../../config/constants';

export default function Header({ activeMenu, theme, setTheme }) {
    const activeMenuLabel = useMemo(
        () => menuItems.find((item) => item.key === activeMenu)?.label ?? '캘린더',
        [activeMenu],
    );

    return (
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white/60 px-5 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400">
                    AI Calendar
                </p>
                <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight">{activeMenuLabel}</h1>
            </div>

            <div className="flex items-center gap-3">
                <button
                    className="rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    onClick={() => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))}
                    type="button"
                >
                    {theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
                </button>
                <button
                    className="rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                    type="button"
                >
                    공유
                </button>

                {/* Premium Primary Action Button */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 opacity-50 blur transition duration-300 group-hover:opacity-100 dark:from-teal-500 dark:to-cyan-500"></div>
                    <button
                        className="relative rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 dark:bg-slate-800 dark:hover:text-cyan-300"
                        type="button"
                    >
                        + 새 일정
                    </button>
                </div>
            </div>
        </header>
    );
}
