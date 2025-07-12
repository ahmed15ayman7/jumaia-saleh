"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";
import HeadSections from "../ui/HeadSections";
import { fetchOurLawyers } from "@/sanity/lib/fetchDynamicPage";
import { urlFor } from "@/sanity/lib/image";

// Default lawyer data in case Sanity data is not available
const defaultLawyerData = [
  {
    id: 3,
    image: "/images/jumayah-saleh.jpg",
    nameKey: "lawyer3.name",
    titleKey: "lawyer3.title",
  },
  {
    id: 4,
    image: "/images/amanah-hussain.jpg",
    nameKey: "lawyer4.name",
    titleKey: "lawyer4.title",
  },
  {
    id: 2,
    image: "/images/ashok-ashok.jpg",
    nameKey: "lawyer2.name",
    titleKey: "lawyer2.title",
  },
  {
    id: 1,
    image: "/images/mohamed-asran.jpg",
    nameKey: "lawyer1.name",
    titleKey: "lawyer1.title",
  },
  {
    id: 5,
    image: "/images/ramdan-yousuf.jpg",
    nameKey: "lawyer5.name",
    titleKey: "lawyer5.title",
  },
];

const OurLawyers = ({ 
  locale, 
  isAdmin,
  sanityData = null 
}: { 
  locale: string; 
  isAdmin: boolean;
  sanityData?: any;
}) => {
  const t = useTranslations("ourLawyers");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [isLoading, setIsLoading] = useState(true);
  let [lawyersPage, setLawyersPage] = useState<{title:string,titleAr:string,description:string,descriptionAr:string,lawyers:any[] } | null>(null);
  // Use Sanity data if available, otherwise use default
  const title = isLoading ? t("title") : (locale==="ar"?lawyersPage?.titleAr:lawyersPage?.title) || t("title") ;
  const description = isLoading ? t("description") : (locale==="ar"?lawyersPage?.descriptionAr:lawyersPage?.description) || t("description");
  const lawyers = isLoading ? [] : lawyersPage?.lawyers?.map(
    (item: any) => ({
      ...item,
      name: item.name && lawyersPage ? locale==="ar"?item.nameAr:item.name : t(item.nameKey),
      title: item.title && lawyersPage ? locale==="ar"?item.titleAr:item.title : t(item.titleKey),
    })
  ) || defaultLawyerData.map((item: any) => ({
    ...item,
    name: item.name && lawyersPage ? locale==="ar"?item.nameAr:item.name : t(item.nameKey),
    title: item.title && lawyersPage ? locale==="ar"?item.titleAr:item.title : t(item.titleKey),
  }));
  
  useEffect(() => {
    let fetchData = async () => {
      let data = await fetchOurLawyers();
      setLawyersPage(data);
      setIsLoading(false);
      console.log(data);
    }
    fetchData();
  }, []);
  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };
  console.log(lawyers);
  return (
    <Box ref={ref} id="our-team" className="flex flex-col items-center gap-10 py-10 max-sm:py-4">
      <Box className="flex flex-col w-full max-w-[90vw] items-center gap-20 max-sm:gap-6">
        <HeadSections
          title={title}
          description={description}
          locale={locale}
          keyTitle="ourLawyers.title"
          keyDescription="ourLawyers.description"
          isAdmin={isAdmin}
        />

        <Grid container justifyContent="center" spacing={4}>
          {isLoading ? Array.from({ length: 5 }).map((_, index) => (
            <Grid key={index} >
              <Skeleton variant="rectangular" className="rounded-full" width={100} height={100} />
            </Grid>
          )) : lawyers.map((lawyer: any, index: number) => (
            <Grid key={index} >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              >
                <Stack spacing={3} alignItems="center" className="w-[30vw] max-sm:w-[80px] max-w-[200px] rounded-full ">
                  <Box
                    component="img"
                    src={lawyersPage?.lawyers[index]?.image?urlFor(lawyer.image).url():lawyer.image}
                    alt="Lawyer profile"
                    sx={{ width: "100%", height: {xs: "80px",md: "200px"}, objectFit: "cover",borderRadius: "100%",bgcolor:"#D3C596" }}
                  />
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="subtitle2" color="primary" textAlign="center" sx={{fontSize: {xs: ".6rem",md: "1rem"}}}>
                      <EditableText
                        value={lawyer.name}
                        onSave={(val) => onSave(`ourLawyers.lawyer${lawyer.id}.name`, val)}
                        isAdmin={isAdmin}
                      />
                    </Typography>
                    <Typography variant="body1" textAlign="center" sx={{fontSize: {xs: ".6rem",md: "1rem"}}}>
                      <EditableText
                        value={lawyer.title}
                        onSave={(val) => onSave(`ourLawyers.lawyer${lawyer.id}.title`, val)}
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
