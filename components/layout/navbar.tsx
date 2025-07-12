"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LegalServicesSection from "./LegalServicesSection";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { fetchDynamicPageType } from "@/sanity/lib/fetchDynamicPage";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const navItems = [
  { label: "home", hasDropdown: false, href: "/" },
  { label: "practice", hasDropdown: true, href: "/practice" },
  { label: "about", hasDropdown: false, href: "/about" },
  { label: "blog", hasDropdown: false, href: "/blog" },
  { label: "contact", hasDropdown: false, href: "/contact" },
];
const socialMedia = [
  { icon: <FacebookIcon sx={{width: "20px", height: "20px"}} color="primary" />, nameKey: "facebook", href: "https://www.facebook.com/profile.php?id=100063541461013" },
  { icon: <InstagramIcon sx={{width: "20px", height: "20px"}} color="primary" />, nameKey: "instagram", href: "https://www.instagram.com/jumaiasaleh/" },
  { icon: <TwitterIcon sx={{width: "20px", height: "20px"}} color="primary" />, nameKey: "twitter", href: "https://x.com/jumaiasaleh" },
  { icon: <LinkedInIcon sx={{width: "20px", height: "20px"}} color="primary" />, nameKey: "linkedin", href: "https://www.linkedin.com/company/jumaiasaleh/" },
];
const Navbar = ({ locale }: { locale: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [activeDropdown, setActiveDropdown] = useState("");
  let [services, setServices] = useState([]);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchDynamicPageType("real-estate").then((data) => {
      console.log(data);
      setServices(
        data.map((item: any) => ({
          label: item.title,
          labelEn: item.titleEn,
          href: `/${locale}/practice/${item.value}`,
        }))
      );
    });
  }, []);
  console.log(services);

  // إغلاق الـ dropdown عند النقر خارج العنصر
  useEffect(() => {
    // const handleMouseLeave = (event: MouseEvent) => {
    //   if (
    //     dropdownRef.current &&
    //     !dropdownRef.current.contains(event.target as Node)
    //   ) {
    //     // ابدأ المؤقت
    //     timeoutId = setTimeout(() => {
    //       setIsDropdownOpen(false);
    //     }, 3000); // 3 ثواني
    //   }
    // };

    const handleMouseEnter = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // document.addEventListener("mousemove", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      // clearTimeout(timeoutId);
      // document.removeEventListener("mousemove", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDropdownOpen]);

  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/en" || pathname === "/ar" || pathname === "/";

  const handleDropdownClick = (label: string) => {
    setIsDropdownOpen(true);
    setActiveDropdown((prev) => (prev === label ? "" : label));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  // Handle scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   <Box sx={{ width: 250 }} role="presentation">
  //     <Box className="flex items-center justify-end">
  //       <IconButton onClick={() => setIsMenuOpen(false)}>
  //         <CloseIcon />
  //       </IconButton>
  //     </Box>
  //     <List>
  //       {navItems.map((item, index) => (
  //         <ListItem key={index} disablePadding>
  //           <ListItemButton
  //             onClick={() => {
  //               router.push(`/${locale}${item.href}`);
  //               setIsMenuOpen(false);
  //             }}
  //           >
  //             <ListItemText primary={t(item.label)} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       <ListItem className="flex items-center gap-2" disablePadding>
  //         <ListItemButton
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: "10px",
  //             flexDirection: "row-reverse",
  //             justifyContent: "space-between",
  //           }}
  //           onClick={() => {
  //             router.push(
  //               `/${locale === "en" ? "ar" : "en"}${pathname.slice(3)}`,
  //               { scroll: false }
  //             );
  //             setIsMenuOpen(false);
  //           }}
  //         >
  //           <ListItemText primary={t("language")} />
  //           <ListItemIcon>
  //             <Box
  //               component="img"
  //               onClick={() => {
  //                 router.push(`/${locale === "ar" ? "ar" : "en"}`, {
  //                   scroll: false,
  //                 });
  //               }}
  //               // src={locale === "en" ? "/images/sa.svg" : "/images/sh.svg"}
  //               src={"/images/logo-ar-en.png"}
  //               alt={t("language")}
  //               sx={{ width: 20, height: 15, cursor: "pointer" }}
  //             />
  //           </ListItemIcon>
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //     <Divider />
  //     <List>
  //       <ListItem>
  //         <ListItemButton
  //           component={"a"}
  //           href={`https://wa.me/+00971565955502`}
  //           target="_blank"
  //         >
  //           <ListItemText primary={t("contact")} />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //   </Box>
  // );
  return (
    <Box sx={{ height: { xs: "60px", md: "70px" }, position: "relative" }}>
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.3 }}
            // style={{
            //   position: "sticky",
            //   top: 0,

            //   zIndex: 1000,
            //   width: "100%",
            //   background:
            //     isHome && !scrolled
            //       ? "transparent"
            //       : "linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)",
            //   transition: "background 0.3s ease-in-out",
            //   backdropFilter: isHome && !scrolled ? "blur(6px)" : "none",
            // }}
            style={{
            position: "fixed", 
            top: 0,
            zIndex: 1000,
            width: "100%",
            background:
              isHome && !scrolled
                ? "transparent"
                : "linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%)",
            transition: "background 0.3s ease-in-out",
            backdropFilter: isHome && !scrolled ? "blur(6px)" : "none",
          }}
          >
            <AppBar
              position={"static"}
              color="transparent"
              elevation={0}
              sx={{ zIndex: 1000, px: { xs: 0, md: 2 }, py: { xs: 0, md: 1 } }}
            >
              <Container maxWidth="xl" sx={{ zIndex: 1000 }} disableGutters>
                <Toolbar
                  sx={{ justifyContent: "space-between", width: "100%" }}
                >
                  <motion.img
                    // src={
                    //   locale === "en"
                    //     ? "/images/logo-en.svg"
                    //     : "/images/logo-ar.svg"
                    // }
                    onClick={() => {
                      router.push(`/${locale === "ar" ? "ar" : "en"}`, {
                        scroll: false,
                      });
                    }}
                    src={"/images/logo-ar-en.png"}
                    alt="Logo"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-[200px] md:w-[220px]  ${locale === "ar" ? "md:h-[60px] h-[50px] " : "md:h-[60px] h-[50px]"} object-cover`}
                    style={{
                      padding: "10px 0",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />

                  <Box className="flex items-center gap-6 justify-center">
                    <motion.div
                      className="hidden md:flex rtl:space-x-reverse items-center gap-6 justify-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              position: "absolute",
                              top: "120%",
                              left: 0,
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <LegalServicesSection ref={dropdownRef} setIsDropdownOpen={setIsDropdownOpen} setActiveDropdown={setActiveDropdown} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {navItems.map((item, index) => (
                        <Box
                          key={index}
                          onMouseOver={() =>
                            item.hasDropdown && handleDropdownClick(item.label)
                          }
                         
                          className="flex rtl:space-x-reverse items-center gap-2"
                          sx={{
                            color: "primary.main",
                            borderBottom:
                              `/${pathname.slice(4)}` === item.href ||
                              (pathname.slice(3).includes(item.href) &&
                                item.href !== "/")
                                ? "2px solid #cf9425"
                                : "none",
                            padding: "10px",
                            "&:hover": {
                              color: "secondary.main",
                              transition: "color 0.3s ease",
                              backgroundColor: "primary.main",
                              borderRadius: "10px",
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            onClick={() => {
                              router.push(`/${locale}${item.href}`);
                            }}
                            sx={{
                              color: "inherit",
                              cursor: "pointer",
                              fontFamily: "'Manrope-Medium', Helvetica",
                              fontSize: "1.25rem",
                              position: "relative",
                              fontWeight: 500,
                            }}
                          >
                            {t(item.label)}
                          </Typography>
                          {item.hasDropdown && (
                            <KeyboardArrowDownIcon
                              onClick={() => handleDropdownClick(item.label)}
                              className="animate-bounce"
                              sx={{
                                color: "inherit",
                                width: "30px",
                                cursor: "pointer",
                                height: "30px",
                                marginRight: "-1.11px",
                              }}
                            />
                          )}
                        </Box>
                      ))}

                      <Stack
                        direction="row"
                        spacing={0.875}
                        alignItems="center"
                        className="rtl:space-x-reverse cursor-pointer"
                        onClick={() => {
                          router.push(
                            `/${locale === "en" ? "ar" : "en"}${pathname.slice(
                              3
                            )}`,
                            { scroll: false }
                          );
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "primary.main",
                            fontFamily: "'Manrope-Medium', Helvetica",
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            direction: "rtl",
                          }}
                        >
                          {t("language")}
                        </Typography>
                        <Box
                          component="img"
                          src={
                            locale === "en"
                              ? "/images/sa.svg"
                              : "/images/sh.svg"
                          }
                          alt={t("language")}
                          sx={{ width: 20, height: 15 }}
                        />
                      </Stack>
                    </motion.div>

                    <Box
                      component="button"
                      onClick={() => {
                        window.open(`https://wa.me/+00971565955502`, "_blank");
                      }}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "10px",
                        px: 3,
                        py: 1.5,
                        display: { md: "flex", xs: "none" },
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "transparent",
                        color: "secondary.main",
                        fontFamily: "'Manrope-Bold', Helvetica",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        letterSpacing: "-0.40px",
                        transition: "color 0.4s ease",
                        zIndex: 1,

                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#cf9425",
                          transform: "scaleX(0)",
                          transformOrigin: "center",
                          transition: "transform 0.4s ease-in-out",
                          zIndex: 0,
                        },

                        "&:hover::before": {
                          transform: "scaleX(1)",
                        },

                        "&:hover": {
                          color: "#fff",
                        },

                        "& > *": {
                          position: "relative",
                          zIndex: 1,
                        },
                      }}
                    >
                      <Typography variant="button" sx={{ textWrap: "nowrap" }}>
                        {t("quote")}
                      </Typography>

                      {locale === "en" ? (
                        <ArrowForwardIcon
                          className="bounce-h"
                          sx={{
                            color: "secondary.main",
                            width: 24,
                            height: 24,
                          }}
                        />
                      ) : (
                        <ArrowBackIcon
                          className="bounce-h"
                          sx={{
                            color: "secondary.main",
                            width: 24,
                            height: 24,
                          }}
                        />
                      )}
                    </Box>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      className="flex md:hidden"
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                        className="cursor-pointer"
                      >
                        <IconButton
                          className="animate-pulse md:hidden"
                          onClick={() => setIsMenuOpen(true)}
                          sx={{
                            color: "secondary.main",
                            width: 24,
                            height: 24,
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                      </Stack>
                    </motion.div>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          sx={{
            background: "url('/images/Backdrop.svg') no-repeat center center",
            backgroundSize: "cover",
            "& .MuiDrawer-paper": {
              width: "75%",
              maxWidth: 320,
              maxHeight: "100vh",
              height: "100%",
              background: "linear-gradient(to left, #0c1c19 70%)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Box>
            {/* Header (Logo + Close Button) */}
            <IconButton onClick={() => setIsMenuOpen(false)}>
              <CloseIcon sx={{ color: "#cf9425" }} />
            </IconButton>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                component="img"
                src="/images/logo-ar-en.png"
                alt="logo"
                sx={{ height: 50, cursor: "pointer" }}
                onClick={() => {
                  router.push(`/${locale === "ar" ? "ar" : "en"}`, {
                    scroll: false,
                  });
                }}
              />
            </Box>

            {/* Navigation Items */}
            <Box mt={4}>
              {navItems.map((item, index) => (
                <Box key={index}>
                  {/* Main nav item */}
                  <Box
                    sx={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                      py: 1.5,
                      color: "white",
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      if (item.hasDropdown) {
                        handleDropdownClick(item.label);
                      } else {
                        router.push(`/${locale}${item.href}`);
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {t(item.label)}
                    {item.hasDropdown && (
                      <KeyboardArrowDownIcon
                        sx={{
                          color: "white",
                          transform:
                            activeDropdown === item.label
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    )}
                  </Box>

                  {/* Sub items for dropdown */}
                  {item.hasDropdown &&
                    activeDropdown === item.label &&
                    services.length > 0 && (
                      <Box sx={{ pl: 2, py: 1, backgroundColor: "#0c1c19" }}>
                        {services.map((service: any, i: number) => (
                          <Box
                            key={i}
                            onClick={() => {
                              router.push(service.href);
                              setIsMenuOpen(false);
                            }}
                            sx={{
                              py: 1,
                              color: "white",
                              fontSize: "0.95rem",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#cf9425",
                              },
                            }}
                          >
                            {locale === "ar" ? service.label : service.labelEn}
                          </Box>
                        ))}
                      </Box>
                    )}
                </Box>
              ))}

              {/* Language Selector */}
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                gap={1}
                onClick={() => {
                  router.push(
                    `/${locale === "en" ? "ar" : "en"}${pathname.slice(3)}`,
                    { scroll: false }
                  );
                  setIsMenuOpen(false);
                }}
                sx={{ cursor: "pointer", color: "white" }}
              >
                {locale === "en" ? "العربية" : "English"}
                <Box
                  component="img"
                  src={locale === "en" ? "/images/sa.svg" : "/images/sh.svg"}
                  alt="lang"
                  sx={{ width: 20, height: 15 }}
                />
              </Box>
            </Box>
          </Box>

          {/* Footer */}
          <Box mt={4} color="white">
            <Typography
              sx={{ color: "#cf9425", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Copyright 2022
            </Typography>
            <Typography variant="body2" mt={0.5} sx={{ fontSize: "0.8rem" }}>
              sybexdesigns@gmail.com. All Rights Reserved.
            </Typography>

            {/* Social Icons */}
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
                    // aria-label={t(`social.${social.nameKey}`)}
                    onClick={() => {
                      window.open(social.href, "_blank");
                    }}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      width: { xs: "30px", sm: "30px", md: "35px" },
                      height: { xs: "30px", sm: "30px", md: "35px" },
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>

            {/* Links */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              fontSize="0.75rem"
            >
              <Typography sx={{ cursor: "pointer", fontSize: "0.75rem" }} onClick={() => {
                router.push(`/${locale}/terms`);
              }}>
                Terms & Conditions
              </Typography>
              <Typography sx={{ cursor: "pointer", fontSize: "0.75rem" }} onClick={() => {
                router.push(`/${locale}/privacy`);
              }}>
                Privacy Policy
              </Typography>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;
