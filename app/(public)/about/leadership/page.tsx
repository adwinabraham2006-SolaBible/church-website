export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import StaffGrid from './StaffGrid';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
}

async function getStaff(): Promise<StaffMember[]> {
  noStore();
  if (!supabaseAdmin) return [];
  try {
    const { data, error } = await supabaseAdmin.from('staff').select('*').order('display_order');
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function LeadershipPage() {
  const staff = await getStaff();

  return (
    <main>
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              Leadership &amp; Staff
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          {staff.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">Leadership information coming soon.</p>
          ) : (
            <StaffGrid staff={staff} />
          )}
        </div>
      </section>
    </main>
  );
}
