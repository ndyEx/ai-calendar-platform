import { menuItems } from '../../config/constants';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, activeMenu, setActiveMenu }) {
    return (
        <aside
            className={`rounded-3xl border border-slate-300/75 bg-white/80 shadow-sm transition-all duration-300 dark:border-slate-700/70 dark:bg-slate-900/85 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] ${isSidebarOpen ? 'p-4' : 'p-3'
                }`}
        >
            <div className={`flex items-start ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                {isSidebarOpen ? (
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                            Navigation
                        </p>
                        <h2 className="mt-2 text-lg font-extrabold">메뉴</h2>
                    </div>
                ) : null}

                <button
                    className="rounded-lg border border-slate-300 bg-white/85 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    type="button"
                >
                    {isSidebarOpen ? '접기' : '펼침'}
                </button>
            </div>

            <nav className="mt-4 space-y-2">
                {menuItems.map((menu) => (
                    <button
                        key={menu.key}
                        className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${activeMenu === menu.key
                            ? 'border-cyan-400 bg-cyan-100/70 text-cyan-700 dark:border-cyan-500/60 dark:bg-cyan-500/20 dark:text-cyan-300'
                            : 'border-slate-300 bg-white/75 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700'
                            }`}
                        onClick={() => setActiveMenu(menu.key)}
                        type="button"
                    >
                        <span className={isSidebarOpen ? '' : 'text-center block'}>
                            {isSidebarOpen ? menu.label : menu.label.slice(0, 1)}
                        </span>
                    </button>
                ))}
            </nav>

            {isSidebarOpen ? (
                <div className="mt-6 rounded-2xl border border-slate-300 bg-white/75 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                    <p className="font-semibold">워크스페이스</p>
                    <p className="mt-1">팀 캘린더 V2</p>
                    <p className="text-slate-500 dark:text-slate-400">공유 멤버 8명</p>
                </div>
            ) : null}
        </aside>
    );
}
