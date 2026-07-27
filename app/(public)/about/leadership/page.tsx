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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Our Leadership</h1>

      {staff.length === 0 ? (
        <p className="text-gray-500">Leadership information coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((member) => (
            <div key={member.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-60 object-cover object-top"
                />
              ) : (
                <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-5xl font-bold text-gray-300">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="px-4 pt-3 pb-5">
                <h2 className="font-semibold text-gray-900 text-center text-base">{member.name}</h2>
                <p className="text-sm text-gray-500 text-center mt-0.5">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
