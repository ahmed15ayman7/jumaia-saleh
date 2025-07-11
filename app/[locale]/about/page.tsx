'use client'
import ImageHeader from '@/components/ui/ImageHeader'
import { fetchAboutUs } from '@/sanity/lib/fetchDynamicPage'
import { Box, Button, Divider, ListItemText, List, ListItem, ListItemIcon, Typography, Skeleton } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import AnimateBox from '@/components/ui/AnimateBox'
import { CheckCircleRounded } from '@mui/icons-material';
import Advocates from '@/components/shared/Advocates'
import Subscribe from '@/components/ui/Subscribe'
import NotFound404 from '../not-found'
import Link from 'next/link'
import OurLawyers from '@/components/shared/OurLawyers'

interface AboutUsData  {
    breadcrumb: {
        label: string
        labelAr: string
        href: string
    }[]
    hero: {
        backgroundImage: SanityImageSource
        title: string
        titleAr: string
        subtitle: string
        subtitleAr: string
    }
    content: {
        title: string
        titleAr: string
        author: string
        authorAr: string
        date: string
        description: string
        descriptionAr: string
    }
    brochure: {
        title: string
        titleAr: string
        description: string
        descriptionAr: string
        buttons: {
            label: string
            labelAr: string
            link: string
        }[]
    }
    vision: {
        title: string
        titleAr: string
        description: string
        descriptionAr: string
        description2: string
        descriptionAr2: string
        description3: string
        descriptionAr3: string
    }
    whyUs: {
        title: string
        titleAr: string
        description: string
        descriptionAr: string
        points: {
            label: string
            labelAr: string
        }[]
    }
    statistics: {
        label: string
        title: string
        titleAr: string
        labelAr: string
    }
}

const AboutUsPage = ({params}:{params:Promise<{locale:string}>}) => {
    const {locale} =  use(params)   
    let [isLoading,setIsLoading] = useState(true)
    let [data,setdata] = useState<AboutUsData | null>(null)
    useEffect(() => {
        let fetchData = async () => {
            setIsLoading(true)
            let res = await fetchAboutUs()
            console.log(res)
            setdata(res)
            setIsLoading(false)
        }
        fetchData()
    }, [])
    if(isLoading) return (
      <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"100vh"} />
    )
    if(!data) return (
      <NotFound404 locale='ar' />
    )
    
  return (
    <Box>
    <Box width={"100%"} height={"100%"} sx={{
        bgcolor: "#fff",
        minHeight: "100vh",
        pb: 0,
        px: { xs: "1.5rem", md: "5vw" },
        pt: { xs: 1, md: 3 },
        position: "relative",
    }}>
        <AnimateBox animation={locale === "ar" ? "slideRight" : "slideLeft"} delay={0.1}>
             {/* Breadcrumb */}
        <Box sx={{ pt: 2, pb: '20px', fontSize: "13px" }}>
          {data?.breadcrumb?.map((bc, i) => (
            <Box key={i} display="inline">
              {(
                <Link
                  href={bc.href || ""}
                  style={{ color: "#444", textDecoration: "none" }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: ".8rem",
                    }}
                    color={
                      i === (data.breadcrumb?.length || 0) - 1
                        ? "primary.main"
                        : "#444"
                    }
                  >
                    {locale === "ar" ? bc.labelAr : bc.label}
                  </Typography>
                </Link>
              ) }
              {i < (data.breadcrumb?.length || 0) - 1 && <> &gt; </>}
            </Box>
          ))}
        </Box>
        </AnimateBox>
        <AnimateBox animation='fadeUp' delay={0.1}>
        <ImageHeader title={locale === "ar" ? data?.hero?.titleAr || "" : data?.hero?.title || ""} subtitle={locale === "ar" ? data?.hero?.subtitleAr || "" : data?.hero?.subtitle || ""} imgHeader={data?.hero?.backgroundImage || ""} />
        </AnimateBox>
        {/* Content Section */}
        <Box
      sx={{
        maxWidth: {xs:"100%",md:"90%"},
        mx: 'auto',
        px: { xs: 2, md: 0 },
        // pb: { xs: 4, md: 7 },
        position: 'relative',
        textAlign: { xs: 'center', md: locale === "ar" ? 'right' : 'left' },
        direction: locale === "ar" ? 'rtl' : 'ltr',
        zIndex: 2,
      }}
    >
      {/* Title */}
      <AnimateBox animation="fadeUp" delay={0.1}>
        <Typography
          variant="h3"
          sx={{
            color: 'primary.main',
            fontSize: { xs: '6vw', md: '2.5rem' },
            fontWeight: 700,
            mb: { xs: 1, md: '30px' },
          }}
        >
          {locale === "ar" ? data?.content?.titleAr : data?.content?.title || ""}
        </Typography>
      </AnimateBox>

      {/* Author + Date */}
      <AnimateBox animation="fadeUp" delay={0.2}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#4d4d4d',
            mb: 1,
          }}
        >
          {locale === "ar" ? data?.content?.authorAr : data?.content?.author || ""}{' '}
          <Typography component="span" sx={{ fontWeight: 400, color: '#777' }}>
            &nbsp; {new Date(data?.content?.date || "").toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Typography>
      </AnimateBox>

      {/* Divider */}
      <AnimateBox animation="scaleIn" delay={0.25}>
        <Divider sx={{ mb: { xs: 1, md: '20px' }, mx: 0, width: "100%",maxWidth: {xs:"100%",md:"90%"} }} />
      </AnimateBox>

      {/* Description */}
      <AnimateBox animation="fadeUp" delay={0.3}>
        <Typography
          sx={{
            color: '#627174',
            mb: 2,
            fontFamily: "'Manrope-Regular', Helvetica",
            fontSize: { xs: '.85rem', sm: '1rem' },
            lineHeight: 2,
          }}
        >
          {locale === "ar" ? data?.content?.descriptionAr : data?.content?.description || ""}
        </Typography>
      </AnimateBox>
    </Box>
    {/* Brochure Section */}
    <Box
      sx={{
        maxWidth: {xs:"100%",md:"90%"},
        textAlign: { xs: "center", md: locale === "ar" ? "right" : "left" },
        mx: "auto",
        px: { xs: 2, md: 0 },
        my: { xs: 5, md: "40px" },
        zIndex: 2,
        position: "relative",
      }}
    >
      {/* Title */}
      <AnimateBox animation="fadeUp" delay={0.1}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            fontWeight: 700,
            color: "#183826",
            mb: 1,
          }}
        >
          {locale === "ar" ? data?.brochure?.titleAr : data?.brochure?.title || ""}
        </Typography>
      </AnimateBox>

      {/* Description */}
      <AnimateBox animation="fadeUp" delay={0.2}>
        <Typography
          sx={{
            mb: 3,
            color: "#191C1E",
            fontWeight: 300,
            fontSize: { xs: ".8rem", sm: "1rem" },
          }}
        >
          {locale === "ar" ? data?.brochure?.descriptionAr : data?.brochure?.description || ""}
        </Typography>
      </AnimateBox>

      {/* Buttons */}
      <AnimateBox animation="bounceIn" delay={0.3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {data?.brochure?.buttons?.map((file: any, i: number) => (
            <a
              key={i}
              href={file.link}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                sx={{
                  bgcolor: i === 0 ? "#cf9425" : "#fff",
                  color: i === 0 ? "#fff" : "#cf9425",
                  border: "2px solid #cf9425",
                  borderRadius: "25px",
                  fontWeight: 700,
                  fontSize: { xs: ".8rem", md: "1rem" },
                  minWidth: { xs: "100%", md: 280 },
                  maxWidth: { xs: "100%", md: 280 },
                  py: { xs: 1, md: 1.2 },
                  px: { xs: 1, md: 2 },
                  "&:hover": {
                    bgcolor: "#cf9425",
                    color: "#fff",
                  },
                  mb: { xs: i === 0 ? 1 : 0, sm: 0 },
                }}
              >
                {locale === "ar" ? file.labelAr : file.label}
              </Button>
            </a>
          ))}
        </Box>
      </AnimateBox>
    </Box>
    {/* Divider */}
    <AnimateBox animation="scaleIn" delay={0.25}>
        <Divider sx={{  mx: 0, width: "100%" }} />
      </AnimateBox>
    {/* Vision Section */}
    <Box
      component="section"
      sx={{
        maxWidth: {xs:"100%",md:"90%"},
        mx: "auto",
        px: { xs: 2, md: 0 },
        my: { xs: 5, md: "40px" },
        textAlign: { xs: "center", md: locale === "ar" ? "right" : "left" },
      }}
    >
      {/* Title */}
      <AnimateBox animation="fadeUp" delay={0.1}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: "#cf9425",
            mb: 2,
          }}
        >
          {locale === "ar" ? data?.vision?.titleAr : data?.vision?.title}
        </Typography>
      </AnimateBox>

      {/* Paragraphs */}
      {[1, 2, 3].map((n, i) => {
            const desc = locale === "ar"
            // @ts-ignore
          ? data?.vision?.[`descriptionAr${n > 1 ? n : ""}`]
          // @ts-ignore
          : data?.vision?.[`description${n > 1 ? n : ""}`];

        return (
          <AnimateBox key={i} animation="fadeUp" delay={0.2 + i * 0.15}>
            <Typography
              sx={{
                fontSize: { xs: ".9rem", md: "1rem" },
                fontWeight: 300,
                color: "#191C1E",
                mb: 2,
              }}
            >
              {desc}
            </Typography>
          </AnimateBox>
        );
      })}
    </Box>
    {/* Why Us Section */}
    <Divider sx={{ my: { xs: 4, md: 7 } }} />

      <Box
        sx={{
          maxWidth: {xs:"100%",md:"90%"},
          mx: "auto",
          px: { xs: 2, md: 0 },
          pb: {xs: 4, md: "80px"},
          textAlign: { xs: "center", md: locale === "ar" ? "right" : "left" },
        }}
      >
        {/* Title */}
        <AnimateBox animation="fadeUp" delay={0.1}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              fontWeight: 700,
              color: "#cf9425",
              mb: 1,
            }}
          >
            {locale === "ar" ? data?.whyUs?.titleAr : data?.whyUs?.title}
          </Typography>
        </AnimateBox>

        {/* Description */}
        <AnimateBox animation="fadeUp" delay={0.2}>
          <Typography
            sx={{
              mb: 2,
              color: "#191C1E",
              fontWeight: 300,
              fontSize: { xs: ".8rem", sm: "1rem" },
            }}
          >
            {locale === "ar" ? data?.whyUs?.descriptionAr : data?.whyUs?.description}
          </Typography>
        </AnimateBox>

        {/* Points */}
        <List>
          {data?.whyUs?.points?.map((whyKey: {label: string, labelAr: string}, i: number) => (
            <AnimateBox key={i} animation="fadeUp" delay={0.3 + i * 0.1}>
              <ListItem
                sx={{
                  pl: 0,
                  textAlign: locale === "ar" ? "right" : "left",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: "#cf9425",
                    paddingTop: "10px",
                  }}
                >
                  <CheckCircleRounded />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className="text-[#1d2327] text-[1rem] max-sm:text-[.7rem]">
                      {locale === "ar" ? whyKey.labelAr : whyKey.label}
                    </span>
                  }
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: ".8rem", sm: "1rem" },
                      color: "#1d2327",
                      fontWeight: 500,
                      lineHeight: 1.5,
                    },
                  }}
                />
              </ListItem>
            </AnimateBox>
          ))}
        </List>
      </Box>
    </Box>
{/* Advocates */}
      <Advocates locale={locale} isAdmin={false} isbg={true} />
      <OurLawyers locale={locale} isAdmin={false} />
      {/* Subscribe */}
      <Subscribe locale={locale} isAdmin={false} />
    </Box>
    
  )
}

export default AboutUsPage