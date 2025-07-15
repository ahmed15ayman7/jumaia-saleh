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
import { sendMail } from "@/lib/email";
import { compileWelcomeTemplate } from "@/lib/handeler";

export default function Subscribe({ locale, isAdmin }: { locale: string; isAdmin: boolean }) {
  const t = useTranslations("subscribe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [email, setEmail] = useState("");


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

  const handleSubscribe = async () => {
    if (!email) {
      toast.error(locale === "ar" ? "يجب أن يكون لديك عنوان بريد إلكتروني" : "You must have an email address");
      return;
    }
    await sendMail({
      to: email,
      name: email,
      subject: "Jumaia Saleh",
      body: compileWelcomeTemplate(email, "https://jumaia-saleh.com/"),
    });
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: {xs:"40vh",md:"70vh"},
        p: 0,
        m: 0,
        bgcolor: "#fff",
        position: {xs:"static",md:"relative"},
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
        className="flex flex-col items-center max-sm:items-start justify-center w-full z-50 max-w-full"
      >
        <Box
          
          sx={{
            width: "100%",
            maxWidth: {xs:"90vw",md:"1050px"},
            display: "flex",
            flexDirection: "column",
            alignItems: {xs:"flex-start",md:"center"},
            justifyContent: "center",
            gap: { xs: 2, md: "1rem" },
            px: { xs: 2, md: 0 },
            py: { xs: "2vh", md: "14vh" },
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",width: "100%", gap: { xs: 2, md: "1rem" }}}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <MailOutlineIcon sx={{ color: "#cf9425", fontSize: { xs: "7vw", md: "45px" }, mr: 1 }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.1rem", sm: "2.5rem", md: "3rem", lg: "3rem" },
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
              fontSize: { xs: ".7rem", sm: ".8rem", md: "1rem" },
              maxWidth: {xs:"90vw",md:"850px"},
              textAlign: "center",
              mb: { xs: 2, sm: "1rem" },
            }}
          >
            <EditableText
              value={t("description")}
              onSave={val => onSave("subscribe.description", val)}
              isAdmin={isAdmin}
            />
          </Typography>
          </Box>
          {/* Subscription input + Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: { xs: 4, md: 6 },
              width: { xs: "94vw", sm: "75vw", md: "680px" },
              gap: { xs: 2, sm: 2 },
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
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1rem" },
                fontFamily: "'Manrope-Regular', Helvetica",
                borderRadius: "35px",
                minWidth: { xs: "50vw", sm: "320px" },
                maxWidth: { md: "400px" },
                mb: { xs: 0, sm: 0 },
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              inputProps={{ style: { color: "#222", textAlign: "start" } }}
              // disabled
            />
            <Button
              variant="contained"
              onClick={() => handleSubscribe()}
              sx={{
                px: { xs: locale === "ar" ? 3 : 2, sm: 6 },
                py: { xs: 2, sm: 4 },
                height: { xs: "70px", sm: "48px" },
                bgcolor: "primary.main",
                color: "white",
                fontFamily: "'Manrope-SemiBold', Helvetica",
                borderRadius: "35px",
                fontWeight: 600,
                fontSize: { xs:locale === "ar" ? "1rem" : ".8rem", sm: "1.2rem", md: "18px" },
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
        </Box>
      </motion.div>
    </Box>
  );
}