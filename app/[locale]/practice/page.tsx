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

interface Service {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: SanityImageSource;
  slug: { current: string };
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
            {bc.href ? (
              <a href={bc.href} style={{ color: '#444', textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{ fontSize: '.8rem' }}
                  color={i === (services?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
                >
                  {locale === 'ar' ? bc.labelAr : bc.label}
                </Typography>
              </a>
            ) : (
              <Typography
                component="span"
                color={i === (services?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
              >
                {locale === 'ar' ? bc.labelAr : bc.label}
              </Typography>
            )}
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
              <AnimateBox animation="fadeUp" delay={0.1 + idx * 0.1} key={service.slug?.current || idx}>
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                    <Image
                      src={urlFor(service.image).url() || '/images/placeholder.png'}
                      alt={locale === 'ar' ? service.titleAr : service.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ p: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2.4rem' },
                        mb: '0.5rem',
                      }}
                    >
                      {locale === 'ar' ? service.titleAr : service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#888',
                        fontSize: { xs: '1.1rem', md: '1.6rem' },
                        mb: '1.2rem',
                        flex: 1,
                      }}
                    >
                      {locale === 'ar' ? service.descriptionAr : service.description}
                    </Typography>
                    <Button
                      sx={{
                        color: '#C8931C',
                        fontSize: '1.6rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        alignSelf: 'flex-start',
                        mt: 'auto',
                      }}
                      href={`/${locale}/services/${service.slug?.current}`}
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