'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchDynamicPageType } from '@/sanity/lib/fetchDynamicPage';

const LegalServicesSection = ({ref}: {ref: React.RefObject<HTMLDivElement | null>}) => {
  const t = useTranslations('navbar.services');
  const locale = useLocale();
  let [services, setServices] = useState([
    {title: t('real_estate'), titleEn: t('real_estate'), value: 'real-estate'},
    {title: t('legal_rep'), titleEn: t('legal_rep'), value: 'legal-rep'},
    {title: t('contracts'), titleEn: t('contracts'), value: 'contracts'},
    {title: t('labour'), titleEn: t('labour'), value: 'labour'},
    {title: t('criminal'), titleEn: t('criminal'), value: 'criminal'},
    {title: t('family'), titleEn: t('family'), value: 'family'},
    {title: t('civil'), titleEn: t('civil'), value: 'civil'},
  ]);
  useEffect(() => {
    fetchDynamicPageType('real-estate').then((data) => {
      setServices(data);
    });
  }, []);

  const isArabic = locale === 'ar';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      dir={isArabic ? 'rtl' : 'ltr'}
      className="bg-[#F5F5F5] py-4 px-4 md:px-8 rounded-xl max-w-4xl mx-auto"
      >
      <div
        className={`grid grid-cols-3 items-center justify-between gap-10`}
        ref={ref}
        >
        {/* الخدمات */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1  self-start col-span-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants as any}
              className="bg-white px-5 py-3 rounded-lg shadow-lg text-[#0C1C19] font-semibold text-[14px]  hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/${locale === "ar" ? "ar" : "en"}/practice/${service.value}`}>{locale === "ar" ? service.title : service.titleEn}</Link>
            </motion.div>
          ))}
        </motion.div>

        {/* الصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: isArabic ? -50 : 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 max-w-sm w-full"
        >
          <Image
            src="/images/justice-scale.png"
            alt="Justice Scale"
            width={350}
            height={350}
            className="rounded-lg object-cover w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LegalServicesSection;
