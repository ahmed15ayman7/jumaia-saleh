"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";

let ellipse5 = "/images/ellipse-5.png";
let ellipse6 = "/images/ellipse-6.png";
let ellipse7 = "/images/ellipse-7.png";
let group = "/images/group.png";

const lawyerData = [
  {
    id: 1,
    image: ellipse5,
    nameKey: "lawyer1.name",
    titleKey: "lawyer1.title",
  },
  {
    id: 2,
    image: ellipse7,
    nameKey: "lawyer2.name",
    titleKey: "lawyer2.title",
  },
  {
    id: 3,
    image: ellipse6,
    nameKey: "lawyer3.name",
    titleKey: "lawyer3.title",
  },
];

const OurLawyers = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const t = useTranslations("ourLawyers");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  return (
    <Box ref={ref} className="flex flex-col items-center gap-10 py-10">
      <Box className="flex flex-col w-full max-w-[90vw] items-center gap-20">
        <Stack spacing={3} className="w-full max-w-[60vw] items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h1" color="primary.dark" textAlign="center">
              <EditableText
                value={t("title")}
                onSave={(val) => onSave("ourLawyers.title", val)}
                isAdmin={isAdmin}
              />
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Typography variant="body1" color="primary.dark" textAlign="center">
              <EditableText
                value={t("description")}
                onSave={(val) => onSave("ourLawyers.description", val)}
                isAdmin={isAdmin}
              />
            </Typography>
          </motion.div>
        </Stack>

        <Grid container justifyContent="center" spacing={4}>
          {lawyerData.map((lawyer, index) => (
            <Grid key={lawyer.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              >
                <Stack spacing={3} alignItems="center" className="w-[40vw] max-w-[330px]">
                  <Box
                    component="img"
                    src={lawyer.image}
                    alt="Lawyer profile"
                    sx={{ width: "100%", height: "330px", objectFit: "cover" }}
                  />
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle2" color="primary" textAlign="center">
                      <EditableText
                        value={t(lawyer.nameKey)}
                        onSave={(val) => onSave(`ourLawyers.${lawyer.nameKey}`, val)}
                        isAdmin={isAdmin}
                      />
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      <EditableText
                        value={t(lawyer.titleKey)}
                        onSave={(val) => onSave(`ourLawyers.${lawyer.titleKey}`, val)}
                        isAdmin={isAdmin}
                      />
                    </Typography>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OurLawyers;
