import { useState, useEffect, useRef } from 'react';
import api from '../../../api/axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import { getWeekendColor, getDateColor } from '../../../utils/colors';

export default function CalendarView({ theme, height = "auto" }) {
    // 캘린더에 표시될 전체 일정 목록을 담는 상태형 배열
    const [events, setEvents] = useState([]);
    // 상세 일정을 추가, 수정할 때 나오는 팝업 모달의 열림 여부
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 빈 날짜 칸을 클릭했을 때 기록해두는 선택된 날짜 (문자열)
    const [selectedDate, setSelectedDate] = useState(null);
    // 캘린더에 존재하는 특정 이벤트 블록을 클릭했을 때 수정하기 위해 기록해두는 이벤트 객체
    const [selectedEvent, setSelectedEvent] = useState(null);
    // 현재 유저가 보고 있는 캘린더의 뷰 형태 (기본값: 월간 뷰 - dayGridMonth)
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const calendarRef = useRef(null);

    // 컴포넌트 마운트 시 최초 1회, 백엔드 서버에서 일정 데이터를 가져오는 훅(Hook)
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events');
                // 가져온 데이터 객체들을 FullCalendar가 이해할 수 있는 형식으로 파싱
                const formattedEvents = response.data.map(event => ({
                    id: String(event.id),
                    title: event.title,
                    start: event.start_time,
                    end: event.end_time,
                    category: event.category,
                    description: event.description,
                    backgroundColor: event.category === '중요' ? '#ef4444' : undefined, // 카테고리가 중요일 때 붉은색 강조
                }));
                // 파싱한 내용을 캘린더에 렌더링하기 위해 상태값으로 저장
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    // [사용자 클릭 액션 #1] 특정 날짜 칸에 클릭했을 때: 신규 일정 등록 플로우
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr); // 어느 날짜 칸을 클릭했는지 임시 저장
        setSelectedEvent(null);       // 이벤트 기반이 아니므로 과거 선택 이력 초기화
        setIsModalOpen(true);         // 폼 모달 오픈
    };

    // [사용자 클릭 액션 #2] 그려져 있는 캘린더 이벤트 자체를 클릭했을 때: 일정 수정 플로우
    const handleEventClick = (arg) => {
        const eventObj = arg.event;
        // 수정 모달창에 기존 데이터 값을 넘겨주기 위해 구조를 맞춰 상태 객체로 저장
        setSelectedEvent({
            id: eventObj.id,
            title: eventObj.title,
            start: eventObj.startStr,
            end: eventObj.endStr,
            category: eventObj.extendedProps.category,
            description: eventObj.extendedProps.description,
        });
        setSelectedDate(null); // 신규 등록 플로우가 아니므로 선택 날짜는 초기화
        setIsModalOpen(true);
    };

    // 일정 (추가/수정) 모달에서 최종적으로 제출(저장) 버튼을 눌렀을 때 처리되는 로직
    const handleSaveEvent = async (formData) => {
        try {
            if (selectedEvent && selectedEvent.id) {
                // 상태 변수 selectedEvent 내 id 값이 존재한다면, 이미 있는 일정을 [수정] 하는 API 동작을 수행합니다.
                const response = await api.put(`/api/events/${selectedEvent.id}`, formData);
                if (response.status === 200) {
                    // API 통신이 성공하면, 프론트 화면상 보이는 (events) 데이터도 새로운 수정값으로 덮어 씌우기 
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event.id === selectedEvent.id
                                ? {
                                      ...event,
                                      title: formData.title,
                                      start: formData.start_time,
                                      end: formData.end_time,
                                      category: formData.category,
                                      description: formData.description,
                                      backgroundColor: formData.category === '중요' ? '#ef4444' : undefined,
                                  }
                                : event
                        )
                    );
                    setIsModalOpen(false);
                }
            } else {
                // 선택된 이벤트 id 값이 없으면 이것은 비어있는 날짜를 통해 이루어진 백지 [생성 (추가)] API 동작입니다.
                const response = await api.post('/api/events', formData);
                if (response.status === 201) {
                    // 서버로부터 새로운 데이터가 잘 저장되었다고 응답받으면 화면에 블록 새로 그리기
                    setEvents((prevEvents) => [
                        ...prevEvents,
                        {
                            id: String(response.data.id),
                            title: formData.title,
                            start: formData.start_time,
                            end: formData.end_time,
                            category: formData.category,
                            description: formData.description,
                            backgroundColor: formData.category === '중요' ? '#ef4444' : undefined,
                        }
                    ]);
                    setIsModalOpen(false); // 로직이 끝나면 모달창 자연스럽게 닫기
                }
            }
        } catch (error) {
            console.error('Failed to save event:', error);
            alert('일정을 저장하는 데 실패했습니다. 서버 상태를 확인해주세요.');
        }
    };

    // [월간으로 돌아가기 버튼] 핸들러 - 사용자가 일간/주간 뷰로 들어갔을 때 수동으로 기본 월간 뷰로 돌려주는 함수
    const handleViewMonth = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi(); // FullCalendar 코어 인터페이스 API 가져오기
            calendarApi.changeView('dayGridMonth');           // 달력의 형태를 강제로 월간 View로 변경
            setCurrentView('dayGridMonth');                   // 버튼 감추기를 위해 리액트 상태도 동기화 반영
        }
    };

    // FullCalendar에서 내부 날짜 세트가 변경될때마다 뷰를 감지하여 상태에 저장.
    const handleDatesSet = (arg) => {
        setCurrentView(arg.view.type); 
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
                
                <div className="flex gap-2">
                    {currentView !== 'dayGridMonth' && (
                        <button 
                            onClick={handleViewMonth}
                            className="rounded-lg bg-teal-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-teal-600" 
                            type="button"
                        >
                            &larr; 월간으로 돌아가기
                        </button>
                    )}
                    <div className="hidden rounded-xl bg-slate-200/50 p-1 backdrop-blur-md dark:bg-slate-800/50 sm:flex shadow-inner">
                        <button className="rounded-lg px-4 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" type="button">
                            주간
                        </button>
                        <button className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all dark:bg-slate-700 dark:text-white" type="button">
                            월간
                        </button>
                    </div>
                </div>
            </div>

            <FullCalendar
                ref={calendarRef}
                key={theme}
                className={`tailwind-calendar ${theme === 'dark' ? 'calendar-dark' : 'calendar-light'}`}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="en"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                datesSet={handleDatesSet}
                selectable={true}
                selectMirror={true}
                navLinks={true}
                editable={false}
                headerToolbar={false}
                height={height}
                fixedWeekCount={false}
                eventDisplay="block"
                eventInteractive={true}
                dayMaxEvents={true}
                displayEventTime={false}
                dayHeaderDidMount={(arg) => {
                    const headerLink = arg.el.querySelector('.fc-col-header-cell-cushion');
                    if (headerLink) {
                        headerLink.style.setProperty(
                            'color',
                            getWeekendColor(arg.date.getDay(), theme === 'dark'),
                            'important',
                        );
                    }
                }}
                dayCellDidMount={(arg) => {
                    const dateLink = arg.el.querySelector('.fc-daygrid-day-number');
                    if (dateLink) {
                        dateLink.style.setProperty(
                            'color',
                            getDateColor(arg.date.getDay(), theme === 'dark'),
                            'important',
                        );
                    }
                }}
            />

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                eventToEdit={selectedEvent}
                onSave={handleSaveEvent}
            />
        </article>
    );
}
