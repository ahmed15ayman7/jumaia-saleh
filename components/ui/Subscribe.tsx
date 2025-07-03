"use client";

import { Box, Button, Stack, Typography, InputBase } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function NewsletterSection({ locale, isAdmin }: { locale: string; isAdmin: boolean }) {
  const t = useTranslations("subscribe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Fake input value
  const [name, setName] = useState("");

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
      ref={ref}
      sx={{
        width: "100%",
        minHeight: "70vh",
        p: 0,
        m: 0,
        bgcolor: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Absolute image - do NOT wrap in the animated div */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "190px",
          height: "50vh",
          zIndex: 1,
          pointerEvents: "none",
          transform: "rotateY(180deg)",
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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Stack
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          sx={{
            width: "100%",
            maxWidth: "1050px",
            px: { xs: 2, md: 0 },
            py: { xs: "10vh", md: "14vh" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <MailOutlineIcon sx={{ color: "#cf9425", fontSize: { xs: "7vw", md: "45px" }, mr: 1 }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "6vw", sm: "3vw", md: "2.7vw", lg: "2vw" },
                fontWeight: 700,
                color: "#16211b",
                fontFamily: "'Manrope-Bold', Helvetica",
              }}
              align="center"
            >
              <EditableText
                value={t("title")}
                onSave={val => onSave("subscribe.title", val)}
                isAdmin={isAdmin}
              />
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#202b21",
              fontFamily: "'Manrope-Regular', Helvetica",
              fontSize: { xs: "3.2vw", sm: "2vw", md: "1.15vw" },
              maxWidth: "850px",
              textAlign: "center",
            }}
          >
            <EditableText
              value={t("description")}
              onSave={val => onSave("subscribe.description", val)}
              isAdmin={isAdmin}
            />
          </Typography>

          {/* Subscription input + Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              mt: { xs: 4, md: 6 },
              width: { xs: "94vw", sm: "75vw", md: "680px" },
              gap: { xs: 2, sm: 3 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputBase
              placeholder={t("input")}
              sx={{
                flex: 1,
                bgcolor: "#fff",
                border: "1.6px solid #29463e",
                px: 3,
                py: 2,
                fontSize: { xs: "3.8vw", sm: "1.2vw", md: "1vw" },
                fontFamily: "'Manrope-Regular', Helvetica",
                borderRadius: "10px",
                minWidth: { xs: "70vw", sm: "320px" },
                maxWidth: { md: "400px" },
                mb: { xs: 2, sm: 0 },
              }}
              value={name}
              onChange={e => setName(e.target.value)}
              inputProps={{ style: { color: "#222", textAlign: "start" } }}
              // disabled
            />
            <Button
              variant="contained"
              sx={{
                px: { xs: 5, sm: 6 },
                height: { xs: "11vw", sm: "48px" },
                bgcolor: "primary.main",
                color: "white",
                fontFamily: "'Manrope-SemiBold', Helvetica",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: { xs: "3.6vw", sm: "1.25vw", md: "18px" },
                letterSpacing: "0.01em",
                textTransform: "none",
                "&:hover": { bgcolor: "primary.dark", color: "white" },
                boxShadow: "0px 4px 20px 0px #cf942511",
                whiteSpace: "nowrap",
              }}
              disableElevation
              // disabled // للعرض فقط - احذف هذه لو أردت التشغيل
            >{t("cta")}
            
            </Button>
          </Box>
        </Stack>
      </motion.div>
    </Box>
  );
}