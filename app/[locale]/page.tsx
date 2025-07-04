"use client";
import {useTranslations} from 'next-intl';
import {useSession} from 'next-auth/react';
import Hero from '@/components/shared/hero';
import PracticeAreas from '@/components/shared/OurPracticeAreas';
import { use } from 'react';
import Advocates from '@/components/shared/Advocates';
import OurExperience from '@/components/shared/OurExperience';
import OurLawyers from '@/components/shared/OurLawyers';
import Testimonials from '@/components/shared/testimonials';
import LegalConsultation from '@/components/shared/legalAdvisors';
import Subscribe from '@/components/ui/Subscribe';
// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'ar' }]
// }
export default  function HomePage({params}: {params: Promise<{locale: string}>}) {
  const t = useTranslations('home');
  const {locale} =  use(params);
  const {data: session} = useSession();
  const isAdmin = !!session;


  return (
    <main className="w-full min-h-screen bg-primary text-gold">
      <div className="bg-[#F9F7F5]">

      <div className='w-full md:h-[90vh] h-[60vh]'>
      <Hero isAdmin={!isAdmin} t={t} locale={locale} />
      </div>
      <PracticeAreas locale={locale} isAdmin={!isAdmin} />
      </div>
      <Advocates locale={locale} isAdmin={!isAdmin} />
      <OurExperience locale={locale} isAdmin={!isAdmin} />
      <OurLawyers locale={locale} isAdmin={!isAdmin} />
      <Testimonials locale={locale} isAdmin={!isAdmin} />
      <LegalConsultation locale={locale} isAdmin={!isAdmin} />
      <Subscribe locale={locale} isAdmin={!isAdmin} />
    </main>
  );
} 