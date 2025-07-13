"use client";
import ImageHeader from '@/components/ui/ImageHeader';
import ContactForm from '@/components/forms/ContactForm';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import AnimateBox from '@/components/ui/AnimateBox';
import Subscribe from '@/components/ui/Subscribe';
import { use, useEffect, useState } from 'react';
import { fetchContactPage } from '@/sanity/lib/fetchDynamicPage';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';
import NotFound404 from '../not-found';
import OurLawyers from '@/components/shared/OurLawyers';
interface ContactPage{
  breadcrumb: { label: string; labelAr: string; href: string }[];
  hero: {
    backgroundImage: SanityImageSource;
    title: string;
    titleAr: string;
    subtitle: string;
    subtitleAr: string;
  };
  contactFormData: {
    title: string;
    titleAr: string;
    subtitle: string;
    subtitleAr: string;
    nameLabel: string;
    nameLabelAr: string;
    emailLabel: string;
    emailLabelAr: string;
    phoneLabel: string;
    phoneLabelAr: string;
    serviceTypeLabel: string;
    serviceTypeLabelAr: string;
    messageLabel: string;
    messageLabelAr: string;
    submitButtonLabel: string;
    submitButtonLabelAr: string;
  };
  lowerImage: SanityImageSource;
  phone: string;
  callUsLabel: string;
  callUsLabelAr: string;
  callUsButtonLabel: string;
  callUsButtonLabelAr: string;
}
export default function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  let [contactPage,setContactPage]=useState<ContactPage | null>(null);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    setLoading(true);
    const fetchData=async()=>{
      const res=await fetchContactPage(locale);
      setContactPage(res);
      setLoading(false);
    }
    fetchData();
  },[locale]);
  if(loading) return <Skeleton variant="rectangular" width="100%" height="100vh" />;
  if(!contactPage) return <NotFound404 />;
  return (
    <Box sx={{
      maxWidth: "100vw",
      overflowX: "hidden",
    }}>
    <Box
    width={"100%"}
    sx={{
      bgcolor: '#fff',
      minHeight: '100vh',
      pb: 0,
      px: { xs: '2vw', md: '5vw' },
      pt: { xs: "1vh", md: 3 },
      position: 'relative',
    }}
  >
    {/* Breadcrumb */}
    <AnimateBox animation={locale === 'ar' ? 'slideRight' : 'slideLeft'} delay={0.1}>
      <Box sx={{ pt: {xs: "1vh",md: 2}, pb: '20px', fontSize: '13px' }}>
        {contactPage?.breadcrumb?.map((bc, i) => (
          <Box key={i} display="inline">
            {(
              <Link  href={`/${locale}${contactPage?.breadcrumb.map((bc,index)=>index <= i ? bc.href.split('/').join("") : '').join('/')}` || ""} style={{ color: '#444', textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{ fontSize: '.8rem' }}
                  color={i === (contactPage?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
                >
                  {locale === 'ar' ? bc.labelAr : bc.label}
                </Typography>
              </Link>
            ) }
            {i < (contactPage?.breadcrumb?.length || 0) - 1 && <> &gt; </>}
          </Box>
        ))}
      </Box>
    </AnimateBox>
    {/* Hero */}
    <AnimateBox animation="fadeUp" delay={0.1}>
      <ImageHeader
        title={locale === 'ar' ? contactPage?.hero?.titleAr || '' : contactPage?.hero?.title || ''}
        subtitle={locale === 'ar' ? contactPage?.hero?.subtitleAr || '' : contactPage?.hero?.subtitle || ''}
        imgHeader={contactPage?.hero?.backgroundImage || ''}
      />
    </AnimateBox>
      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          mt: { xs: 4, md: 10 },
          px: { xs: '1.5rem', md: '5vw' },
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            flex: 6,
            bgcolor: '#F1F1F1',
            borderRadius: '16px',
            p: { xs: 2, md: 5 },
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <ContactForm contactFormData={contactPage?.contactFormData || {title: 'تواصل معنا', titleAr: 'تواصل معنا', subtitle: 'اترك رسالة لنا', subtitleAr: 'اترك رسالة لنا', emailLabel: 'البريد الإلكتروني', emailLabelAr: 'البريد الإلكتروني', phoneLabel: 'رقم الهاتف', phoneLabelAr: 'رقم الهاتف', serviceTypeLabel: 'نوع الخدمة', serviceTypeLabelAr: 'نوع الخدمة', messageLabel: 'الرسالة', messageLabelAr: 'الرسالة',submitButtonLabel: 'إرسال', submitButtonLabelAr: 'إرسال',nameLabel: 'الاسم', nameLabelAr: 'الاسم'}} locale={locale}/>
        </Box>
        {/* Side Section */}
        <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column', gap: "14px", minWidth: 0 }}>
          {/* Image */}
          <Box
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
              aspectRatio: '1/1.1',
              mb: 0,
              minHeight: '260px',
              position: 'relative',
            }}
          >
            <Image src={contactPage?.lowerImage ? urlFor(contactPage?.lowerImage).url() : ''} alt="محامي" fill style={{ objectFit: 'cover' }} />
          </Box>
          {/* Call Us */}
          <Box
            sx={{
              background:'linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)',
              borderRadius: '16px',
              p: { xs: 2, md: 4 },
              color: '#fff',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: '2rem', fontWeight: 700, mb: 1 }}>{locale === 'ar' ? contactPage?.callUsLabelAr : contactPage?.callUsLabel}</Typography>
            <Typography sx={{ fontSize: '1.4rem', mb: 2 }}>{ contactPage?.phone}</Typography>
            <Button
              href={`tel:${contactPage?.phone}`}
              sx={{
                bgcolor: '#C8931C',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: '6px',
                px: 4,
                py: 1,
                '&:hover': { bgcolor: '#b07d13' },
              }}
            >
              {locale === 'ar' ? contactPage?.callUsButtonLabelAr : contactPage?.callUsButtonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
      </Box>
    {/* Google Map */}
    <Box
      onClick={() => {
        window.open('https://www.google.com/maps/search/?api=1&query=25.40800,55.50868', '_blank');
      }}
     sx={{
      width: '100%',
      height: '40vh',
      mt: "60px",
      mb: "60px",
      // borderRadius: '16px',
      overflow: 'hidden',
    }}>
      <iframe
        src="https://www.google.com/maps?q=25.40800,55.50868&hl=ar&z=17&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, width: '100%', height: '100%' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
    <OurLawyers locale={locale} isAdmin={false}/>
    <Subscribe locale={locale} isAdmin={false}/>
    </Box>
  );
} 