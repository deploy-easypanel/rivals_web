'use client';

import AdminBanner from '@/components/admin/AdminBanner';
import AdminChaveamento from '@/components/admin/AdminChaveamento';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminPartidas from '@/components/admin/AdminPartidas';
import AdminRanking from '@/components/admin/AdminRanking';
import AdminTorneioInfo from '@/components/admin/AdminTorneioInfo';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';

export default function PageDucksRivals() {
  return (
    <>
      <AdminHeader />
      <main className="space-y-10 px-6 md:px-12 py-10 bg-gray-100">
        <AdminBanner />
        <Stats />
        <AdminChaveamento />
        <AdminPartidas />
        <AdminTorneioInfo />
        <AdminRanking />
      </main>
      <Footer />
    </>
  );
}
