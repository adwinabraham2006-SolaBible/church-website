export const dynamic = 'force-dynamic';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

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
    const { data, error } = await supabaseAdmin
      .from('staff')
      .select('*')
      .order('display_order');
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function LeadershipPage() {
  const staff = await getStaff();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Leadership</h1>
      <p className="text-gray-600 mb-10">
        Meet the pastors and elders who shepherd Sola Bible Church.
      </p>

      {staff.length === 0 ? (
        <p className="text-gray-500">Leadership information coming soon.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2">
          {staff.map((member) => (
            <div key={member.id} className="flex gap-5">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="h-20 w-20 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-gray-500">
                  {member.name.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{member.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
