import { Divider, Grid, Box as MUIBox, Typography } from "@mui/material";
import React, { useRef } from "react";
import HeadSections from "../ui/HeadSections";
import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import EditableText from "../EditableText";
import { updateMessage } from "@/lib/updateMessage";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const image9 = "/images/image-9.svg";
const line1 = "/images/line-1.svg";
const line2 = "/images/line-1.svg";
const line3 = "/images/line-1.svg";

const statistics = [
  { value: 100, suffix: "%", key: "casesSolved" },
  { value: 50, suffix: "+", key: "happyClients" },
  { value: 200, suffix: "", key: "loreumIpsum" },
  { value: 150, suffix: "", key: "workingHours" },
];

const AnimatedCounter = ({ to, isInView, suffix }: { to: number; isInView: boolean; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 1.5,
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return controls.stop;
    }
  }, [isInView, to]);

  return <>{count}{suffix}</>;
};

const Advocates = ({ locale, isAdmin ,isbg=false}: { locale: string; isAdmin: boolean,isbg?:boolean }) => {
  const t = useTranslations("advocates");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  return (
    <MUIBox ref={ref} className="w-full" sx={{ position: "relative", maxWidth: "100vw", height: { xs: "70vh", md: "90vh" }, mx: "auto" }}>
         <MUIBox style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",backgroundImage: isbg ? "url('/images/pattern.svg')" : "none",backgroundColor: isbg ? "#FCF8F3" : "transparent", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0}} >
      <MUIBox style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        }}>
      <MUIBox sx={{ width: "100%", height: "100%", position: "relative",pt: {xs: 4,md: "120px"} }} >
        <MUIBox sx={{width: "100%",maxWidth: {xs: "70vw",md: "50vw"},mx: "auto",mb: {xs: 4,md: "70px"}}}>

        <HeadSections
          title={t("title")}
          description={t("description")}
          locale={locale}
          isbg={isbg}
          keyTitle="advocates.title"
          keyDescription="advocates.description"
          isAdmin={isAdmin}
        />
        </MUIBox>
        <MUIBox className="flex justify-center items-center">
<Grid
          container
          spacing={2}
          className="rtl:space-x-reverse"
          sx={{
            top: { md: "348px" },
            left: { md: "246px" },
            width: { xs: "100%", md: "941px" },
            justifyContent: "space-between",
          }}
        >
          {statistics.map((stat, index) => (
            <Grid component="div" size={{ xs: 6,sm: 6, md: 3 }} key={index} sx={{ textAlign: "center",[locale === "ar" ? "borderRight" : "borderLeft"]:index !== 0 ? {xs: "none",md: "1px solid #bababa"} : "none",pl: {xs: 0,md: 4} }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Cormorant Garamond",
                    fontWeight: 400,
                    color:"#0c1c19" ,
                    fontSize: { xs: "3rem", md: "4rem" },
                    letterSpacing: "-1.92px",
                  }}
                >
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} isInView={isInView} />
                </Typography>{t(stat.key)}
                
              </motion.div>
            </Grid>
          ))}
        </Grid>
        </MUIBox>
        


        {/* Left image */}
      {!isbg && <MUIBox
          component="img"
          src={image9}
          alt="Image"
          sx={{
            position: "absolute",
            width: {xs: "100px",sm: "160px",md: "188px"},
            height: "auto",
            bottom: 0,
            left: 0,
            zIndex: -1,
            objectFit: "cover",
            mt: { xs: 4, md: 0 },
          }}
        />}
      </MUIBox>
      </MUIBox>
      </MUIBox>
    </MUIBox>
  );
};

export default Advocates;
