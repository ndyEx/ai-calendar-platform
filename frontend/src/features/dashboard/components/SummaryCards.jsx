import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { summaryCards } from '../../../config/constants';

export default function SummaryCards() {
    const [nextEvent, setNextEvent] = useState(null);

    useEffect(() => {
        const fetchNextEvent = async () => {
            try {
                const response = await api.get('/api/events');
                const events = response.data;
                if (events.length > 0) {
                    // Sort by start_time ascending and get the first future/closest event
                    const sortedEvents = events.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
                    const next = sortedEvents[0];
                    setNextEvent({
                        title: next.title,
                        date: new Date(next.start_time).toLocaleDateString('ko-KR')
                    });
                }
            } catch (error) {
                console.error('Failed to fetch next event:', error);
            }
        };
        fetchNextEvent();
    }, []);

    return (
        <article className="rounded-3xl border border-slate-200/80 bg-white/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">다음 일정</p>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.65rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">D-3</span>
            </div>
            
            <p className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                {nextEvent ? nextEvent.title : '예정된 일정 없음'}
            </p>
            <p className="mt-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                {nextEvent ? nextEvent.date : '-'}
            </p>
            
            <div className="mt-6 flex flex-col gap-2.5">
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200/50 bg-white/40 px-4 py-3 transition-colors hover:bg-white/80 dark:border-white/5 dark:bg-slate-800/40 dark:hover:bg-slate-800/80"
                    >
                        <span className="text-sm font-semibold text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200">{card.label}</span>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">{card.value}</span>
                    </div>
                ))}
            </div>
        </article>
    );
}
