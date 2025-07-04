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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LegalServicesSection from "./LegalServicesSection";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  { label: "home", hasDropdown: false, href: "/" },
  { label: "about", hasDropdown: false, href: "/about" },
  { label: "practice", hasDropdown: true, href: "/practice" },
  { label: "blog", hasDropdown: false, href: "/blog" },
];

const Navbar = ({ locale }: { locale: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();

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
              router.push(item.href);
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
              src={locale === "en" ? "/images/sa.svg" : "/images/sh.svg"}
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
          <ListItemButton>
            <ListItemText primary={t("contact")} />
            
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box sx={{ height: "100px", position: "relative" }}>
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%", top: 0 }}
          >
            <AppBar
              position="static"
              color="transparent"
              elevation={0}
              sx={{ zIndex: 1000 }}
            >
              <Container maxWidth="xl" sx={{ zIndex: 1000 }} disableGutters>
                <Toolbar
                  sx={{ justifyContent: "space-between", width: "100%" }}
                >
                  <motion.img
                    src={
                      locale === "en"
                        ? "/images/logo-en.svg"
                        : "/images/logo-ar.svg"
                    }
                    alt="Logo"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-[120px] md:w-[200px] h-[60px] md:h-[90px] object-contain"
                    style={{
                      padding: "10px",
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
                            <LegalServicesSection />
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
                              router.push(item.href);
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
                          router.push("/contact");
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
                          {t("contact")}
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
                    "& .MuiDrawer-paper": {
                      width: "50%",
                      height: "100%",
                    },
                  }}
                >
                  {DrawerList}
                </Drawer>
              )}
    </Box>
  );
};

export default Navbar;
