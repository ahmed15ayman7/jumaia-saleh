"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  ButtonBase,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomSlider from "./CustomSlider";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Phone } from "@mui/icons-material";
interface NewsletterProps {
  data: {
    newsletterTitle?: string;
    newsletterDesc?: string;
    newsletterInput?: string;
    newsletterCta?: string;
    slides?: {
      backgroundImage: SanityImageSource;
      contentImage: SanityImageSource;
      label: string;
      title: string;
      labelAr: string;
      titleAr: string;
    }[];
    phone?: string;
  };
  locale: string;
}

const Newsletter = ({ data, locale }: NewsletterProps) => {
  console.log("data newsletter", data);
  const phoneNumber = "+00971565955502";
  return (
    <Box
      sx={{
        minHeight: { xs: 730, md: 670 },
        bgcolor: "#fcf9f6",
        textAlign: { xs: "center", md: locale === "ar" ? "right" : "left" },
        width: "100vw",
        px: { xs: 1.5, md: "4vw" },
        py: { xs: 7, md: 0 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "1440px",
          alignItems: "center",
          mx: "auto",
        }}
      >
        {/* Left: text */}
        <Grid
          component="div"
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
            mb: { xs: 7, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "90%", md: "85%" },
              display: "flex",
              flexDirection: "column",
              alignItems: {xs: "center", md: "flex-start"},
              justifyContent: {xs: "center", md: "flex-start"},
              textAlign: {
                xs: "center",
                md: locale === "ar" ? "right" : "left",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Manrope-ExtraBold', Helvetica",
                fontWeight: 800,
                color: "primary.dark",
                fontSize: { xs: "1.5rem", md: "2.5rem", lg: "2.5rem" },
                lineHeight: { xs: "1.5rem", md: "2.5rem", lg: "2.5rem" },
                mb: 3,
              }}
            >
              {data.newsletterTitle || ""}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins-Medium', Helvetica",
                fontWeight: 500,
                color: "#606060",
                fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" },
                lineHeight: { xs: "1rem", sm: "1rem", md: "1rem" },
                maxWidth: { xs: "92vw", md: "368px" },
                mb: 5,
              }}
            >
              {data.newsletterDesc || ""}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "40px",
                p: 0,
                minWidth: { xs: 0, md: 0 },
                height: { xs: 44, sm: 48 },
                boxShadow: "none",
                textTransform: "none",
                px: 1.5,
                "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
                display: "flex",
                alignItems: "center",
              }}
              disableElevation
              onClick={() => {
                window.open(`tel:${phoneNumber}`, "_blank");
              }}
            >
              {/* أيقونة داخل دائرة */}
              <Box
                sx={{
                  width: { xs: 34, sm: 38 },
                  height: { xs: 34, sm: 38 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.2, // تباعد الأيقونة عن الرقم
                }}
              >
                {/* <Box
                  component="img"
                  src="/images/call-center.svg" // مسار الأيقونة
                  alt="Call Center"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                /> */}
                <Phone sx={{ color: "white" }} />
              </Box>
              {/* رقم الهاتف */}
              <Box
                component="span"
                sx={{
                  fontFamily: "'Manrope-SemiBold', Helvetica",
                  fontWeight: 700,
                  fontSize: { xs: "4vw", sm: "18px" },
                  letterSpacing: "0.012em",
                  pr: 2.5,
                  pl: 1,
                }}
              >
                {data.newsletterCta || "+97122558666"}
              </Box>
            </Button>
          </Box>
        </Grid>
        {/* Right: slideshow */}
        <Grid
          component="div"
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <CustomSlider slides={data.slides || []} locale={locale} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;
