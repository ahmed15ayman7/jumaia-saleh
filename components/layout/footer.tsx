"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";

const socialMedia = [
  { icon: <FacebookIcon />, nameKey: "facebook" },
  { icon: <InstagramIcon />, nameKey: "instagram" },
  { icon: <TwitterIcon />, nameKey: "twitter" },
  { icon: <LinkedInIcon />, nameKey: "linkedin" },
];

const Footer = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const t = useTranslations("footer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // navigation columns as in the image
  const navigationData = [
    {
      aboutTextKey: "about",
      links: [],
    },
    {
      titleKey: null,
      links: ["aboutus", "services", "blog", "contactus"],
    },
    {
      titleKey: null,
      links: ["support", "knowledge", "livechat"],
    },
    {
      titleKey: null,
      links: ["jobs", "team", "leadership", "privacy"],
    },
    {
      titleKey: null,
      links: ["nordicchair", "kruzoaero", "ergonomic"],
    },
  ];

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading(locale === "ar" ? "جاري التحديث..." : "Updating...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() =>
        toast.success(locale === "ar" ? "تم التحديث بنجاح" : "Updated successfully", { id: toastId })
      )
      .catch(() =>
        toast.error(locale === "ar" ? "فشل التحديث" : "Update failed", { id: toastId })
      );
  };

  return (
    <Box
      sx={{
        width: "100%",
        color: "white",
        overflow: "hidden",
        position: "relative",
        background:
        'linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)',
      
      }}
      ref={ref}
    >
      <Box sx={{ position: "relative" }}>
        {/* Decorative Images */}
        <Box
          sx={{
            position: "absolute",
            right: locale === "ar" ? "auto" : 0,
            left: locale === "ar" ? 0 : "auto",
            bottom: "0",
            height: { xs: "230px", md: "46vh" },
            width: { xs: "280px", md: "35vw" },
            zIndex: 0,
            pointerEvents: "none",
            display: { xs: "none", sm: "block" },
          }}
        >
          {/* /images/daco4065171.svg: rotates if ar */}
          <Box sx={{ position: "relative", width: { xs: "150px", md: "265px" }, height: "100%", ml: "auto" }}>
            <motion.img
            src="/images/daco4065171.svg"
            alt="Decorative image"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
                position: "absolute",
                width: "65%",
                height: "100%",
                bottom: 0,
                left: "35%",
                objectFit: "cover",
                transform: locale === "ar" ? "rotateY(180deg)" : undefined,
                transition: "transform 0.3s",
              }}
            />
            <motion.img
            src="/images/pngwing1.png"
            alt="Decorative Element"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {  }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
                position: "absolute",
                width: "100%",
                height: "94%",
                bottom: "0%",
                left: 0,
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        {/* Main animated content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Stack
            spacing={{ xs: 4, md: 8 }}
            sx={{
              width: "100%",
              maxWidth: "1108px",
              mx: "auto",
              py: { xs: "7vw", md: "7vh" },
              px: { xs: 2, md: 4 },
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Upper part: Title + columns */}
            <Stack spacing={{ xs: 5, md: 8 }}>
              <Stack spacing={2}>
                {/* Editable headline */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#cf9425",
                    maxWidth: { xs: "100%", md: "497px" },
                    fontSize: { xs: "5vw", md: "2.2vw", lg: "1.6vw" },
                  }}
                >
                  <EditableText
                    value={t("title")}
                    onSave={val => onSave("footer.title", val)}
                    isAdmin={isAdmin}
                  />
                </Typography>

                <Grid
                  container
                  spacing={3}
                  sx={{ width: "100%", flexWrap: "wrap", pt: 2 }}
                >
                  {navigationData.map((column, index) => (
                    <Grid
                      key={index}
                      component="div"
                      size={{xs: 12, sm: index === 0 ? 12 : 6, md: index === 0 ? 4 : 2}}
                    >
                      {column.aboutTextKey ? (
                        <Typography variant="body2" sx={{ lineHeight: 1.5, fontSize: { xs: "3vw", md: "1vw" }, maxWidth: "370px" }}>
                          <EditableText
                            value={t(`about`)}
                            onSave={val => onSave(`footer.about`, val)}
                            isAdmin={isAdmin}
                          />
                        </Typography>
                      ) : (
                        <Stack spacing={1}>
                          {column.links.map((linkKey, linkIndex) => (
                            <Typography
                              variant="body2"
                              key={linkIndex}
                              sx={{
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                                lineHeight: 2,
                                fontSize: { xs: "3vw", md: "1vw" },
                              }}
                            >
                              <EditableText
                                value={t(`links.${linkKey}`)}
                                onSave={val => onSave(`footer.links.${linkKey}`, val)}
                                isAdmin={isAdmin}
                              />
                            </Typography>
                          ))}
                        </Stack>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Stack>

                      {/* Social media icons */}
                      <Stack direction="row" spacing={1.5}>
                {socialMedia.map((social, index) => (
                  <IconButton
                    key={index}
                    aria-label={t(`social.${social.nameKey}`)}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      width: "41px",
                      height: "41px",
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>

            {/* Divider & bottom bar */}
            <Stack spacing={2}>
              <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: { xs: 1.5, sm: 0 },
                  width: "90%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "10px", sm: "13px" },
                  }}
                >
                  <EditableText
                    value={t("copyright")}
                    onSave={val => onSave("footer.copyright", val)}
                    isAdmin={isAdmin}
                  />
                </Typography>

                <Stack direction="row" spacing={3}>
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    <EditableText
                      value={t("terms")}
                      onSave={val => onSave("footer.terms", val)}
                      isAdmin={isAdmin}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    <EditableText
                      value={t("privacy")}
                      onSave={val => onSave("footer.privacy", val)}
                      isAdmin={isAdmin}
                    />
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Footer;