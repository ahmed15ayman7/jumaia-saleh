'use client'
import ImageHeader from '@/components/ui/ImageHeader'
import { fetchBlogPageSlug, fetchPrivacy } from '@/sanity/lib/fetchDynamicPage'
import { Box, Button, Divider, ListItemText, List, ListItem, ListItemIcon, Typography, Skeleton, } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import AnimateBox from '@/components/ui/AnimateBox'
import Subscribe from '@/components/ui/Subscribe'
import NotFound404 from '../../not-found'
import Link from 'next/link';
interface BlogData  {
  slug: {current: string}
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
        description: string
        descriptionAr: string
        items: {
            title: string
            titleAr: string
            description: string
            descriptionAr: string
        }[]
    }
}

const Page = ({params}:{params:Promise<{locale:string,slug:string}>}) => {
    const {locale,slug} =  use(params)   
    let [isLoading,setIsLoading] = useState(true)
    let [data,setdata] = useState<BlogData | null>(null)
    useEffect(() => {
        let fetchData = async () => {
            setIsLoading(true)
            let res = await fetchBlogPageSlug(slug)
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
        <ImageHeader title={locale === "ar" ? data?.hero?.titleAr || "" : data?.hero?.title || ""} subtitle={locale === "ar" ? data?.hero?.subtitleAr || "" : data?.hero?.subtitle || ""} imgHeader={data?.hero?.backgroundImage || ""} isService />
        </AnimateBox>
        {/* Content Section */}
        <Box
      sx={{
        maxWidth: {xs:"100",md:"90%"},
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
            fontSize: { xs: '6vw', md: '2.3rem' },
            fontWeight: 600,
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
        </Typography>
      </AnimateBox>

      {/* Divider */}
      <AnimateBox animation="scaleIn" delay={0.25}>
        <Divider sx={{ mb: { xs: 1, md: '20px' }, mx: 0, width: "100%" }} />
      </AnimateBox>

      {/* Description */}
      <AnimateBox animation="fadeUp" delay={0.3}>
        <Typography
          sx={{
            color: '#627174',
            mb: 2,
            fontSize: { xs: '.85rem', sm: '1rem' },
            lineHeight: 2,
          }}
        >
          {locale === "ar" ? data?.content?.descriptionAr : data?.content?.description || ""}
        </Typography>
      </AnimateBox>
      <Box
      sx={{
        maxWidth: {xs:"100",md:"90%"},
        mx: 'auto',
        px: { xs: 2, md: 0 },
        py: 6,
        textAlign: { xs: 'center', md: locale === "ar" ? 'right' : 'left' },
        direction: locale === "ar" ? 'rtl' : 'ltr',
      }}
    >
      <List component={"ul"} style={{listStyle:"decimal",textAlign: locale === "ar" ? 'right' : 'left'}}>
        {data?.content?.items?.map((item, index) => (
          <AnimateBox
            key={index}
          >
            <ListItem  disableGutters sx={{ px: 0,direction: locale === "ar" ? 'rtl' : 'ltr',textAlign: locale === "ar" ? 'right' : 'left',listStyleType: "dis" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, color: '#1d2327' }}
                  >
                    {locale === "ar" ? item.titleAr : item.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: '#5a5a5a', fontSize: { xs: '0.85rem', sm: '1rem' } }}
                  >
                    {locale === "ar" ? item.descriptionAr : item.description}
                  </Typography>
                }
              />
            </ListItem>
          </AnimateBox>
        ))}
      </List>
    </Box>
    </Box>
    </Box>
      {/* Subscribe */}
      <Subscribe locale={locale} isAdmin={false} />
    </Box>
    
  )
}

export default Page