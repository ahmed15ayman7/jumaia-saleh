"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, Stack, Typography, IconButton, ButtonBase, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomSlider from "./CustomSlider";
interface NewsletterProps {
    data: {
        newsletterTitle?: string;
        newsletterDesc?: string;
        newsletterInput?: string;
        newsletterCta?: string;
        slides?: { backgroundImage: string; contentImage: string; label: string; title: string }[];
        phone?: string;
    };
}

// function SlideShow({ slides, interval = 4000 }: { slides: { backgroundImage: string; contentImage: string; label: string; title: string }[], interval?: number }) {
//   const [current, setCurrent] = useState(0);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle auto change
//   useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, interval);
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [current, slides?.length||0, interval]);

//   // لو حبينا نعمل anim: slide/fade
//   const variants = {
//     enter: { opacity: 0, x: 80 },
//     center: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -80 },
//   };

//   return (
//     <Box
//       sx={{
//         minWidth: 0,
//         width: { xs: "92vw", sm: 360, md: 404 },
//         maxWidth: { xs: "100vw", sm: 404 },
//         height: { xs: 305, sm: 360, md: 405 },
//         display: "flex",
//         flexDirection: "column",
//         position: "relative",
//       }}
//     >
//       <Box
//         sx={{
//           flex: "1 1 0%",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "flex-end",
//           borderRadius: "18px",
//           minHeight: 0,
//           minWidth: 0,
//         }}
//       >
//         <AnimatePresence initial={false} mode="wait">
//           <motion.div
//             key={current}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.55 }}
//             style={{
//               width: '100%',
//               height: '100%',
//               position: "relative",
//               display: 'flex',
//               flexDirection: 'column',
//               flex: 1,
//               background: `url(${slides[current]?.backgroundImage || ""}) center/cover no-repeat`,
//               borderRadius: 18,
//               overflow: 'hidden',
//               justifyContent: 'flex-end',
//             }}
//           >
//             {/* Overlay info داخل flex بالأسفل */}
//             <Box sx={{
//               p: 2.5,
//               pl: 2.5,
//               pb: 2.5,
//               display: "flex",
//               flexDirection: "column",
//               gap: 1.5,
//               width: "100%",
//               alignItems: "flex-start",
//             }}>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   bgcolor: "rgba(57,52,59,0.45)",
//                   borderRadius: 2,
//                   px: 2,
//                   py: 0.7,
//                   fontSize: { xs: "3.2vw", sm: "1vw", md: "1rem" },
//                   mb: "2px",
//                   fontWeight: 500,
//                   textShadow: "0 1px 8px #2229"
//                 }}
//               >
//                 {slides[current]?.label || ""}
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#fff",
//                   fontWeight: 800,
//                   fontSize: { xs: "5vw", sm: "2vw", md: "1.8rem" },
//                   textShadow: "0 3px 7px #000a",
//                   lineHeight: 1.05
//                 }}
//               >
//                 {slides[current]?.title || ""}
//               </Typography>
//               <Box sx={{
//                 mt: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1
//               }}>
//                 <IconButton
//                   sx={{
//                     bgcolor: "#b88e2f",
//                     borderRadius: 2,
//                     width: "44px",
//                     height: "44px",
//                     "&:hover": { bgcolor: "#a17c29" }
//                   }}
//                 >
//                   <ArrowForwardIcon sx={{ color: "#fff" }} />
//                 </IconButton>
//               </Box>
//               {/* صورة محتوى صغيرة (متحركة مع كل slide) */}
//               <Box
//                 component="img"
//                 src={slides[current]?.contentImage || "" }
//                 alt=""
//                 sx={{
//                   mt: 2,
//                   width: { xs: "80px", sm: "140px", md: "180px" },
//                   height: "auto",
//                   borderRadius: 1,
//                   boxShadow: 3
//                 }}
//               />
//             </Box>
//           </motion.div>
//         </AnimatePresence>
//       </Box>
//       {/* Navigation dots (بـ flex) */}
//       <Stack direction="row" justifyContent="center" alignItems="center" spacing={2.2} mt={2}>
//         {slides.map((s, idx) => (
//           <ButtonBase
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             sx={{ p: 0, minWidth: 0, minHeight: 0, borderRadius: "50%" }}
//             aria-label={`Go to slide ${idx + 1}`}
//             focusRipple
//           >
//             <Box
//               sx={{
//                 width: idx === current ? 21 : 10,
//                 height: idx === current ? 21 : 10,
//                 borderRadius: "50%",
//                 border: idx === current ? "2px solid #cf9425" : "none",
//                 bgcolor: idx === current ? "#fff" : "#dadada",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 transition: "all 0.22s",
//               }}
//             >
//               {idx === current && (
//                 <Box
//                   sx={{
//                     background: "#cf9425",
//                     width: 9,
//                     height: 9,
//                     borderRadius: "50%",
//                   }}
//                 />
//               )}
//             </Box>
//           </ButtonBase>
//         ))}
//       </Stack>
//     </Box>
//   );
// }

const Newsletter = ({data}:NewsletterProps) => {
  console.log("data newsletter", data);
  return (
    <Box
      sx={{
        minHeight: { xs: 730, md: 670 },
        width: "100vw",
        px: { xs: 1.5, md: "4vw" },
        py: { xs: 7, md: 0 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Grid container sx={{
        width: "100%",
        height: "100%",
        maxWidth: "1440px",
        alignItems: "center",
        mx: "auto"
      }}>
        {/* Left: text */}
        <Grid component="div"  size={{xs:12,md:5}}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
            mb: { xs: 7, md: 0 }
          }}
        >
          <Box sx={{
            width: { xs: "100%", sm: "90%", md: "85%" },
            textAlign: { xs: "center", md: "left" }
          }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Manrope-ExtraBold', Helvetica",
                fontWeight: 800,
                color: "primary.dark",
                fontSize: { xs: "1.5rem", md: "2.5rem", lg: "2.5rem" },
                lineHeight: { xs: "1.5rem", md: "2.5rem", lg: "2.5rem" },
                mb: 3,
              }}
            >
              {data.newsletterTitle || ""}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins-Medium', Helvetica",
                fontWeight: 500,
                color: "#606060",
                fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" },
                lineHeight: { xs: "1rem", sm: "1rem", md: "1rem" },
                maxWidth: { xs: "92vw", md: "368px" },
                mb: 2,
              }}
            >
              {data.newsletterDesc || ""}
            </Typography>
            <Button
  variant="contained"
  sx={{
    bgcolor: "primary.main",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "40px",
    p: 0,
    minWidth: { xs: 0, md: 0 },
    height: { xs: 44, sm: 48 },
    boxShadow: "none",
    textTransform: "none",
    px: 1.5,
    '&:hover': { bgcolor: "primary.dark", boxShadow: "none" },
    display: "flex",
    alignItems: "center",
  }}
  disableElevation
>
  {/* أيقونة داخل دائرة */}
  <Box
    sx={{
      width: { xs: 34, sm: 38 },
      height: { xs: 34, sm: 38 },
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mr: 1.2, // تباعد الأيقونة عن الرقم
    }}
  >
    <Box
      component="img"
      src="/images/call-center.svg" // مسار الأيقونة
      alt="Call Center"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  </Box>
  {/* رقم الهاتف */}
  <Box
    component="span"
    sx={{
      fontFamily: "'Manrope-SemiBold', Helvetica",
      fontWeight: 700,
      fontSize: { xs: "4vw", sm: "18px" },
      letterSpacing: "0.012em",
      pr: 2.5,
      pl: 1,
    }}
  >
    {data.newsletterCta || "+97122558666"}
  </Box>
</Button>
          </Box>
        </Grid>
        {/* Right: slideshow */}
        <Grid component="div" size={{ xs: 12, md: 7 }} sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" }
        }}>
          <CustomSlider slides={data.slides || []} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;