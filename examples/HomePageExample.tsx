// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getSharedData } from '@/lib/getSharedData';
// import Hero from '@/components/shared/hero';
// import Advocates from '@/components/shared/Advocates';
// import LegalConsultation from '@/components/shared/legalAdvisors';
// import OurExperience from '@/components/shared/OurExperience';
// import OurLawyers from '@/components/shared/OurLawyers';
// import PracticeAreas from '@/components/shared/OurPracticeAreas';
// import TestimonialSection from '@/components/shared/testimonials';

// interface HomePageProps {
//   locale: string;
//   isAdmin: boolean;
// }

// const HomePageExample: React.FC<HomePageProps> = ({ locale, isAdmin }) => {
//   const [sharedData, setSharedData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getSharedData(locale);
//         setSharedData(data);
//       } catch (error) {
//         console.error('Error fetching shared data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [locale]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">جاري التحميل...</div>
//       </div>
//     );
//   }

//   // Mock translation function for Hero component
//   const t = (key: string) => {
//     // This would normally come from next-intl
//     const translations: { [key: string]: string } = {
//       'hero': 'مرحباً بكم في',
//       'subtitle': 'مكتب المحاماة',
//       'subtitle2': 'جماية صالح',
//       'subtitle3': 'للخدمات القانونية',
//       'description': 'نقدم خدمات قانونية متكاملة ومهنية',
//       'button': 'تواصل معنا'
//     };
//     return translations[key] || key;
//   };

//   return (
//     <div className="relative">
//       {/* Hero Section */}
//       <Hero 
//         isAdmin={isAdmin} 
//         t={t} 
//         locale={locale}
//         sanityData={sharedData?.hero}
//       />

//       {/* Advocates Section */}
//       <Advocates 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.advocates}
//       />

//       {/* Legal Advisors Section */}
//       <LegalConsultation 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.legalAdvisors}
//       />

//       {/* Our Experience Section */}
//       <OurExperience 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.ourExperience}
//       />

//       {/* Our Lawyers Section */}
//       <OurLawyers 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.ourLawyers}
//       />

//       {/* Practice Areas Section */}
//       <PracticeAreas 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.ourPracticeAreas}
//       />

//       {/* Testimonials Section */}
//       <TestimonialSection 
//         locale={locale} 
//         isAdmin={isAdmin}
//         sanityData={sharedData?.testimonials}
//       />
//     </div>
//   );
// };

// export default HomePageExample; 