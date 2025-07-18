'use client';

import Banner from '@/components/Banner';
import Chaveamento from '@/components/Chaveamento';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Partidas from '@/components/Partidas';
import Ranking from '@/components/Ranking';
import Stats from '@/components/Stats';
import TorneioInfo from '@/components/TorneioInfo';

export default function PageDucksRivals() {
  return (
    <>
      <Header />
      <main className="space-y-10 px-6 md:px-12 py-10 bg-gray-100">
        <Banner />
        <Stats />
        <TorneioInfo />
        <Chaveamento />
        <Partidas />
        <Ranking />
      </main>
      <Footer />
    </>
  );
}
