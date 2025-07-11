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

const navItems = [
  { label: "home", hasDropdown: false, href: "/" },
  { label: "practice", hasDropdown: true, href: "/practice" },
  { label: "about", hasDropdown: false, href: "/about" },
  { label: "blog", hasDropdown: false, href: "/blog" },
  { label: "contact", hasDropdown: false, href: "/contact" },
];

const Navbar = ({ locale }: { locale: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // إغلاق الـ dropdown عند النقر خارج العنصر
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
  
    document.addEventListener("mouseleave", handleClickOutside);
    return () => {
      document.removeEventListener("mouseleave", handleClickOutside);
    };
  }, [isDropdownOpen]);
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/en" || pathname === "/ar" || pathname === "/";

  const handleDropdownClick = (label: string) => {
    setIsDropdownOpen((prev) => !prev);
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
  
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Box className="flex items-center justify-end">
        <IconButton onClick={() => setIsMenuOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => {
              router.push(`/${locale}${item.href}`);
              setIsMenuOpen(false);
            }}>
              <ListItemText primary={t(item.label)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem className="flex items-center gap-2" disablePadding>
          <ListItemButton sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}  onClick={() => {
            router.push(
              `/${locale === "en" ? "ar" : "en"}${pathname.slice(3)}`,
              { scroll: false }
            );
            setIsMenuOpen(false);
          }}>
            <ListItemText primary={t("language")} />
            <ListItemIcon>

            <Box
              component="img"
              // src={locale === "en" ? "/images/sa.svg" : "/images/sh.svg"}
              src={"/images/logo-ar-en.png"}
              alt={t("language")}
              sx={{ width: 20, height: 15 }}
              />
              </ListItemIcon>
              </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={"a"} href={`https://wa.me/966555555555`} target="_blank">
            <ListItemText primary={t("contact")} />
            
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box sx={{ height: {xs: "70px",md: "100px"}, position: "relative" }}>
      <AnimatePresence>
        {showNavbar && (
          <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            background: isHome && !scrolled
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
              sx={{ zIndex: 1000,px: {xs: 0,md: 2} }}
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
                    src={"/images/logo-ar-en.png"}
                    alt="Logo"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-[200px] md:w-[220px]  ${locale === "ar" ? "md:h-[60px] h-[50px] " : "md:h-[60px] h-[50px]"} object-cover`}
                    style={{
                      padding: "10px 0",
                      objectFit: "cover",
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
                              top: "100%",
                              left: 0,
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <LegalServicesSection ref={dropdownRef} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {navItems.map((item, index) => (
                        <Box
                          key={index}
                          // onMouseOver={() =>
                          //   item.hasDropdown && handleDropdownClick(item.label)
                          // }
                          className="flex rtl:space-x-reverse items-center gap-2"
                          sx={{
                            color: "primary.main",
                            borderBottom: `/${pathname.slice(4)}` === item.href || (pathname.slice(3).includes(item.href) && item.href !== "/") ? "2px solid #cf9425" : "none",
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

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      className="hidden md:flex"
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          width: 132,
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                        className="cursor-pointer"
                        onClick={() => {
                          window.open(`https://wa.me/966555555555`, "_blank");
                        }}
                      >
                        <Typography
                          variant="button"
                          sx={{
                            color: "secondary.main",
                            textWrap: "nowrap",
                            fontFamily: "'Manrope-Bold', Helvetica",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            letterSpacing: "-0.40px",
                          }}
                        >
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
                      </Stack>
                    </motion.div>
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
                  background:"url('/images/Backdrop.svg') no-repeat center center",
                  backgroundSize: 'cover',
                  '& .MuiDrawer-paper': {
                    width: '75%',
                    maxWidth: 320,
                    maxHeight: '91vh',
                    height: '100%',
                    background: 'linear-gradient(to left, #0c1c19 70%)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  },
                }}
              >
                <Box>
                  {/* Header (Logo + Close Button) */}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box
                      component="img"
                      src="/images/logo-ar.svg"
                      alt="logo"
                      sx={{ height: 50 }}
                    />
                    <IconButton onClick={() => setIsMenuOpen(false)}>
                      <CloseIcon sx={{ color: '#cf9425' }} />
                    </IconButton>
                  </Box>
              
                  {/* Navigation Items */}
                  <Box mt={4}>
                    {navItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                          py: 1.5,
                          color: 'white',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          router.push(`/${locale}${item.href}`);
                          setIsMenuOpen(false);
                        }}
                      >
                        {t(item.label)}
                        {item.hasDropdown && <KeyboardArrowDownIcon sx={{ color: 'white' }} />}
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
                      sx={{ cursor: 'pointer', color: 'white' }}
                    >
                      {locale === 'en' ? 'العربية' : 'English'}
                      <Box
                        component="img"
                        src={locale === 'en' ? '/images/sa.svg' : '/images/sh.svg'}
                        alt="lang"
                        sx={{ width: 20, height: 15 }}
                      />
                    </Box>
                  </Box>
                </Box>
              
                {/* Footer */}
                <Box mt={4} color="white">
                  <Typography sx={{ color: '#cf9425', fontWeight: 600, fontSize: '0.9rem' }}>
                    Copyright 2022
                  </Typography>
                  <Typography variant="body2" mt={0.5} sx={{ fontSize: '0.8rem' }}>
                    sybexdesigns@gmail.com. All Rights Reserved.
                  </Typography>
              
                  {/* Social Icons */}
                  <Box mt={2} display="flex" gap={1}>
                    {[1, 2, 3, 4].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: 'white',
                        }}
                      />
                    ))}
                  </Box>
              
                  {/* Links */}
                  <Box mt={2} display="flex" justifyContent="space-between" fontSize="0.75rem">
                    <Typography sx={{ cursor: 'pointer',fontSize:"0.75rem" }}>Terms & Conditions</Typography>
                    <Typography sx={{ cursor: 'pointer',fontSize:"0.75rem" }}>Privacy Policy</Typography>
                  </Box>
                </Box>
              </Drawer>              
              )}
    </Box>
  );
};

export default Navbar;
