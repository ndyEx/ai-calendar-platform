import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { demoEvents } from '../../../config/constants';
import { getWeekendColor, getDateColor } from '../../../utils/colors';

export default function CalendarView({ theme }) {
    return (
        <article className="rounded-3xl border border-slate-300/75 bg-white/80 p-4 shadow-sm transition-colors dark:border-slate-700/70 dark:bg-slate-900/85 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                        Calendar View
                    </p>
                    <h3 className="text-lg font-bold">이번 달 일정</h3>
                </div>
                <div className="hidden rounded-xl border border-slate-300 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800/70 sm:flex">
                    <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-300" type="button">
                        주간
                    </button>
                    <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100" type="button">
                        월간
                    </button>
                </div>
            </div>

            <FullCalendar
                key={theme}
                className={`tailwind-calendar ${theme === 'dark' ? 'calendar-dark' : 'calendar-light'}`}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                events={demoEvents}
                headerToolbar={false}
                height="auto"
                fixedWeekCount={false}
                eventDisplay="block"
                dayHeaderDidMount={(arg) => {
                    const headerLink = arg.el.querySelector('.fc-col-header-cell-cushion');
                    if (!headerLink) {
                        return;
                    }
                    headerLink.style.setProperty(
                        'color',
                        getWeekendColor(arg.date.getDay(), theme === 'dark'),
                        'important',
                    );
                }}
                dayCellDidMount={(arg) => {
                    const dateLink = arg.el.querySelector('.fc-daygrid-day-number');
                    if (!dateLink) {
                        return;
                    }
                    dateLink.style.setProperty(
                        'color',
                        getDateColor(arg.date.getDay(), theme === 'dark'),
                        'important',
                    );
                }}
            />
        </article>
    );
}
