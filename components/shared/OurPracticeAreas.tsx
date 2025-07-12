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
import React, { useEffect, useRef, useState } from "react";
import HeadSections from "../ui/HeadSections";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import EditableText from "../EditableText";
import { updateMessage } from "@/lib/updateMessage";
import { toast } from "sonner";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { fetchOurPracticeAreas } from "@/sanity/lib/fetchDynamicPage";

// Default practice areas in case Sanity data is not available
const defaultPracticeAreas = [
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

const PracticeAreas = ({
  locale,
  isAdmin,
}: {
  locale: string;
  isAdmin: boolean;
}) => {
  const t = useTranslations("ourPracticeAreas");
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const [practiceAreasPage, setPracticeAreasPage] = useState<{title:string,titleAr:string,description:string,descriptionAr:string,practiceAreas:{pageType:{title:string,titleEn:string,value:string},image:string}[]}| null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let fetchData = async () => {
      let data = await fetchOurPracticeAreas();
      setPracticeAreasPage(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Use Sanity data if available, otherwise use default
  const title = isLoading
    ? t("title")
    : (locale === "ar"
        ? practiceAreasPage?.titleAr
        : practiceAreasPage?.title) || t("title");
  const description = isLoading
    ? t("description")
    : (locale === "ar"
        ? practiceAreasPage?.descriptionAr
        : practiceAreasPage?.description) || t("description");
  const practiceAreas = isLoading
    ? defaultPracticeAreas
    : practiceAreasPage?.practiceAreas?.map((item: {pageType:{title:string,titleEn:string,value:string},image:string},index:number) => ({
        ...item,
        title:
          item.pageType.title && practiceAreasPage
            ? locale === "ar"
            ? item.pageType.title
            : item.pageType.titleEn
            : t(defaultPracticeAreas[index].titleKey),
      })) || defaultPracticeAreas.map((item: any,index:number) => ({
        ...item,
        title: t(item.titleKey),
      }));

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  const scrollByItem = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const itemWidth =
        scrollRef.current.firstChild instanceof HTMLElement
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
        // bgcolor: "#F9F7F5",
        py: { xs: 7, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: "100vw", px: 0 }} className="bg-[#F9F7F5]">
        <HeadSections
          title={title}
          description={description}
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
            mt: { xs: 2, md: "65px" },
            width: "100vw",
            // transform: "translateX(-10%)",
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            gap: { xs: "10px", md: "40px" },
            pb: 1,
            pl: { xs: "10px", md: "92px" },
            pr: { xs: "10px", md: "0px" },
          }}
        >
          {[
            ...practiceAreas || [],
            {
              id: 0,
              titleKey: "",
              image: "",
            },
          ].map((area: any, index: number) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto",
                backgroundColor: "transparent",
                width: {
                  xs: "80%",
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
                  backgroundColor: "transparent",
                  cursor: area.id !== 0 ? "pointer" : "default",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Box
                  onClick={() =>
                    area.id !== 0 &&
                    router.push(`/${locale}/practice/${area.pageType.value || ""}`)
                  }
                  sx={{
                    height: { xs: "200px", md: 419 },
                    borderRadius: "25px",
                    border: "none",
                    boxShadow: "none",
                    position: "relative",
                    py: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  {area.id !== 0 ? (
                    <Image
                      src={
                        area.image && practiceAreasPage?.practiceAreas[index]
                          ? urlFor(area.image).url()
                          : area.image
                      }
                      alt={area.title || ""}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover bg-transparent rounded-2xl border-white border"
                    />
                  ) : (
                    <div className="w-full h-full bg-transparent rounded-2xl"></div>
                  )}
                  {area.id !== 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 80,
                        width: "100%",
                        backgroundColor: "transparent",
                        padding: 0,
                        textAlign: "center",
                      }}
                    >
                      <EditableText
                        value={area.title}
                        onSave={(value: string) =>
                          onSave(`ourPracticeAreas.area${area.id}`, value)
                        }
                        isAdmin={isAdmin}
                        className="text-center text-xl md:text-2xl font-semibold text-[#cf9425] bg-transparent"
                      />
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 4,
            px: { xs: 1, md: 3 },
          }}
          className="rtl:flex-row-reverse"
        >
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
      </Box>
    </Box>
  );
};

export default PracticeAreas;
