"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Phone, Mail } from 'lucide-react';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { fetchDynamicPageType } from "@/sanity/lib/fetchDynamicPage";
import { useRouter } from "next/navigation";

const socialMedia = [
  { icon: <FacebookIcon color="primary" />, nameKey: "facebook" },
  { icon: <InstagramIcon color="primary" />, nameKey: "instagram", href: "https://www.instagram.com/jumaia.saleh/" },
  { icon: <TwitterIcon color="primary" />, nameKey: "twitter" },
  { icon: <LinkedInIcon color="primary" />, nameKey: "linkedin" },
];

const Footer = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const t = useTranslations("footer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  let [services, setServices] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetchDynamicPageType("real-estate").then((data) => {
      const order = [
        "Bankruptcy-and-Insolvency-Cases",
        "Insurance-Cases",
        "real-estate",
        "INTERPOL-Cases-and-Extradition",
        "Personal-status-issues",
        "civil-cases",
        "criminal-cases",
        "Commercial-Cases",
        "Establishing-companies-and-drafting-contracts",
        "Legal-Consultancy-Services",
      ];
  
      const sortedData = [...data].sort((a, b) => {
        const aIndex = order.indexOf(a.value);
        const bIndex = order.indexOf(b.value);
        return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
      });
  
      setServices(
        sortedData.map((item: any) => ({
          label: item.title,
          labelEn: item.titleEn,
          href: `/${locale}/practice/${item.value}`,
        }))
      );
    });
  }, []);

  // navigation columns as in the image
  const navigationData = [
    {
      aboutTextKey: "about",
      links: [],
    },
    {
      titleKey: null,
      links: [
        { label: t("links.home"), href: "/" },
        { label: t("links.services"), href: "/practice" },
        { label: t("links.aboutus"), href: "/about" },
        { label: t("links.blog"), href: "/blog" },
        { label: t("links.contactus"), href: "/contact" },
        { label: t("links.quote"), href: "https://wa.me/+971565955502" },
      ],
    },
    {
      titleKey: null,
      links: services.slice(0, 7).map((item: any) => ({
        label: locale === "ar" ? item.label : item.labelEn,
        href: item.href,
      })) as { label: string; href: string }[],
    },
    {
      titleKey: null,
      links: [
        { label: t("links.team"), href: "#our-team" },
        { label: t("links.terms"), href: "/terms" },
        { label: t("links.privacy"), href: "/privacy" },
      ],
    },
    // {
    //   titleKey: null,
    //   links: ["nordicchair", "kruzoaero", "ergonomic"],
    // },
  ];

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading(
      locale === "ar" ? "جاري التحديث..." : "Updating..."
    );
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() =>
        toast.success(
          locale === "ar" ? "تم التحديث بنجاح" : "Updated successfully",
          { id: toastId }
        )
      )
      .catch(() =>
        toast.error(locale === "ar" ? "فشل التحديث" : "Update failed", {
          id: toastId,
        })
      );
  };

  return (
    <Box
      sx={{
        width: "100%",
        color: "white",
        px: { xs: "1wv", sm: "1vw", md: "6vw" },
        overflow: "hidden",
        position: "relative",
        textAlign: {
          xs: "center",
          sm: "center",
          md: locale === "ar" ? "right" : "left",
        },
        background:
          "linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)",
      }}
      ref={ref}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {/* Decorative Images */}
        <Box
          sx={{
            position: "absolute",
            right: locale === "ar" ? "auto" : 0,
            left: locale === "ar" ? 0 : "auto",
            bottom: "0",
            height: { xs: "230px", md: "46vh" },
            width: { xs: "280px", md: "35vw" },
            zIndex: 1,
            pointerEvents: "none",
            display: { xs: "none", sm: "flex" },
            justifyContent: locale === "ar" ? "flex-end" : "flex-start",
          }}
        >
          {/* /images/daco4065171.svg: rotates if ar */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "150px", md: "265px" },
              height: "100%",
              ml: locale === "en" ? "auto" : 0,
              mr: locale === "en" ? 0 : "auto",
            }}
          >
            <motion.img
              src="/images/daco4065171.svg"
              alt="Decorative image"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                position: "absolute",
                width: "65%",
                height: "100%",
                bottom: 0,
                left: locale === "en" ? "auto" : "35%",
                right: locale === "en" ? 0 : "auto",
                objectFit: "cover",
                transform: locale === "ar" ? "rotateY(180deg)" : undefined,
                transition: "transform 0.3s",
              }}
            />
            <motion.img
              src="/images/pngwing1.png"
              alt="Decorative Element"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "94%",
                bottom: "0%",
                left: locale === "ar" ? "auto" : 0,
                right: locale === "ar" ? 0 : "auto",
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
          <Box
            sx={{
              width: "100%",
              maxWidth: "100vw",
              mx: "auto",
              py: { xs: "7vw", md: "7vh" },
              px: { xs: 2, md: 4 },
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Upper part: Title + columns */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
              }}>
                {/* Editable headline */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#cf9425",
                    maxWidth: { xs: "100%", md: "497px" },
                    fontSize: { xs: "1.4rem", md: "1.4rem", lg: "1.8rem" },
                  }}
                >
                  <EditableText
                    value={t("title")}
                    onSave={(val) => onSave("footer.title", val)}
                    isAdmin={isAdmin}
                  />
                </Typography>

                <Grid
                  container
                  spacing={{ xs: 1, md: 3 }}
                  sx={{ width: "100%", flexWrap: "wrap", pt: 2 }}
                >
                  {navigationData.map((column, index) => (
                    <Grid
                      key={index}
                      component="div"
                      size={{
                        xs: index === 0 ? 12 : 4,
                        sm: index === 0 ? 12 : 4,
                        md: index === 0 ? 4 : 2.2,
                      }}
                    >
                      {column.aboutTextKey ? (
                        <Box sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}>
                          <Typography
                            variant="body2"
                            sx={{
                              lineHeight: 1.5,
                              fontSize: { xs: ".9rem", md: "1rem" },
                              maxWidth: "100%",
                            }}
                          >
                            <EditableText
                              value={t(`about`)}
                              onSave={(val) => onSave(`footer.about`, val)}
                              isAdmin={isAdmin}
                            />
                          </Typography>
                          <Box
                            sx={{
                              maxWidth: { xs: "100%", md: "90%" },
                              textAlign: {
                                xs: "center",
                                md: locale === "ar" ? "right" : "left",
                              },
                              mx: {xs: "auto", md: 0},
                              mb: { xs: 3, md: 6 },
                              px: { xs: 0, md: 0 },
                            }}
                          >
                            <Button
                              onClick={() => {
                                router.push(`/${locale}/about`);
                              }}
                              sx={{
                                color: "#cf9425",
                                fontSize: { xs: ".8rem", sm: "1rem" },
                                fontWeight: 600,
                                px: 2,
                                mt: "30px",
                                border: "2px solid transparent",
                                borderBottom: "2px solid #cf9425",
                                transition: "all .5s",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                  borderRadius: "25px",
                                  border: "2px solid #cf9425",
                                },
                              }}
                              disableRipple
                            >
                              {locale === "ar" ? "اقراء المزيد" : "Read More"}
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Box className="flex flex-col gap-1 max-sm:text-center max-sm:items-center max-sm:gap-[.2rem]  max-sm:justify-between">
                          {column.links.map(
                            (
                              link: { label: string; href: string },
                              linkIndex: number
                            ) => (
                              <Typography
                                variant="body2"
                                key={linkIndex}
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": { textDecoration: "underline" },
                                  lineHeight: 2,
                                  px: "20px",
                                  fontSize: { xs: ".5rem", md: "1rem" },
                                }}
                              >
                                <Link href={`/${locale}${link.href}`}>{link.label}</Link>
                              </Typography>
                            )
                          )}
                          {index === 2 && (
                            <Typography
                            variant="body2"
                          
                            sx={{
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                              lineHeight: 2,
                              px: "20px",
                              fontSize: { xs: ".5rem", md: "1rem" },
                            }}
                          >
                            <Link href={`/${locale}/practice`}>{locale === "ar" ? "المزيد" : "Read More"}</Link>
                          </Typography>
                          )}
                        </Box>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Social media icons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "flex-start",
                  },
                  alignItems: "center",
                }}
              >
                {socialMedia.map((social, index) => (
                  <IconButton
                    key={index}
                    onClick={() => {
                      if (social.href) {
                        window.open(social.href, "_blank");
                      }
                    }}
                    aria-label={t(`social.${social.nameKey}`)}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      width: { xs: "35px", sm: "35px", md: "41px" },
                      height: { xs: "35px", sm: "35px", md: "41px" },
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
              <ContactStrip />
            </Box>

            {/* Divider & bottom bar */}
            <Divider
              sx={{
                bgcolor: "primary.main",
                width: "94%",
                mt: "48px",
                mb: "24px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "10px",
                justifyContent: { xs: "center", md: "space-between" },
                alignItems: { xs: "center", md: "center" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "center", sm: "center" },
                  gap: { xs: 1.5, sm: 0 },
                  width: { xs: "100%", md: "90%" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: {
                      xs: "center",
                      md: locale === "ar" ? "right" : "left",
                    },
                    fontSize: { xs: ".7rem", sm: "1rem" },
                  }}
                >
                  <EditableText
                    value={t("copyright", { year: new Date().getFullYear() })}
                    onSave={(val) => onSave("footer.copyright", val)}
                    isAdmin={isAdmin}
                  />
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      textAlign: {
                        xs: "center",
                        md: locale === "ar" ? "right" : "left",
                      },
                      fontSize: { xs: ".7rem", sm: "1rem" },
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    <Link href={"/" + locale + "/terms"}>
                      <EditableText
                        value={t("terms")}
                        onSave={(val) => onSave("footer.terms", val)}
                        isAdmin={isAdmin}
                      />
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      textAlign: {
                        xs: "center",
                        md: locale === "ar" ? "right" : "left",
                      },
                      fontSize: { xs: ".7rem", sm: "1rem" },
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    <Link href={"/" + locale + "/privacy"}>
                      <EditableText
                        value={t("privacy")}
                        onSave={(val) => onSave("footer.privacy", val)}
                        isAdmin={isAdmin}
                      />
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Footer;


const contactItems = [
  {
    icon: <Phone className="text-white w-4 h-4" />,
    label: '+971565955502',
    href: 'tel:+971565955502',
  },
  {
    icon: <Mail className="text-white w-4 h-4" />,
    label: 'info@jumaia-saleh.com',
    href: 'mailto:info@jumaia-saleh.com',
  },
];

function ContactStrip() {
  return (
    <div className="flex items-center gap-6 text-white max-sm:mx-auto">
      {contactItems.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          className="flex items-center gap-2 group max-sm:text-sm max-sm:gap-1 max-sm:flex-col "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="bg-[#ab994e] p-2 rounded-full flex items-center justify-center max-sm:text-sm">
            {item.icon}
          </div>
          <span className="group-hover:underline transition max-sm:hidden">{item.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
