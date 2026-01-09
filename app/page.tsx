import Hero from '@/components/Hero';
import QuickLinks from '@/components/QuickLinks';
import LatestSermons from '@/components/LatestSermons';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <LatestSermons />
      <UpcomingEvents />
    </main>
  );
}
