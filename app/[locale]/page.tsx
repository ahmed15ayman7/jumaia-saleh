"use client";
import ImageHeader from '@/components/ui/ImageHeader';
import ContactForm from '@/components/forms/ContactForm';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function ContactUsPage() {
  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', pb: 6 }}>
      {/* Breadcrumb */}
      <Box sx={{ pt: 2, pb: 1, fontSize: '13px', px: { xs: '1.5rem', md: '5vw' } }}>
        <a href="/" style={{ color: '#C8931C', textDecoration: 'none' }}>الرئيسية</a> &gt; <span style={{ color: '#C8931C' }}>تواصل معنا</span>
      </Box>
      {/* ImageHeader */}
      <ImageHeader
        title="تواصل معنا"
        subtitle="الخيار الأمثل لمحاميك ومستشارك القانوني وأفضل طريق لحقوقك"
        imgHeader="/images/call-center.svg"
      />
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
            bgcolor: '#fff',
            borderRadius: '16px',
            p: { xs: 2, md: 5 },
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            minWidth: 0,
          }}
        >
          <ContactForm />
        </Box>
        {/* Side Section */}
        <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          {/* Image */}
          <Box
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
              aspectRatio: '1/1.1',
              mb: 2,
              minHeight: '260px',
              position: 'relative',
            }}
          >
            <Image src="/images/justice-scale.png" alt="محامي" fill style={{ objectFit: 'cover' }} />
          </Box>
          {/* Call Us */}
          <Box
            sx={{
              bgcolor: 'linear-gradient(135deg, #1e3c3b 0%, #2e5c57 100%)',
              borderRadius: '16px',
              p: { xs: 2, md: 4 },
              color: '#fff',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: '2rem', fontWeight: 700, mb: 1 }}>اتصل بنا</Typography>
            <Typography sx={{ fontSize: '1.4rem', mb: 2 }}>+971 4 834 5000</Typography>
            <Button
              href="tel:+97148345000"
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
              اتصال
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 