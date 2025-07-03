import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import EditableText from "../EditableText";
import { toast } from "sonner";
import { updateMessage } from "@/lib/updateMessage";
import { motion, useInView } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OurExperience = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const t = useTranslations("ourExperience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });

  const onSave = (key: string, value: string) => {
    const toastId = toast.loading("جاري التحديث...");
    updateMessage({ key, value, locale: locale as "en" | "ar" })
      .then(() => toast.success("تم التحديث بنجاح", { id: toastId }))
      .catch(() => toast.error("فشل التحديث", { id: toastId }));
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100vw",
        height: "90vh",
        bgcolor: "#0c1c19",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        px: { xs: 3, md: 10 },
        py: { xs: 10, md: 10 },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        style={{ display: "flex", width: "100%", height: "100%", flexDirection: "row" }}
      >
        {/* Left Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-1/4 flex justify-start items-center"
        >
          <Box
            component="img"
            src="/images/rectangle-12.svg"
            alt="Rectangle"
            sx={{
              width: { xs: "40vw", md: "20vw" },
              zIndex: 1,
              borderRadius: "10px",
              height: { xs: "30vh", md: "60vh" },
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-3/4 justify-self-start"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: { xs: "100%", md: "50vw" },
              gap: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope, Helvetica",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "white",
                  letterSpacing: "0.15rem",
                  mb: 1,
                }}
              >
                <EditableText
                  value={t("yourFirstAid")}
                  onSave={(val) => onSave("ourExperience.yourFirstAid", val)}
                  isAdmin={isAdmin}
                />
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope, Helvetica",
                  fontWeight: 700,
                  fontSize: { xs: "6vw", md: "3.5vw" },
                  lineHeight: 1.2,
                  color: "white",
                }}
              >
                <Box component="span" sx={{ color: "white" }}>
                  <EditableText
                    value={t("letOurExperience")}
                    onSave={(val) => onSave("ourExperience.letOurExperience", val)}
                    isAdmin={isAdmin}
                  />
                </Box>{" "}
                <Box component="span" sx={{ color: "#cf9425" }}>
                  <EditableText
                    value={t("beYourGuide")}
                    onSave={(val) => onSave("ourExperience.beYourGuide", val)}
                    isAdmin={isAdmin}
                  />
                </Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontFamily: "Manrope, Helvetica",
                  fontWeight: 400,
                  fontSize: { xs: "4vw", md: "1.25vw" },
                  color: "white",
                  letterSpacing: "-0.5px",
                  maxWidth: "90%",
                }}
              >
                <EditableText
                  value={t("description")}
                  onSave={(val) => onSave("ourExperience.description", val)}
                  isAdmin={isAdmin}
                />
              </Typography>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 5,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: 'white',
                  px: 4,
                  borderRadius: '25px',
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'primary.dark',
                  },
                }}
              >
                {t('contactUs')}
                {locale === "en" ? (
                  <ArrowForwardIcon className="bounce-h2" sx={{ color: "inherit", width: 24, height: 24 }} />
                ) : (
                  <ArrowBackIcon className="bounce-h2" sx={{ color: "inherit", width: 24, height: 24 }} />
                )}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </motion.div>

      {/* Only this shape is absolutely positioned */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <Box
          className=" animate-bounce"
          sx={{
            position: "absolute",
            width: { xs: "200px", md: "300px" },
            height: { xs: "200px", md: "300px" },
            top: { xs: "5%", md: "50%" },
            transform: { xs: "translateY(-50%)", md: "translateY(-50%)" },
            left: locale === "en" ? { xs: "-100px", md: "-150px" } : { xs: "auto", md: "auto" },
            right: locale === "en" ? { xs: "auto", md: "auto" } : { xs: "-100px", md: "-150px" },
            bgcolor: "#cf9425",
            zIndex: 0,
            borderRadius: "50%",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default OurExperience;
