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

const Advocates = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
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
    <MUIBox ref={ref} className="w-full" sx={{ position: "relative", maxWidth: "101vw", height: { xs: "auto", md: "623px" }, mx: "auto" }}>
      <MUIBox sx={{ width: "100%", height: "100%", position: "relative" }}>
        <HeadSections
          title={t("title")}
          description={t("description")}
          locale={locale}
          keyTitle="advocates.title"
          keyDescription="advocates.description"
          isAdmin={isAdmin}
        />

        <Grid
          container
          spacing={2}
          className="rtl:space-x-reverse"
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { md: "348px" },
            left: { md: "246px" },
            width: { xs: "100%", md: "941px" },
            justifyContent: "space-between",
          }}
        >
          {statistics.map((stat, index) => (
            <Grid component="div" size={{ xs: 12, md: 3 }} key={index} sx={{ textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Cormorant_Garamond-Regular', Helvetica",
                    fontWeight: 400,
                    color: "#0c1c19",
                    fontSize: { xs: "48px", md: "80px" },
                    letterSpacing: "-1.92px",
                  }}
                >
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} isInView={isInView} />
                </Typography>
                <EditableText
                  value={t(stat.key)}
                  onSave={(value: string) => onSave(`advocates.${stat.key}`, value)}
                  isAdmin={isAdmin}
                  className="text-lg md:text-2xl"
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Decorative vertical lines for large screens */}
        <MUIBox sx={{ display: { xs: "none", md: "block" } }}>
          <MUIBox component="img" src={line1} alt="Line" sx={{ position: "absolute", width: "1px", height: "186px", top: "346px", left: "461px", objectFit: "cover" }} />
          <MUIBox component="img" src={line2} alt="Line" sx={{ position: "absolute", width: "1px", height: "186px", top: "346px", left: "714px", objectFit: "cover" }} />
          <MUIBox component="img" src={line3} alt="Line" sx={{ position: "absolute", width: "1px", height: "186px", top: "346px", left: "969px", objectFit: "cover" }} />
        </MUIBox>

        {/* Left image */}
        <MUIBox
          component="img"
          src={image9}
          alt="Image"
          sx={{
            position: { xs: "relative", md: "absolute" },
            width: "188px",
            height: "359px",
            top: { md: "264px" },
            left: 0,
            objectFit: "cover",
            mt: { xs: 4, md: 0 },
          }}
        />
      </MUIBox>
    </MUIBox>
  );
};

export default Advocates;
