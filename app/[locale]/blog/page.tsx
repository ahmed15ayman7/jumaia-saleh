"use client";
import ImageHeader from '@/components/ui/ImageHeader';
import { fetchBlog, fetchBlogPage } from '@/sanity/lib/fetchDynamicPage';
import { Box, Button, Typography, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AnimateBox from '@/components/ui/AnimateBox';
import Subscribe from '@/components/ui/Subscribe';
import NotFound404 from '../not-found';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
interface BlogCard {
  date: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  slug: { current: string };
  image: SanityImageSource;
}
interface BlogPage {
  breadcrumb: { label: string; labelAr: string; href: string }[];
  hero: {
    backgroundImage: SanityImageSource;
    title: string;
    titleAr: string;
    subtitle: string;
    subtitleAr: string;
  };
}

const PAGE_SIZE = 4;

const BlogsPage = ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = React.use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [blogPage, setBlogPage] = useState<BlogPage | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // جلب البلوغز
      const res = await fetchBlog( (page - 1) * PAGE_SIZE, PAGE_SIZE);
      setBlogs(res);
      const blogPage = await fetchBlogPage(locale);
      setBlogPage(blogPage);
      // جلب العدد الكلي (مرة واحدة فقط)
      if (page === 1) {
        const all = await fetchBlog( 0, 1000);
        setTotal(all.length);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [locale, page]);

  // if (isLoading) return <Skeleton variant="rectangular" animation="wave" width={"100%"} height={"100vh"} />;
  if (!blogPage) return <NotFound404 />;

  const pagesCount = Math.ceil(total / PAGE_SIZE);

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
            {blogPage?.breadcrumb?.map((bc, i) => (
              <Box key={i} display="inline">
                {(
                  <Link href={bc.href || ""} style={{ color: '#444', textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{ fontSize: '.8rem' }}
                      color={i === (blogPage?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
                    >
                      {locale === 'ar' ? bc.labelAr : bc.label}
                    </Typography>
                  </Link>
                ) }
                {i < (blogPage?.breadcrumb?.length || 0) - 1 && <> &gt; </>}
              </Box>
            ))}
          </Box>
        </AnimateBox>
        {/* Hero */}
        <AnimateBox animation="fadeUp" delay={0.1}>
          <ImageHeader
            title={locale === 'ar' ? blogPage?.hero?.titleAr || '' : blogPage?.hero?.title || ''}
            subtitle={locale === 'ar' ? blogPage?.hero?.subtitleAr || '' : blogPage?.hero?.subtitle || ''}
            imgHeader={blogPage?.hero?.backgroundImage || ''}
          />
        </AnimateBox>
        {/* Blogs Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: '16px',
            maxWidth: '1040px',
            mt: 4,
            mx: 'auto',
          }}
        >
          {blogs.map((blog, idx) => (
            <AnimateBox animation="fadeUp" delay={0.1 + idx * 0.1} key={blog.slug.current}>
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
                <Box sx={{ aspectRatio: '2/1', width: '100%', position: 'relative' }}>
                  <Image
                    src={urlFor(blog.image).url() || '/images/placeholder.png'}
                    alt={locale === 'ar' ? blog.titleAr : blog.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                  />
                </Box>
                <Box sx={{ py: '1.5rem',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',flexGrow:1}}>
                  <Box
                    sx={{
                      display: 'inline-block',
                      border: '1px solid #C8931C',
                      borderRadius: '3px',
                      px: '1rem',
                      py: '0.2rem',
                      color: '#C8931C',
                      width: 'fit-content',
                      fontSize: {xs:'.7rem',md:'.9rem'},
                      mb: '1rem',
                    }}
                  >
                    {blog.date?.split('-').reverse().join('-')}
                  </Box>
                  <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <Box>

                  
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.5rem' },
                      mb: '0.5rem',
                    }}
                  >
                    {locale === 'ar' ? blog.titleAr : blog.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#888',
                      fontSize: { xs: '.8rem', md: '1rem' },
                      mb: '1.2rem',
                    }}
                  >
                    {locale === 'ar' ? blog.descriptionAr : blog.description}
                  </Typography></Box>
                  <Button
                    sx={{
                      color: '#C8931C',
                      fontSize: {xs:'.7rem',md:'1rem'},
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '0.5rem',
                      textTransform: 'none',
                    }}
                    endIcon={locale === 'en' ? <ArrowForwardIosRounded sx={{ fontSize: {xs:'.7rem',md:'1rem'} }} /> : <ArrowBackIosRounded sx={{ fontSize: {xs:'.7rem',md:'1rem'} }} />}
                    href={`/${locale}/blogs/${blog.slug.current}`}
                  >
                  {locale === 'ar' ? "اقرأ اكثر " : "Read More"}
                  </Button>
                </Box>
                </Box>
              </Box>
            </AnimateBox>
          ))}
        </Box>
        {/* Pagination */}
        <Box sx={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', mt: 6 }}>
          {[...Array(pagesCount)].map((_, i) => (
            <Button
              key={i}
              sx={{
                minWidth: '48px',
                minHeight: '48px',
                border: '1.5px solid #C8931C',
                borderRadius: '8px',
                bgcolor: page === i + 1 ? '#C8931C' : '#fff',
                color: page === i + 1 ? '#fff' : '#C8931C',
                fontSize: '1.6rem',
                fontWeight: 500,
              }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          {page < pagesCount && (
            <Button
              sx={{
                minWidth: '120px',
                minHeight: '48px',
                border: '1.5px solid #C8931C',
                borderRadius: '8px',
                color: '#C8931C',
                fontSize: {xs:'.7rem',md:'1rem'},
                fontWeight: 500,
                bgcolor: '#fff',
              }}
              onClick={() => setPage(page + 1)}
            >
              {locale === 'ar' ? "الصفحة التالية" : "Next Page"}
            </Button>
          )}
        </Box>
      </Box>
      {/* Subscribe */}
      <Subscribe locale={locale} isAdmin={false} />
    </Box>
  );
};

export default BlogsPage;