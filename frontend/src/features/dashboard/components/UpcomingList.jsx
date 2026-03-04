import { useState, useEffect } from 'react';
import api from '../../../api/axios';

export default function UpcomingList() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await api.get('/api/events');
                const events = response.data;
                const sorted = events
                    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                    .slice(0, 5)
                    .map(event => ({
                        id: event.id,
                        title: event.title,
                        date: new Date(event.start_time).toLocaleDateString('ko-KR')
                    }));
                setUpcomingEvents(sorted);
            } catch (error) {
                console.error('Failed to fetch upcoming events:', error);
            }
        };
        fetchUpcomingEvents();
    }, []);

    return (
        <aside className="rounded-3xl border border-slate-200/80 bg-white/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        Upcoming
                    </p>
                    <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">다가오는 일정</h3>
                </div>
                <button className="rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
            </div>
            
            <ul className="space-y-3">
                {upcomingEvents.length === 0 ? (
                    <li className="text-sm text-slate-500 dark:text-slate-400">예정된 일정이 없습니다.</li>
                ) : (
                    upcomingEvents.map((event) => (
                        <li
                            key={event.id}
                            className="group flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md dark:border-white/5 dark:bg-slate-800/40 dark:hover:bg-slate-800/80"
                        >
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-sm">
                                {/* Inner dot for premium feel */}
                                <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-bold text-slate-800 transition-colors group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-cyan-400">{event.title}</p>
                                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{event.date}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
}
