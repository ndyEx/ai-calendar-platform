import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import { getWeekendColor, getDateColor } from '../../../utils/colors';

export default function CalendarView({ theme, height = "auto" }) {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events');
                const formattedEvents = response.data.map(event => ({
                    id: String(event.id),
                    title: event.title,
                    start: event.start_time,
                    end: event.end_time,
                    backgroundColor: event.category === '중요' ? '#ef4444' : undefined,
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setIsModalOpen(true);
    };

    const handleSaveEvent = async (formData) => {
        try {
            const response = await api.post('/api/events', formData);
            if (response.status === 201) {
                setEvents((prevEvents) => [
                    ...prevEvents,
                    {
                        id: String(response.data.id),
                        title: formData.title,
                        start: formData.start_time,
                        end: formData.end_time
                    }
                ]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to create event:', error);
            alert('일정을 저장하는 데 실패했습니다. 서버 상태를 확인해주세요.');
        }
    };

    return (
        <article className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] sm:p-7">
            {/* Subtle glow behind calendar */}
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none dark:bg-cyan-500/5"></div>

            <div className="relative z-10 mb-6 flex items-end justify-between">
                <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                        Calendar View
                    </p>
                    <h3 className="mt-0.5 text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">이번 달 일정</h3>
                </div>
                <div className="hidden rounded-xl bg-slate-200/50 p-1 backdrop-blur-md dark:bg-slate-800/50 sm:flex shadow-inner">
                    <button className="rounded-lg px-4 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" type="button">
                        주간
                    </button>
                    <button className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all dark:bg-slate-700 dark:text-white" type="button">
                        월간
                    </button>
                </div>
            </div>

            <FullCalendar
                key={theme}
                className={`tailwind-calendar ${theme === 'dark' ? 'calendar-dark' : 'calendar-light'}`}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                events={events}
                dateClick={handleDateClick}
                headerToolbar={false}
                height={height}
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

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                onSave={handleSaveEvent}
            />
        </article>
    );
}
