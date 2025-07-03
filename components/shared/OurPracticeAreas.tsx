"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
} from "@mui/material";
import React, { useRef } from "react";
import HeadSections from "../ui/HeadSections";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import EditableText from "../EditableText";
import { updateMessage } from "@/lib/updateMessage";
import { toast } from "sonner";

const PracticeAreas = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const t = useTranslations("ourPracticeAreas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  const practiceAreas = [
    {
      id: 1,
      titleKey: "area1",
      image: "/images/rectangle-2.jpg",
    },
    {
      id: 2,
      titleKey: "area2",
      image: "/images/rectangle-3.jpg",
    },
    {
      id: 3,
      titleKey: "area3",
      image: "/images/rectangle-4.jpg",
    },
    {
      id: 4,
      titleKey: "area4",
      image: "/images/rectangle-5.jpg",
    },
    {
      id: 5,
      titleKey: "area5",
      image: "/images/rectangle-2.jpg",
    },
    {
      id: 6,
      titleKey: "area6",
      image: "/images/rectangle-3.jpg",
    },
  ];

  const scrollByItem = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstChild instanceof HTMLElement
        ? scrollRef.current.firstChild.getBoundingClientRect().width + 24
        : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        bgcolor: "#F9F7F5",
        py: { xs: 8, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <HeadSections
          title={t("title")}
          description={t("description")}
          locale={locale}
          keyTitle="ourPracticeAreas.title"
          keyDescription="ourPracticeAreas.description"
          isAdmin={isAdmin}
        />

        <Box
          ref={scrollRef}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&": {
              scrollbarWidth: "none",
            },
            mt: 4,
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            gap: 3,
            pb: 1,
          }}
        >
          {practiceAreas.map((area, index) => (
            <Box
              key={area.id}
              sx={{
                flex: "0 0 auto",
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(25% - 18px)",
                },
              }}
            >
              <motion.div
                key={isInView ? `area-${area.id}-in` : `area-${area.id}-out`}
                style={{
                  borderRadius: "25px",
                  border: "none",
                  boxShadow: "none",
                  position: "relative",
                  padding: 0,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <Card sx={{ height: { xs: "auto", md: 480 },borderRadius: "25px",border: "none",boxShadow: "none", position: "relative",py: 0 }} >
                  <CardMedia
                    component="img"
                    image={area.image}
                    alt={t(area.titleKey)}
                    sx={{ height: "100%", objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 80,
                      width: "100%",
                      padding: 0,
                      textAlign: "center",
                    }}
                  >
                    <EditableText
                      value={t(area.titleKey)}
                      onSave={(value: string) => onSave(`ourPracticeAreas.${area.titleKey}`, value)}
                      isAdmin={isAdmin}
                      className="text-center text-2xl font-semibold text-[#cf9425]"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }} className="rtl:flex-row-reverse">
          <IconButton
            onClick={() => scrollByItem("left")}
            className="bounce-h2"
            sx={{
              mr: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              width: 41,
              height: 41,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => scrollByItem("right")}
            className="bounce-h3"
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              width: 41,
              height: 41,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default PracticeAreas;
