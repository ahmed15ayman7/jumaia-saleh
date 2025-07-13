"use client";

import {
  Box,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import RelatedServices from "./RelatedServices";
import Newsletter from "./Newsletter";
import Subscribe from "./Subscribe";
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AnimateBox from "./AnimateBox";
import Link from "next/link";
import ImageHeader from "./ImageHeader";
interface PracticeAreaProps {
  data: {
    relatedTitle?: string;
    relatedDesc?: string;
    relatedServices?: { image: SanityImageSource; title: string, titleAr: string }[];
    breadcrumb?: { label: string; href?: string }[];
    image?: SanityImageSource;
    mainTitle?: string;
    subtitle?: string;
    description?: string;
    endDescription?: string;
    points?: { title: string; desc: string }[];
    readMore?: string;
    readMoreLink?: string;
    brochureTitle?: string;
    brochureDesc?: string;
    brochureFiles?: { label: string; link: string, labelAr: string }[];
    whyTitle?: string;
    whyDesc?: string;
    whyPoints?: string[];
    bottomImage?: SanityImageSource;
    newsletterTitle?: string;
    newsletterDesc?: string;
    newsletterInput?: string;
    newsletterCta?: string;
    newsletterSlides?: {
      backgroundImage?: SanityImageSource;
      contentImage?: SanityImageSource;
      label?: string;
      labelAr?: string;
      title?: string;
      titleAr?: string;
    }[];
    phone?: string;
  };
  locale: string;
  isAdmin: boolean;
  // for RTL absolute image positioning
  isRTL?: boolean;
}

export default function DynamicPage({
  data,
  locale,
  isAdmin,
  isRTL,
}: PracticeAreaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "100vh",
        pb: 0,
        maxWidth: "100vw",
        overflowX: "hidden",
        pt: { xs: 1, md: 0 },
        position: "relative",
      }}
    >
      <Box sx={{
        px: { xs: "1.5rem", md: "5vw" },
        position: "relative",
      }}> 
        

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        ref={ref}
        style={{
          position: "relative",
        }}
      >
           {/* Breadcrumb */}
    <AnimateBox animation={locale === 'ar' ? 'slideRight' : 'slideLeft'} delay={0.1}>
      <Box sx={{ pt: {xs: ".9vh",md: 2}, pb: '10px', fontSize: '13px' }}>
        {data?.breadcrumb?.map((bc, i) => (
          <Box key={i} display="inline">
              <Link href={bc.href||""} style={{ color: '#444', textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{ fontSize: {xs: '.7rem', md: '.8rem' }}}
                  color={i === (data?.breadcrumb?.length || 0) - 1 ? 'primary.main' : '#444'}
                >
                  { bc.label}
                </Typography>
              </Link>
           
            {i < (data?.breadcrumb?.length || 0) - 1 && <> &gt; </>}
          </Box>
        ))}
      </Box>
    </AnimateBox>

        {/* Main Image */}
        {/* <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            mx: "auto",
            borderRadius: "8px",
            overflow: "hidden",
            mb: { xs: 3, md: 6 },
            boxShadow: 3,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Image
            src={urlFor(data.image as SanityImageSource).url() || ""}
            alt=""
            width={1200}
            height={650}
            style={{
              width: "100%",
              // height: "auto",
              display: "block",
              objectFit: "cover",
            }}
            priority
          />
        </Box> */}
        <ImageHeader
          imgHeader={data.image as SanityImageSource}
          title={""}
          subtitle={""}
          isService={true}
        />
        <Box sx={{
          maxWidth: {xs:"100%",md:"90%"},
          mx: "auto",
          // px: { xs: 2, md: 0 },
          pb: { xs: 4, md: 7 },
          pt: { xs: 1, md: 0 },
          position: "relative",
        }}>
        <Box
          sx={{
            maxWidth: {xs:"100%",md:"90%"},
            mx: "auto",
            position: "relative",
            textAlign: locale === "ar" ? "right" : "left",
            zIndex: 2,
          }}
        >
          {/* Title & Subtitle */}
          <Typography
            variant="h3"
            sx={{
              color: "primary.main",
              fontSize: { xs: "6vw", md: "2.5rem" },
              fontWeight: 700,
              mb: { xs: 1, md: "20px" },
            }}
          >
            {data.mainTitle}
          </Typography>
          <Divider sx={{ mb: { xs: 1, md: "20px" } }} />
          {/* <Typography
            variant="subtitle1"
            sx={{
              color: "#4d4d4d",
              fontWeight: 600,
              fontSize: { xs: "3.3vw", md: "1.25rem" },
              mb: 2,
            }}
          >
            {data.subtitle}
          </Typography> */}

          {/* Description */}
          <Typography
            sx={{
              color: "#627174",
              mb: 2,
              fontSize: { xs: ".8rem", sm: "1rem" },
            }}
          >
            {data.description}
          </Typography>

          {/* Points */}
          <List sx={{ mb: 2, pl: 1 }}>
            {data.points?.map((point, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography
                  component="div"
                  sx={{ fontSize: {xs: ".8rem", sm: "1rem"}, color: "#627174", mb: 0.5 }}
                >
                  <span >&#8226;</span> {"    "}
                  <span className="text-[#627174]">{point.title}</span>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#627174",
                    fontSize: { xs: ".8rem", sm: "1rem" },
                    ml: {xs: 0, md: 3},
                  }}
                >
                  {point.desc}
                </Typography>
              </Box>
            ))}
          </List>
          <Typography
            sx={{
              color: "#627174",
              mb: 2,
              fontSize: {xs: ".8rem", sm: "1rem"}, 
            }}
          >
            {data.endDescription}
          </Typography>
        </Box>
        {/* Read more */}
        {/* <Box
          sx={{
            maxWidth: {xs:"100%",md:"90%"},
            textAlign:  locale === "ar" ? "right" : "left",
            mx: "auto",
            mb: { xs: 3, md: 6 },
            px: { xs: 0, md: 0 },
          }}
        >
          <Button
            sx={{
              color: "#cf9425",
              fontSize: {xs: ".8rem", sm: "1rem"},
              fontWeight: 600,
              px: 2,
              border: "2px solid transparent",
              borderBottom: "2px solid #cf9425",
              transition: "all .5s",
              "&:hover": {
                backgroundColor: "transparent",
                borderRadius: "6px",
                border: "2px solid #cf9425",
              },
            }}
            disableRipple
            onClick={() => {
              window.open(data.readMoreLink, "_blank");
            }}
          >
            {data.readMore}
          </Button>
        </Box> */}

        {/* Brochure Section */}
        <Box
          sx={{
            maxWidth: {xs:"100%",md:"90%"},
            textAlign: {xs: "center", md: locale === "ar" ? "right" : "left"},
            mx: "auto",
            px: { xs: 2, md: 0 },
            my: { xs: 5, md: 10 },
            zIndex: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              fontWeight: 700,
              color: "#183826",
              mb: 1,
            }}
          >
            {data.brochureTitle}
          </Typography>
          <Typography sx={{ mb: 3, color: "#191C1E",fontWeight: 300, fontSize: {xs: ".8rem", sm: "1rem"} }}>
            {data.brochureDesc}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, justifyContent: {xs: "center", md: "flex-start"} ,alignItems: {xs: "center", md: "flex-start"} }} className=" rtl:space-x-reverse">
            {data.brochureFiles?.map((file, i) => (
              <Button
                key={i}
                variant="outlined"
                href={file.link}
                target="_blank"
                sx={{
                  bgcolor: i === 0 ? "#cf9425" : "#fff",
                  color: i === 0 ? "#fff" : "#cf9425",
                  border: "2px solid #cf9425",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: { xs: ".8rem", md: "1rem" },
                  minWidth: { xs: "100%", md: 280 },
                  maxWidth: { xs: "100%", md: 280 },
                  py: { xs: 1.5, md: 1.2 },
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
            ))}
          </Box>
        </Box>

        {/* Why Us */}
        <Divider sx={{ my: { xs: 4, md: 7 },maxWidth: {xs:"100%",md:"90%"}, mx: "auto" }} />
        <Box
          sx={{ maxWidth: {xs:"100%",md:"90%"}, mx: "auto", px: { xs: 2, md: 0 }, pb: 6, textAlign:  locale === "ar" ? "right" : "left" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              fontWeight: 700,
              color: "#cf9425",
              mb: 1,
            }}
          >
            {data.whyTitle}
          </Typography>
          <Typography sx={{ mb: 2, color: "#191C1E",fontWeight: 300, fontSize: {xs: ".8rem", sm: "1rem"} }}>
            {data.whyDesc}
          </Typography>
          <List>
            {data.whyPoints?.map((whyKey, i) => (
              <ListItem sx={{ pl: 0,textAlign: isRTL ? "right" : "left", display: "flex", alignItems: "flex-start",lineHeight: "1 !important" }} key={i} >
                <ListItemIcon sx={{ minWidth: {xs: 10, md: 36}, color: "#cf9425",paddingTop: "10px",zIndex: 1000,fontSize: {xs: "1rem", md: "1.5rem"} }}>
                  <CheckCircleRoundedIcon  sx={{fontSize: {xs: "1.2rem", md: "2rem"} }} />
                </ListItemIcon>
                <ListItemText
                
                style={{
                  lineHeight: "1 !important",
                }}
                  primary={<span className="text-[#1d2327] text-[1rem] max-sm:text-[.7rem]">{whyKey}</span>}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: ".8rem", sm: "1rem" },
                      color: "#1d2327",
                      fontWeight: 500,
                      lineHeight: "1 !important",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        </Box>
      </motion.div>
      <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "190px",
            zIndex: 0,
            pointerEvents: "none",
            // transform: "rotateY(180deg)",
          }}
        >
          <Image
            src="/images/image-9.svg"
            alt=""
            width={190}
            height={150}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <Newsletter
        data={{
          newsletterTitle: data.newsletterTitle || "",
          newsletterDesc: data.newsletterDesc || "",
          newsletterInput: data.newsletterInput || "",
          newsletterCta: data.newsletterCta || "",
          slides:
            data.newsletterSlides?.map((slide) => ({
              backgroundImage: slide.backgroundImage || "",
              contentImage: slide.contentImage || "",
              label: slide.label || "",
              title: slide.title || "",
              labelAr: slide.labelAr || "",
              titleAr: slide.titleAr || "",
            })) || [],
        }}
        locale={locale}
      />
      <RelatedServices
        data={{
          title: data.relatedTitle || "",
          description: data.relatedDesc || "",
          practiceAreas:
            data.relatedServices?.map((service) => ({
              image: service.image || "",
              title: service.title || "",
              titleAr: service.titleAr || "",
            })) || [],
        }}
        locale={locale}
      />
        <Subscribe locale={locale} isAdmin={isAdmin} />
    </Box>
  );
}
