'use client'

import DynamicPage from '@/components/ui/dynamicPage'
import React, { useEffect, useState } from 'react'
import { fetchDynamicPage } from '@/sanity/lib/fetchDynamicPage'
import { Skeleton } from '@mui/material';

const Page = ({ params }: { params: Promise<{ locale: string, slug: string }> }) => {
  const [locale, setLocale] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  const [data, setData] = useState<any>(null);

  const isAdmin = true;
  const isRTL = locale === "ar";

  // حل الـ Promise بتاع params
  useEffect(() => {
    (async () => {
      const resolvedParams = await params;

      console.log("resolvedParams:", resolvedParams);

      setLocale(resolvedParams.locale);
      setSlug(resolvedParams.slug);
    })();
  }, [params]);

  // Fetch Sanity content
  useEffect(() => {
    if (slug && locale) {
      console.log("fetching dynamic page",999999, slug, locale);
      fetchDynamicPage(slug, locale).then((res) => {
        console.log("Fetched Page Data:", res);
        setData(res);
      });
    }
  }, [slug, locale]);


  if (!data || !locale) {
    return (
      <div>
        <Skeleton variant="rectangular" width="100%" height={500} />
      </div>
    );
  }

  return (
    <DynamicPage
      data={{
        ...data,...{
          image: data.sharedPageContent.image,
          brochureFiles: data.sharedPageContent.brochureFiles,
          newsletterSlides: data.sharedPageContent.newsletterSlides,
          relatedServices: data.sharedPageContent.relatedServices,
        }
      }}
      locale={locale}
      isAdmin={isAdmin}
      isRTL={isRTL}
    />
  );
};

export default Page;
