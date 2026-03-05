import SmartSchedule from '../features/dashboard/components/SmartSchedule';
import SummaryCards from '../features/dashboard/components/SummaryCards';
import UpcomingList from '../features/dashboard/components/UpcomingList';

export default function DashboardPage() {
    return (
        <>
            <section className="mb-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
                <SmartSchedule />
                <SummaryCards />
            </section>

            <section>
                <UpcomingList />
            </section>
        </>
    );
}
