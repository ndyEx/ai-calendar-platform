import SmartSchedule from '../features/dashboard/components/SmartSchedule';
import SummaryCards from '../features/dashboard/components/SummaryCards';
import UpcomingList from '../features/dashboard/components/UpcomingList';
import CalendarView from '../features/calendar/components/CalendarView';

export default function DashboardPage({ theme }) {
    return (
        <>
            <section className="mb-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
                <SmartSchedule />
                <SummaryCards />
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <CalendarView theme={theme} />
                <UpcomingList />
            </section>
        </>
    );
}
