import { demoEvents } from '../../../config/constants';

export default function UpcomingList() {
    return (
        <aside className="rounded-3xl border border-slate-300/75 bg-white/80 p-6 shadow-sm transition-colors dark:border-slate-700/70 dark:bg-slate-900/85">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                Upcoming
            </p>
            <h3 className="mt-1 text-lg font-bold">다가오는 일정</h3>
            <ul className="mt-4 space-y-3">
                {demoEvents.map((event) => (
                    <li
                        key={`${event.title}-${event.date}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70"
                    >
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500" />
                        <div>
                            <p className="text-sm font-semibold">{event.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{event.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
