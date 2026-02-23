import { menuItems } from '../../config/constants';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, activeMenu, setActiveMenu }) {
    return (
        <aside
            className={`rounded-3xl border border-slate-200/80 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] relative overflow-hidden ${isSidebarOpen ? 'p-4' : 'p-3'
                }`}
        >
            <div className={`flex items-start ${isSidebarOpen ? 'justify-between' : 'justify-center'} relative z-10`}>
                {isSidebarOpen ? (
                    <div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                            Navigation
                        </p>
                        <h2 className="mt-1 text-lg font-extrabold tracking-tight">메뉴</h2>
                    </div>
                ) : null}

                <button
                    className="rounded-xl border border-slate-200 bg-white/50 px-2 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/5 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm backdrop-blur-md"
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    type="button"
                >
                    {isSidebarOpen ? '접기' : '펼침'}
                </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1.5 relative z-10">
                {menuItems.map((menu) => {
                    const isActive = activeMenu === menu.key;
                    return (
                        <button
                            key={menu.key}
                            className={`group relative w-full overflow-hidden rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-all duration-300 ${isActive
                                ? 'text-teal-800 dark:text-teal-300'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                                }`}
                            onClick={() => setActiveMenu(menu.key)}
                            type="button"
                        >
                            {/* Active State Background & Indicator */}
                            {isActive && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/5 dark:from-teal-400/20 dark:to-cyan-400/5" />
                                    <div className="absolute left-0 top-1/2 h-8 -translate-y-1/2 w-1.5 rounded-r-full bg-gradient-to-b from-teal-500 to-cyan-500 shadow-[0_0_10px_rgb(20,184,166,0.6)]" />
                                </>
                            )}
                            
                            {/* Hover State Background */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-slate-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-800/50" />
                            )}

                            <span className={`relative z-10 transition-transform duration-300 ${isSidebarOpen ? 'inline-block group-hover:translate-x-1' : 'block text-center'}`}>
                                {isSidebarOpen ? menu.label : menu.label.slice(0, 1)}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {isSidebarOpen ? (
                <div className="mt-8 relative z-10 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/60 to-white/30 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:from-slate-800/60 dark:to-slate-900/40">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">워크스페이스</p>
                    <p className="mt-1.5 text-sm font-semibold tracking-tight">팀 캘린더 V2</p>
                    <div className="mt-3 flex items-center justify-between">
                        <p className="text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">공유 멤버 8명</p>
                        <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-teal-100 dark:border-slate-800 dark:bg-teal-900/50"></div>
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-sky-100 dark:border-slate-800 dark:bg-sky-900/50"></div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[0.6rem] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                                +6
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </aside>
    );
}
