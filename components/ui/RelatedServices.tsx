"use client";


import {
  Box,

} from "@mui/material";
import React, { useRef } from "react";
import HeadSections from "../ui/HeadSections";

import { motion, useInView } from "framer-motion";
import EditableText from "../EditableText";

import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

const RelatedServices = ({ data, locale }: { data: {title: string, description: string, practiceAreas: { title: string, image: SanityImageSource, titleAr: string, link: string }[]}, locale: string }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const router = useRouter();
  


  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        py: { xs: 3, md: 5 },
        overflowX: "hidden",
      }}
    >
      <Box sx={{maxWidth: "100%",px: {xs: 1,md: 0}}} >
        <HeadSections
          title={data.title}
          description={data.description}
          locale={locale}
          keyTitle="ourPracticeAreas.title"
          keyDescription="ourPracticeAreas.description"
          isAdmin={false}
        />

        <Box
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&": {
              scrollbarWidth: "none",
            },
            mt: {xs: 2,md: "65px"},
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: {xs: "flex-start",md: "center"},
            alignItems: {xs: "center",md: "flex-start"},
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: {xs: "10px",md: "62px"},
            pb: 1,
            px: {xs: "12px",md: "200px"}
          }}
        >
          {data.practiceAreas.map((area, index) => (
            <Box
              onClick={() => {
                router.push(`/${locale}/practice/${area.link}`);
              }}
              key={index}
              sx={{
                flex: "0 0 auto",
                backgroundColor: "transparent",
                width: {
                  xs: "calc(50% - 12px)",
                  sm: "calc(50% - 12px)",
                  md: "calc(34% - 18px)",
                },
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", borderRadius: "15px", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1 }}> </Box>
              <motion.div
                key={isInView ? `area-${index}-in` : `area-${index}-out`}
                style={{
                  borderRadius: "25px",
                  border: "none",
                  boxShadow: "none",
                  position: "relative",
                  padding: 0,
                  backgroundColor: "transparent",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <Box sx={{ height: { xs: "200px", md: 419 },borderRadius: "25px",border: "none",boxShadow: "none", position: "relative",py: 0,backgroundColor: "transparent" }} >
         
                    <Image src={urlFor(area.image).url() || ""} alt={area.title} width={100} height={100} className="w-full h-full object-cover bg-transparent rounded-[15px] border-white border" />
                
        
             <Box
                    sx={{
                      position: "absolute",
                      bottom: 80,
                      width: "100%",
                      backgroundColor: "transparent",
                      padding: 0,
                      textAlign: "center",
                      zIndex: 2,
                    }}
                  >
                    <EditableText
                      value={locale === "ar" ? area.titleAr : area.title}
                      onSave={(value: string) => {}}
                      isAdmin={false}
                      className="text-center text-[.7rem] md:text-2xl font-semibold text-[#cf9425] bg-transparent"
                    />
                  </Box>
                </Box>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RelatedServices;
