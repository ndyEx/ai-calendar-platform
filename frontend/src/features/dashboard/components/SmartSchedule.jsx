export default function SmartSchedule() {
    return (
        <article className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            {/* Subtle glow effect behind the text */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-[80px] dark:bg-teal-500/10 pointer-events-none"></div>
            
            <div className="relative z-10">
                <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-50/50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-700 backdrop-blur-sm dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    Smart Schedule
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-800 dark:text-slate-100">
                    계획을 더 선명하게,
                    <span className="block mt-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent pb-1">
                        하루를 더 여유롭게
                    </span>
                </h2>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                    사이드바 메뉴를 통해 기능을 빠르게 전환하고, 캘린더를 중심으로 팀 일정을 한눈에
                    확인할 수 있습니다.
                </p>
            </div>
        </article>
    );
}
