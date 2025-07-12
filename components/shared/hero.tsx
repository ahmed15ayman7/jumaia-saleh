'use client';

import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import EditableText from '../EditableText';
import { updateMessage } from '@/lib/updateMessage';
import { toast } from 'sonner';
import { motion, useInView } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Hero = ({
  isAdmin,
  t,
  locale,
  sanityData = null,
}: {
  isAdmin: boolean;
  t: (t: string) => string;
  locale: string;
  sanityData?: any;
}) => {
  const onSave = (key: string, value: string) => {
    const toastId = toast.loading('جاري التحديث...');
    updateMessage({ key, value, locale: locale as 'en' | 'ar' })
      .then(() => {
        toast.success('تم التحديث بنجاح', { id: toastId });
      })
      .catch(() => {
        toast.error('فشل التحديث', { id: toastId });
      });
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Use Sanity data if available, otherwise use translation
  const heroText = sanityData?.hero || t('hero');
  const subtitle = sanityData?.subtitle || t('subtitle');
  const subtitle2 = sanityData?.subtitle2 || t('subtitle2');
  const subtitle3 = sanityData?.subtitle3 || t('subtitle3');
  const description = sanityData?.description || t('description');
  const buttonText = sanityData?.button || t('button');

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          height: {xs: '70vh',md: '100vh'},
          overflow: 'hidden',
          background:
            'linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)',
          pb: { xs: 8, md: 12 },
          pt: { xs: 10, md: 20 },
        }}
      >
        {/* Images */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: locale === 'en' ? '0%' : 'auto',
            left: locale === 'en' ? 'auto' : '0%',
            width: { xs: '30%', sm: '40%', md: '40%' },
            height: {xs: '70vh',md: '90vh'},
            zIndex: 1,
          }}
        >
          <motion.img
            src="/images/daco4065171.svg"
            alt="Lady Justice Statue"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:h-[80vh] h-auto"
            style={{
              position: 'absolute',
              bottom: '0%',
              transform:
                locale === 'ar' ? 'rotateY(180deg) translateX(-20%)' : 'translateX(20%)',
              width: '100%',

              objectFit: 'contain',
            }}
          />
          <motion.img
            src="/images/pngwing1.png"
            alt="Decorative Element"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="md:h-[80vh] h-auto"
            style={{
              position: 'absolute',
              bottom: '0%',
              left: locale === 'en' ? '0%' : '-20%',
              right: locale === 'en' ? '-20%' : '0%',
              width: '120%',
              objectFit: 'contain',
              zIndex: 8,
            }}
          />
        </Box>

        {/* Bottom background */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '400px',
            bottom: 0,
            left: 0,
            bgcolor: '#f9f7f5',
            zIndex: -1,
          }}
        />

        {/* Main Content */}
        <Box  sx={{ position: "relative",height: "100%",maxWidth: "xl",mx: "auto", zIndex: 2, px: {xs: 4,md: 10},display: 'flex', flexDirection: 'column',  justifyContent: 'center',alignItems:{xs: "center",md: "flex-start"} }}>
          {/* Title */}
          <motion.div
            key={isInView ? 'hero-title-visible' : 'hero-title-hidden'}
            initial={{ opacity: 0, y: 40 }}
            className={`text-center ${locale === "en" ? "md:text-left" : "md:text-right"}`}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="subtitle1" sx={{ color: 'primary.main',fontFamily: 'Manrope',textAlign: {xs: "center",md: locale === "en" ? "left" : "right"} }}>
              <EditableText
                value={heroText}
                onSave={(value: string) => {
                  onSave('home.hero', value);
                }}
                isAdmin={isAdmin}
                className="text-[.8rem] md:text-[1.5rem] min-xl:text-[2rem] font-bold mb-4"
              />
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            key={isInView ? 'hero-subtitle-visible' : 'hero-subtitle-hidden'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center ${locale === "en" ? "md:text-left" : "md:text-right"}`}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.2rem',xl: '4rem' },
                  textAlign: {xs: "center",md: locale === "en" ? "left" : "right"}
                }}
              >
                <EditableText
                  value={subtitle}
                  onSave={(value: string) => onSave('home.subtitle', value)}
                  isAdmin={isAdmin}
                />
                <br />
                <EditableText
                  value={subtitle2}
                  onSave={(value: string) => onSave('home.subtitle2', value)}
                  isAdmin={isAdmin}
                />{' '}
                <Typography
                  component="span"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: 'inherit',
                  }}
                >
                  <EditableText
                    value={subtitle3}
                    onSave={(value: string) => onSave('home.subtitle3', value)}
                    isAdmin={isAdmin}
                  />
                </Typography>
              </Typography>
            </Box>
          </motion.div>

          {/* Description */}
          <motion.div
            key={isInView ? 'hero-description-visible' : 'hero-description-hidden'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                maxWidth: '600px',
                textAlign: {xs: "center",md: locale === "en" ? "left" : "right"},
                mt: 3,
                fontSize: { xs: '.9rem', md: '1.125rem',xl: '1.5rem' },
              }}
            >
              <EditableText
                value={description}
                onSave={(value: string) => onSave('home.description', value)}
                isAdmin={isAdmin}
              />
            </Typography>
          </motion.div>

          {/* Button */}
          <motion.div
            key={isInView ? 'hero-button-visible' : 'hero-button-hidden'}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              variant="contained"
              className="animate-scale"
              sx={{
                mt: 5,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'white',
                px: 4,
                borderRadius: {xs:'25px',md:'25px',xl:'35px'},
                py: 1.5,
                fontSize: { xs: '0.8rem', md: '1rem',xl: '1.5rem' },
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {buttonText}
              {locale === "en" ? (
                          <ArrowForwardIcon
                          className="bounce-h2"
                          sx={{
                            color: "secondary.main",
                            width: 24,
                            height: 24,
                          }}
                          />
                        ) : (
                          <ArrowBackIcon
                          className="bounce-h2"
                          sx={{
                            color: "secondary.main",
                            width: 24,
                            height: 24,
                          }}
                          />
                        )}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
};

export default Hero;
