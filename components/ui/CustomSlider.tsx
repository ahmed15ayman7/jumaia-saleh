"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

const IMAGE_WIDTH = 400; // px for desktop, responsive handled below
interface CustomSliderProps {
  slides: { backgroundImage: SanityImageSource; contentImage: SanityImageSource; label: string; title: string }[];
  interval?: number;
}
function CustomSlider({ slides, interval = 5000 }: CustomSliderProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % (slides.length || 0));
    }, interval);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, slides.length, interval]);

  // تغيير السلايد بالزر أو الـ Dots
  const goTo = (idx: number) => setCurrent(idx);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  // Animations
  const imgVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.4, ease: "easeIn" } },
  };

  // "Bounce" animation for text
  const bounceVariants = {
    initial: { x: 70, opacity: 0 },
    animate: {
      x: [70, -20, 0],
      opacity: [0, 1, 1],
      transition: {
        x: { type: "spring", stiffness: 500, damping: 15, duration: 0.9 },
        opacity: { duration: 0.5 },
        delay: 0.35,
      },
    },
    exit: { x: -70, opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: 4, md: "24px" },
      alignItems: "flex-start",
      justifyContent: "center",
      py: { xs: 4, md: 10 }
    }}>
      {/* الصورة الرئيسية المتحركة */}
      <Stack
        sx={{
          minWidth: { xs: "95vw", sm: "80vw", md: IMAGE_WIDTH },
          maxWidth: { md: IMAGE_WIDTH },
          aspectRatio: { xs: "1.1", md: "1 / 1.15" },
          borderRadius: "10px",
          boxShadow: "0px 4px 22px #dbdad84d",
          overflow: "hidden",
          bgColor: "#fff",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Box sx={{ width: "100%", flex: 1, display: "flex" }}>
          <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            variants={imgVariants as Variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: `url(${urlFor(slides[current]?.backgroundImage).url() || ""}) center/cover no-repeat`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              
            {/* الكتابة المتحركة */}
            <Box
              sx={{
                width: "70%",
                minHeight: "80px",
                maxWidth: 320,
                background: "rgba(255,255,255,0.88)",
                borderRadius: 0,
                boxShadow: "0px 8px 16px #0000000f",
                p: { xs: 2, md: 2.3 },
                my: { xs: 3, md: 4 },
                ml: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: .7,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slides[current]?.label + slides[current]?.title}
                  variants={bounceVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ width: "100%" }}
                >
                  <Box sx={{ color: "#535353", fontSize: "1.1rem", fontWeight: 500, letterSpacing: ".01em" }}>
                    {slides[current]?.label || ""}
                  </Box>
                  <Box sx={{ fontSize: "2rem", fontWeight: 800, color: "#353535", minHeight: "35px" }}>
                    {slides[current]?.title || ""}
                  </Box>
                </motion.div>
                
              </AnimatePresence>
            </Box>
            <Box sx={{ display: "flex", alignItems: "end",my: { xs: 3, md: 4 },height: "calc(100% - 64px)" }}>
            <IconButton
            sx={{
              bgcolor: "#b88e2f",
              borderRadius: 0,
              width: 43,
              height: 43,
              display: "flex",
              alignItems: "end",
              "&:hover": { bgcolor: "#a58527" },
              color: "#fff"
            }}
            onClick={next}
            aria-label="Next slide"
          >
            <ArrowForwardIcon />
          </IconButton>
          </Box>
          </Box>
          </motion.div>
          </AnimatePresence>
        </Box>
      </Stack>

      {/* السلايدز الأخرى كـ thumbnails + dots */}
      <Stack
        sx={{
          maxWidth: { xs: "99vw", md: IMAGE_WIDTH },
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          pt: { xs: 2, md: 0 },
        }}
        spacing={3}
      >
        {/* Thumbnails / static preview */}
        <Stack
      direction="row"
      mt={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "relative",
        width: "300px",
        height: "400px",
        overflow: "hidden",
        perspective: "1100px", // مهمة للـ 3D
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* فقط الصورة الحالية */}
        <motion.div
          key={current}
          initial={{ rotateY: 90, opacity: 0.2 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0.2 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
            borderRadius: "20px",
            cursor: "pointer",
            background: `url(${slides[current].backgroundImage}) center/cover no-repeat`,
            boxShadow: "0px 4px 18px #bfa84129",
            backfaceVisibility: "hidden", // مهم للـflip
          }}
          onClick={() => goTo((current + 1) % slides.length)}
        />
      </AnimatePresence>
    </Stack>
        {/* Dots & Button */}
        <Stack direction="row" alignItems="center" spacing={3} justifyContent="center" width="100%">
          {slides.map((slide, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: 18, height: 18,
                borderRadius: "50%",
                border: i === current ? "2.5px solid #b88e2f" : "2px solid #cacaca",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                mx: 0.5,
                transition: "border .19s"
              }}
            >
              <Box sx={{
                width: 7.5, height: 7.5,
                borderRadius: "50%",
                bgcolor: i === current ? "#b88e2f" : "#e5e4e4"
              }} />
            </Box>
          ))}
         
        </Stack>
      </Stack>
    </Box>
  );
}

export default CustomSlider;