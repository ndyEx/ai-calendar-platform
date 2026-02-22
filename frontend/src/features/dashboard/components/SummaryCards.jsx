import { demoEvents, summaryCards } from '../../../config/constants';

export default function SummaryCards() {
    const nextEvent = demoEvents[0];

    return (
        <article className="rounded-3xl border border-slate-300/75 bg-white/76 p-6 shadow-sm transition-colors dark:border-slate-700/70 dark:bg-slate-900/80">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">다음 일정</p>
            <p className="mt-1 text-xl font-bold">{nextEvent.title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{nextEvent.date}</p>
            <div className="mt-5 space-y-2">
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className="flex items-center justify-between rounded-xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70"
                    >
                        <span className="text-sm text-slate-600 dark:text-slate-300">{card.label}</span>
                        <span className="text-sm font-bold">{card.value}</span>
                    </div>
                ))}
            </div>
        </article>
    );
}
