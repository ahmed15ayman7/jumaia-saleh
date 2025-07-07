"use client";

import { updateMessage } from "@/lib/updateMessage";
import { Box, Typography } from "@mui/material";
import { toast } from "sonner";
import EditableText from "../EditableText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeadSectionsProps {
  title: string;
  description: string;
  locale: string;
  keyTitle: string;
  keyDescription: string;
  isAdmin: boolean;
  isbg: boolean;
}

const HeadSections = ({
  title,
  description,
  locale,
  keyTitle,
  keyDescription,
  isAdmin,
  isbg,
}: HeadSectionsProps) => {
  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <Box ref={ref}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 6,
        }}
      >
        <motion.div
          key={isInView ? "title-visible" : "title-hidden"}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              color: isbg ? "primary.main" : "primary.dark",
              fontFamily: "'Manrope-Bold', Helvetica",
              fontWeight: 700,
              fontSize: {xs: "32px",md: "64px"},
              mb: 2,
            }}
          >
            <EditableText
              value={title}
              onSave={(value: string) => {
                onSave(keyTitle, value);
              }}
              isAdmin={isAdmin}
              className="text-2xl md:text-5xl font-bold mb-4"
            />
          </Typography>
        </motion.div>

        <motion.div
          key={isInView ? "desc-visible" : "desc-hidden"}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: "667px",
              color: "primary.dark",
              fontFamily: "'Manrope-Regular', Helvetica",
              letterSpacing: "-0.32px",
            }}
          >
            <EditableText
              value={description}
              onSave={(value: string) => {
                onSave(keyDescription, value);
              }}
              isAdmin={isAdmin}
              className="text-sm md:text-[1rem] font-light mb-4"
            />
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeadSections;
