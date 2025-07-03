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
  const phoneNumbers = [
    { id: 1, number: "+97122558866", top: "5vh" },
    { id: 2, number: "+97122558866", top: "13vh" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const testimonials = [
    {
      id: 1,
      description: t("description_1"),
      name: t("name_1"),
      role: t("role_1"),
    },
    {
      id: 2,
      description: t("description_2"),
      name: t("name_2"),
      role: t("role_2"),
    },
    {
      id: 3,
      description: t("description_3"),
      name: t("name_3"),
      role: t("role_3"),
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
        height: "80vh",
        position: "relative",
        bgcolor: "#f9f7f5",
        padding: "2vh 5vw",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Stack
          direction="column"
          spacing={2.25}
          sx={{ position: "absolute", top: "5vh", left: "1vw", width: "4vw" }}
        >
          <Button sx={{ width: 40, height: 40 }}>
            <Image
              src="/images/whatsapp.svg"
              alt="whatsapp"
              width={40}
              height={40}
            />
          </Button>
          <Button sx={{ width: 40, height: 40 }}>
            <Image src="/images/call.svg" alt="call" width={40} height={40} />
          </Button>
        </Stack>

        {phoneNumbers.map((item) => (
          <Paper
            key={item.id}
            sx={{
              position: "absolute",
              left: "6vw",
              top: item.top,
              width: "10vw",
              height: "5vh",
              bgcolor: "rgba(0, 0, 0, 0.15)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Manrope-Regular, Helvetica",
                color: "white",
                fontSize: "1.2vw",
              }}
            >
              {item.number}
            </Typography>
          </Paper>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, x: 50 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "55vh",
            left: "7vw",
            width: "15vw",
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
              fontSize: "1.3vw",
            }}
          >
            {t("button")}
          </Typography>
        </Button>

        <Typography
          sx={{
            position: "absolute",
            top: "25vh",
            left: "7vw",
            fontFamily: "Manrope-Regular, Helvetica",
            color: "#cf9425",
            fontSize: "1vw",
            letterSpacing: "1px",
          }}
        >
          <EditableText
            value={t("tag")}
            onSave={(val) => onSave("testimonials.tag", val)}
            isAdmin={isAdmin}
          />
        </Typography>

        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            width: "40vw",
            top: "28vh",
            left: "7vw",
            fontFamily: "Manrope-Bold, Helvetica",
            color: "#0c1c19",
            fontSize: "3vw",
          }}
        >
          <EditableText
            value={t("title")}
            onSave={(val) => onSave("testimonials.title", val)}
            isAdmin={isAdmin}
          />
        </Typography>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: locale === "ar" ? 100 : -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          exit={isInView ? { x: locale === "ar" ? -100 : 100, opacity: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            top: "28vh",
            left: "50vw",
            width: "40vw",
            height: "40vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2vw",
              flexGrow: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <EditableText
              value={testimonials[currentIndex].description}
              onSave={(val) =>
                onSave(`testimonials.${currentIndex}.description`, val)
              }
              isAdmin={isAdmin}
            />
          </Typography>

          <Typography
            sx={{
              mt: "2vh",
              fontFamily: "Manrope-Bold, Helvetica",
              color: "#cf9425",
              fontSize: "1vw",
            }}
          >
            <EditableText
              value={testimonials[currentIndex].name}
              onSave={(val) => onSave(`testimonials.${currentIndex}.name`, val)}
              isAdmin={isAdmin}
            />
          </Typography>

          <Typography sx={{ mt: "1vh", fontSize: "1vw" }}>
            <EditableText
              value={testimonials[currentIndex].role}
              onSave={(val) => onSave(`testimonials.${currentIndex}.role`, val)}
              isAdmin={isAdmin}
            />
          </Typography>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ position: "absolute", top: "68vh", left: "65vw" }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: index === currentIndex ? "#cf9425" : "#d9d9d9",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Stack>
      </motion.div>
    </Box>
  );
};

export default TestimonialSection;
