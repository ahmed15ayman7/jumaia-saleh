"use client";

import GroupIcon from "@mui/icons-material/Group";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import EditableText from "../EditableText";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import Image from "next/image";

const TestimonialSection = ({
  locale,
  isAdmin,
}: {
  locale: string;
  isAdmin: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const testimonials = [
    {
      id: 1,
      description: t("description_0"),
      name: t("name_0"),
      role: t("role_0"),
    },
    {
      id: 2,
      description: t("description_1"),
      name: t("name_1"),
      role: t("role_1"),
    },
    {
      id: 3,
      description: t("description_2"),
      name: t("name_2"),
      role: t("role_2"),
    },
  ];

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: { xs: "70vh", sm: "70vh", md: "70vh" },
        position: "relative",
        bgcolor: "#f9f7f5",
        padding: { xs: "2vh 1vw", sm: "2vh 1vw", md: "10vh 5vw" },
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        justifyContent: { xs: "center", sm: "center", md: "center" },
        alignItems: { xs: "center", sm: "center", md: "center" },
        textAlign: {
          xs: "center",
          sm: "center",
          md: locale === "ar" ? "right" : "left",
        },
        gap: { xs: "3rem", sm: "3rem", md: "4rem" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, x: 50 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col justify-start max-md:items-center gap-[.5rem] max-sm:text-center max-sm:items-center max-sm:gap-[.2rem]"
      >
        <Typography
          style={{
            color: "primary.main",
          }}
          sx={{
            fontFamily: "Manrope-Regular, Helvetica",
            fontSize: { xs: ".7rem", sm: ".7rem", md: ".8rem" },
            letterSpacing: "1px",
            color: "primary.main",
          }}
        >{t("tag")}</Typography>

        <Typography
          variant="h1"
          sx={{
            width: { xs: "100%", sm: "100%", md: "40vw" },
            fontFamily: "Manrope-Bold, Helvetica",
            color: "#0c1c19",
            mb: { xs: ".7rem", sm: ".8rem", md: "1rem" },
            fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          <EditableText
            value={t("title")}
            onSave={(val) => onSave("testimonials.title", val)}
            isAdmin={isAdmin}
          />
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: { xs: "30vw", sm: "30vw", md: "15vw" },
            borderRadius: "100px",
            py: 1.5,
            bgcolor: "#cf9425",
            "&:hover": {
              bgcolor: "#b88320",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Manrope-Regular, Helvetica",
              color: "white",
              fontSize: { xs: ".8rem", sm: ".8rem", md: "1.3rem" },
            }}
          >
            {t("button")}
          </Typography>
        </Button>
      </motion.div>

      <AnimatePresence mode="wait">
        <Box className="flex flex-col gap-10 max-sm:text-center justify-between h-[80%] max-sm:h-[40%] max-sm:items-center max-sm:gap-4">
          <motion.div
            key={currentIndex}
            initial={{ x: locale === "ar" ? 100 : -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            exit={
              isInView ? { x: locale === "ar" ? -100 : 100, opacity: 0 } : {}
            }
            transition={{ duration: 0.5 }}
            className="w-full gap-5 max-sm:items-center items-start justify-between max-sm:justify-start mt-10 max-sm:mt-0"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" },
                flexGrow: { xs: 0, sm: 0, md: 1 },
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <EditableText
                value={testimonials[currentIndex].description}
                onSave={(val) =>
                  onSave(`testimonials.description_${currentIndex}`, val)
                }
                isAdmin={isAdmin}
              />
            </Typography>
            <Box className="flex flex-col gap-1 max-sm:items-center max-sm:text-center  ">
              <Typography
                sx={{
                  fontFamily: "Manrope-Bold, Helvetica",
                  color: "#cf9425",
                  fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" },
                }}
              >
                <EditableText
                  value={testimonials[currentIndex].name}
                  onSave={(val) =>
                    onSave(`testimonials.name_${currentIndex}`, val)
                  }
                  isAdmin={isAdmin}
                />
              </Typography>
              <Typography
                sx={{ fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" } }}
              >
                <EditableText
                  value={testimonials[currentIndex].role}
                  onSave={(val) =>
                    onSave(`testimonials.role_${currentIndex}`, val)
                  }
                  isAdmin={isAdmin}
                />
              </Typography>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? "bg-[#cf9425] animate-scale" : "bg-[#d9d9d9]"}`}
                  sx={{
                    width: "10px",
                    height: "10px",
                    animationDuration: index === currentIndex ? "0.3s" : "none",
                    bgcolor: index === currentIndex ? "#cf9425" : "#d9d9d9",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </Box>
          </motion.div>
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default TestimonialSection;
