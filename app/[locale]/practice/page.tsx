"use client";
import { use, useEffect, useState } from 'react';
import { fetchServices } from '@/sanity/lib/fetchDynamicPage';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import ImageHeader from '@/components/ui/ImageHeader';
import Image from 'next/image';
import AnimateBox from '@/components/ui/AnimateBox';
import Subscribe from '@/components/ui/Subscribe';
import NotFound404 from '../not-found';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
interface Service {
  pageType: {
    title: string;
    titleEn: string;
    value: string;
  };
  description: string;
  descriptionAr: string;
  image: SanityImageSource;
}
interface ServicesPage {
  breadcrumb: { label: string; labelAr: string; href: string }[];
  hero: {
    title: string;
    titleAr: string;
    subtitle: string;
    subtitleAr: string;
    backgroundImage: SanityImageSource;
  };
  services: Service[];
}

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [services, setServices] = useState<ServicesPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetchServices(locale);
      setServices(res);
      console.log(res);
      setLoading(false);
    };
    getData();
  }, [locale]);
  if(loading) return <Skeleton variant="rectangular" width="100%" height="100vh" />;
  if(!services) return <NotFound404 />;

  return (
    <Box>
    <Box
    width={"100%"}
    sx={{
      bgcolor: '#fff',
      minHeight: '100vh',
      pb: 0,
      px: { xs: '1.5rem', md: '5vw' },
      pt: { xs: 1, md: 3 },
      position: 'relative',
    }}
  >
    {/* Breadcrumb */}
    <AnimateBox animation={locale === 'ar' ? 'slideRight' : 'slideLeft'} delay={0.1}>
      <Box sx={{ pt: 2, pb: '20px', fontSize: '13px' }}>
        {services?.breadcrumb.map((bc, i) => (
          <Box key={i} display="inline">
            {(
              <Link  href={bc.href || ""} style={{ color: '#444', textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{ fontSize: '.8rem' }}
                  color={i === (services?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
                >
                  {locale === 'ar' ? bc.labelAr : bc.label}
                </Typography>
              </Link>
            ) }
            {i < (services?.breadcrumb?.length || 0) - 1 && <> &gt; </>}
          </Box>
        ))}
      </Box>
    </AnimateBox>
    {/* Hero */}
    <AnimateBox animation="fadeUp" delay={0.1}>
      <ImageHeader
        title={locale === 'ar' ? services?.hero?.titleAr || '' : services?.hero?.title || ''}
        subtitle={locale === 'ar' ? services?.hero?.subtitleAr || '' : services?.hero?.subtitle || ''}
        imgHeader={services?.hero?.backgroundImage || ''}
      />
    </AnimateBox>
      {/* Services Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: '2.5rem',
          mt: 4,
          px: { xs: '1.5rem', md: '5vw' },
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={320} sx={{ borderRadius: '16px' }} />
            ))
          : services?.services?.map((service, idx) => (
              <AnimateBox animation="fadeUp" delay={0.1 + idx * 0.1} key={service.pageType?.value || idx}>
                <Box
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    // boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                    <Image
                      src={service.image ? urlFor(service.image).url() : '/images/placeholder.png'}
                      alt={locale === 'ar' ? service.pageType?.title : service.pageType?.titleEn}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </Box>
                  <Box sx={{ py: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.5rem' },
                        mb: '0.5rem',
                      }}
                    >
                        {locale === 'ar' ? service.pageType?.title : service.pageType?.titleEn}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#888',
                        fontSize: { xs: '.8rem', md: '1rem' },
                        mb: '1.2rem',
                        flex: 1,
                      }}
                    >
                      {locale === 'ar' ? service.descriptionAr : service.description || ''}
                    </Typography>
                    <Button
                      sx={{
                        color: '#C8931C',
                        fontSize: '1rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        alignSelf: 'flex-start',
                        mt: 'auto',
                      }}
                      href={`/${locale}/practice/${service.pageType?.value}/`}
                    >
                      {locale === 'ar' ? "اقرأ المزيد" : "Read More"}
                    </Button>
                  </Box>
                </Box>
              </AnimateBox>
            ))}
      </Box>
    </Box>
  <Subscribe locale={locale}  isAdmin={false}/>
    </Box>
  );
} 