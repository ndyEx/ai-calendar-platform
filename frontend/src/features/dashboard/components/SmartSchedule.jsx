export default function SmartSchedule() {
    return (
        <article className="rounded-3xl border border-slate-300/75 bg-white/72 p-6 shadow-sm backdrop-blur-xl transition-colors dark:border-slate-700/70 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                Smart Schedule
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                계획을 더 선명하게,
                <span className="block bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    하루를 더 여유롭게
                </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                사이드바 메뉴를 통해 기능을 빠르게 전환하고, 캘린더를 중심으로 팀 일정을 한눈에
                확인할 수 있습니다.
            </p>
        </article>
    );
}
