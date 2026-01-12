import Hero from '@/components/Hero';
import QuickLinks from '@/components/QuickLinks';
import ServiceTimes from '@/components/ServiceTimes';
import LatestSermons from '@/components/LatestSermons';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <ServiceTimes />
      <LatestSermons />
      <UpcomingEvents />
    </main>
  );
}
