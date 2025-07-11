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
import HeadSections from "../ui/HeadSections";

let jumayahSaleh = "/images/jumayah-saleh.jpg";
let ashokAshok = "/images/ashok-ashok.jpg";
let amanahHussain = "/images/amanah-hussain.jpg";
let ramdanYousuf = "/images/ramdan-yousuf.jpg";
let mohamedAsran = "/images/mohamed-asran.jpg";


const lawyerData = [
  {
    id: 1,
    image: mohamedAsran,
    nameKey: "lawyer1.name",
    titleKey: "lawyer1.title",
  },
  {
    id: 2,
    image: ashokAshok,
    nameKey: "lawyer2.name",
    titleKey: "lawyer2.title",
  },
  {
    id: 3,
    image: jumayahSaleh,
    nameKey: "lawyer3.name",
    titleKey: "lawyer3.title",
  },
  {
    id: 4,
    image: amanahHussain,
    nameKey: "lawyer4.name",
    titleKey: "lawyer4.title",
  },
  {
    id: 5,
    image: ramdanYousuf,
    nameKey: "lawyer5.name",
    titleKey: "lawyer5.title",
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
      <Box className="flex flex-col w-full max-w-[90vw] items-center gap-20 max-sm:gap-6">
        <HeadSections
          title={t("title")}
          description={t("description")}
          locale={locale}
          keyTitle="ourLawyers.title"
          keyDescription="ourLawyers.description"
          isAdmin={isAdmin}
        />

        <Grid container justifyContent="center" spacing={4}>
          {lawyerData.map((lawyer, index) => (
            <Grid key={lawyer.id} sx={{order:{xs:index%2===0?1:2,md:1}}}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              >
                <Stack spacing={3} alignItems="center" className="w-[30vw] max-sm:w-[80px] max-w-[200px] rounded-full ">
                  <Box
                    component="img"
                    src={lawyer.image}
                    alt="Lawyer profile"
                    sx={{ width: "100%", height: {xs: "80px",md: "200px"}, objectFit: "cover",borderRadius: "100%",bgcolor:"#D3C596" }}
                  />
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle2" color="primary" textAlign="center" sx={{fontSize: {xs: ".6rem",md: "1rem"}}}>
                      <EditableText
                        value={t(lawyer.nameKey)}
                        onSave={(val) => onSave(`ourLawyers.${lawyer.nameKey}`, val)}
                        isAdmin={isAdmin}
                      />
                    </Typography>
                    <Typography variant="body1" textAlign="center" sx={{fontSize: {xs: ".6rem",md: "1rem"}}}>
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
