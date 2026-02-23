import CalendarView from '../features/calendar/components/CalendarView';

export default function CalendarPage({ theme }) {
    return (
        <section className="grid grid-cols-1">
            <CalendarView theme={theme} height="calc(100vh - 20rem)" />
        </section>
    );
}
