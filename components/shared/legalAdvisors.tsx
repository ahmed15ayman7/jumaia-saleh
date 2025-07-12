"use client";

import WhatsApp from "@mui/icons-material/WhatsApp";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const contactInfo = [
  {
    icon: "/images/call.svg",
    backgroundColor: "#9876ff",
    type: "call",
    phoneKey: "phoneNumber",
  },
  {
    icon: "whatsapp",
    backgroundColor: "green",
    type: "whatsapp",
    phoneKey: "phoneNumber",
  },
];

export default function LegalConsultation({ 
  locale, 
  isAdmin,
  sanityData = null 
}: { 
  locale: string; 
  isAdmin: boolean;
  sanityData?: any;
}) {
  const t = useTranslations("legalAdvisors");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Use Sanity data if available, otherwise use translation
  const headerGet = sanityData?.header?.get || t("header.get");
  const headerAdvisors = sanityData?.header?.advisors || t("header.advisors");
  const headerDescription = sanityData?.header?.description || t("header.description");
  const phoneNumber = sanityData?.contact?.phoneNumber || t("contact.phoneNumber");
  const dividerText = sanityData?.divider || t("divider");
  const sendUsSend = sanityData?.sendUs?.header?.send || t("sendUs.header.send");
  const sendUsUs = sanityData?.sendUs?.header?.us || t("sendUs.header.us");
  const sendUsInquiry = sanityData?.sendUs?.header?.inquiry || t("sendUs.header.inquiry");
  const sendUsDescription = sanityData?.sendUs?.description || t("sendUs.description");
  const ctaText = sanityData?.cta || t("cta");

  // onSave function
  const onSave = (key: string, value: string) => {
    const toastId = toast.loading(locale === "ar" ? "جاري التحديث..." : "Updating...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() =>
        toast.success(locale === "ar" ? "تم التحديث بنجاح" : "Updated successfully", {
          id: toastId,
        })
      )
      .catch(() =>
        toast.error(locale === "ar" ? "فشل التحديث" : "Update failed", {
          id: toastId,
        })
      );
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100vw",
        minHeight: {xs: "70vh", sm: "80vh", md: "100vh"},
        overflow: "hidden",
        bgcolor: "#0c1c19",
        position: "relative",
        px: 0,
        py: { xs: "5vw", sm: "4vw" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",backgroundImage: "url('/images/pattern.svg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0}} >
      <Box style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ width: "100%" }}
      >
        {/* Top Heading */}
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{
            width: "100%",
            maxWidth: "100vw",
            mt: { xs: "2vh", sm: "5vh" },
            mb: { xs: "4vh", sm: "6vh" },
          }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontFamily: "'Manrope-Bold', Helvetica",
              fontSize: { xs: "7vw", sm: "4vw", md: "3vw" },
              fontWeight: "bold",
              wordBreak: "break-word",
            }}
          >
            <Box component="span" sx={{ color: "white" }}>
              <EditableText
                value={headerGet}
                onSave={(val) => onSave("legalAdvisors.header.get", val)}
                isAdmin={isAdmin}
              />
            </Box>
            <Box component="span" sx={{ color: "#cf9425" }}>
              {" "}
              <EditableText
                value={headerAdvisors}
                onSave={(val) => onSave("legalAdvisors.header.advisors", val)}
                isAdmin={isAdmin}
              />
            </Box>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontFamily: "'Manrope-Regular', Helvetica",
              color: "white",
              fontSize: { xs: "3vw", sm: "2vw", md: "1.2vw" },
              wordBreak: "break-word",
            }}
          >
            <EditableText
              value={headerDescription}
              onSave={(val) => onSave("legalAdvisors.header.description", val)}
              isAdmin={isAdmin}
            />
          </Typography>
        </Stack>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          <Box

            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 4, md: 5 },
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "94vw", sm: "65vw", md: "46vw" },
              mx: "auto",
              mb: { xs: "4vh", md: "6vh" },
            }}
          >
            {contactInfo.map((contact, index) => (
              <Paper
                key={index}
                elevation={0}
                onClick={() => {
                  contact.type === "whatsapp" ? window.open(`https://wa.me/${phoneNumber}`, "_blank") : window.open(`tel:${phoneNumber}`, "_blank");
                }}
                sx={{
                  cursor: "pointer",
                  minWidth: { xs: "85vw", sm: "31vw", md: "20vw" },
                  maxWidth: "320px",
                  width: "100%",
                  height: { xs: "13vw", sm: "12vw", md: "88px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2vw",
                  padding: { xs: "2vw 3vw", sm: "15px 25px", md: "15px 30px" },
                  borderRadius: "2vw",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                }}
              >
                {contact.type === "whatsapp" ? (
                  <Box
                    sx={{
                      width: { xs: "8vw", sm: "40px" },
                      height: { xs: "8vw", sm: "40px" },
                      backgroundColor: "green",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image src="/images/whatsapp.svg" alt="whatsapp" width={40} height={40} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: { xs: "8vw", sm: "40px" },
                      height: { xs: "8vw", sm: "40px" },
                      backgroundColor: contact.backgroundColor,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image src={contact.icon} alt="icon" width={40} height={40} />
                  </Box>
                )}
                <Typography
                  sx={{
                    fontFamily: "'Manrope-Regular', Helvetica",
                    color: "white",
                    fontSize: { xs: ".9rem", sm: ".9rem", md: "1rem" },
                    wordBreak: "break-all",
                  }}
                >
                  <EditableText
                    value={phoneNumber}
                    onSave={(val) => onSave(`legalAdvisors.contact.${contact.phoneKey}`, val)}
                    isAdmin={isAdmin}
                  />
                </Typography>
              </Paper>
            ))}
          </Box>
        </motion.div>

        {/* Divider with "OR" text */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "90vw", sm: "60vw", md: "400px" },
            mx: "auto",
            my: { xs: "2vh", md: "3vh" },
          }}
        >
          <Divider
            sx={{
              flexGrow: 1,
              borderColor: "primary.main",
              borderBottomWidth: "2px",
            }}
          />
          <Box
            sx={{
              mx: { xs: 1, sm: 2 },
              backgroundColor: "#0c1c19",
              borderRadius: "100vw",
              px: { xs: 2, sm: 2 },
              py: { xs: 0.2, sm: 0.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: { xs: "30px", sm: "40px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Manrope-Regular', Helvetica",
                color: "white",
                fontSize: { xs: "2.7vw", sm: "12px" },
              }}
            >
              <EditableText
                value={dividerText}
                onSave={(val) => onSave("legalAdvisors.divider", val)}
                isAdmin={isAdmin}
              />
            </Typography>
          </Box>
          <Divider
            sx={{
              flexGrow: 1,
              borderColor: "primary.main",
              borderBottomWidth: "2px",
            }}
          />
        </Stack>

        {/* Bottom Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.7 }}
        >
          <Stack
            spacing={2}
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: "740px",
              px: { xs: 0.5, md: 0 },
              mx: "auto",
              my: { xs: "3vh", md: "4vh" },
            }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontFamily: "'Manrope-Bold', Helvetica",
                fontSize: { xs: "7vw", sm: "4vw", md: "3vw" },
                fontWeight: "bold",
                wordBreak: "break-word",
              }}
            >
              <Box component="span" sx={{ color: "white" }}>
                <EditableText
                  value={sendUsSend}
                  onSave={(val) => onSave("legalAdvisors.sendUs.header.send", val)}
                  isAdmin={isAdmin}
                />
              </Box>
              <Box component="span" sx={{ color: "#cf9425" }}>
                {" "}
                <EditableText
                  value={sendUsUs}
                  onSave={(val) => onSave("legalAdvisors.sendUs.header.us", val)}
                  isAdmin={isAdmin}
                />
              </Box>
              <Box component="span" sx={{ color: "white" }}>
                <EditableText
                  value={sendUsInquiry}
                  onSave={(val) => onSave("legalAdvisors.sendUs.header.inquiry", val)}
                  isAdmin={isAdmin}
                />
              </Box>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                fontFamily: "'Manrope-Regular', Helvetica",
                color: "white",
                fontSize: { xs: "3vw", sm: "2vw", md: "1.2vw" },
                wordBreak: "break-word",
                mt: { xs: 1, md: 1.5 },
              }}
            >
              <EditableText
                value={sendUsDescription}
                onSave={(val) => onSave("legalAdvisors.sendUs.description", val)}
                isAdmin={isAdmin}
              />
            </Typography>
          </Stack>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.27, duration: 0.7 }}
        >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: { xs: 2, sm: 3 } }}>
            <Button
              variant="contained"
              component={Link}
              href={`/${locale}/contact`}
              sx={{
                width: { xs: "70vw", sm: "45vw", md: "320px" },
                height: { xs: "11vw", sm: "88px" },
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: { xs: "2vw", sm: "8px" },
                fontFamily: "'Manrope-SemiBold', Helvetica",
                fontWeight: 600,
                fontSize: { xs: "4.5vw", sm: "2vw", md: "24px" },
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                },
                boxShadow: "0px 4px 20px 0px #cf942511",
              }}
            >
              {ctaText}
            </Button>
          </Box>
        </motion.div>
      </motion.div>
      </Box>
    </Box>
    </Box>
  );
}