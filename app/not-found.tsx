"use client"
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
// الترجمة تأتي هنا بناءً على ملف ar.json/en.json في النظام أو الترجمة المحليّة
const imgHeader = "/images/real-estate-img.jpg";         // غيّر المسار حسب مشروعك
const imgDeco = "/images/image-9.svg";              // صورة ميزان العدالة الديكورية

export default function NotFound404() {
  const router = useRouter();

  return (
    <html lang={"ar"} dir={"rtl"}>
<body>
  <ThemeProvider>
    <Box
      sx={{
        bgcolor: "#fff",
        height: "100vh",
        pb: { xs: 1, md: 3 },
        // px: { xs: 1, sm: 2 },
        position: "relative",
        overflow: "hidden",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* الهيدر العلوي بالصورة */}
      {/* <Box
        sx={{
          width: { xs: "99vw", md: "82vw", lg: "980px" },
          maxWidth: "980px",
          height: { xs: "28vw", sm: "160px", md: "220px" },
          mx: "auto",
          position: "relative",
          mt: {xs: 1, md: "53px"},
        }}
      >
        <Image
          src={imgHeader}
          alt="404 Header"
          fill
          style={{
            objectFit: "cover",
            borderRadius: 7,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.26)",
            borderRadius: 7,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "6vw", md: "2.1rem" },
              textAlign: "center",
              fontFamily: "'Manrope-Bold', Helvetica",
              mb: 1,
              mt: { xs: 1, md: 2 },
            }}
          >
            {t("header")}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 400,
              fontSize: { xs: "4vw", md: "1.1rem" },
              textAlign: "center",
              maxWidth: "86%",
              mx: "auto"
            }}
          >
            {t("headerDescription")}
          </Typography>
        </Box>
      </Box> */}

      {/* الجسم الرئيسي */}
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: { xs: 5},px: {xs: 1, sm: 2}}}>
        <Typography
          sx={{
            color: "#cf9425",
            fontWeight: 700,
            fontSize: { xs: "20vw", sm: "150px", md: "128px" },
            fontFamily: "'Manrope-Bold', Helvetica",
            my: "-24px",
            letterSpacing: 3
          }}
        >
          404
        </Typography>
        <Typography
          sx={{
            color: "#153124",
            fontWeight: 700,
            fontSize: { xs: "7vw", sm: "2.4rem", md: "3rem" },
            textAlign: "center",
            fontFamily: "'Manrope-Bold', Helvetica"
          }}
        >
     عذراً! الصفحة غير موجودة
        </Typography>
        <Typography
          sx={{
            color: "#232a2c",
            fontWeight: 400,
            fontSize: { xs: ".8rem", sm: ".8rem", md: "1rem" },
            textAlign: "center",
            mt: 1,
            maxWidth: 650,
          }}
        >
        الصفحة التي تبحث عنها ربما تم نقلها أو لم تعد موجودة. من فضلك عُد إلى الصفحة الرئيسية أو تواصل معنا للمساعدة.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: "7px",
            backgroundColor: "primary.main",
            textTransform: "none",
            fontWeight: 600,
            color: "#fff",
            fontSize: { xs: ".8rem", sm: "1rem" },
            boxShadow: "none",
            px: 5,
            py: 1.5,
            '&:hover': { backgroundColor: "primary.dark" }
          }}
          onClick={() => router.push("/ar")}
        >
          العودة للصفحة الرئيسية
        </Button>
      </Box>

      {/* صورة ديكور أسفل يمين (أو يسار في العربي) */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: { xs: 105, sm: 130, md: 170 },
          height: { xs: 154, sm: 180, md: 319 },
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <Image
          src={imgDeco}
          alt="Decoration"
          fill
          // style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
    </ThemeProvider>
    </body>
    </html>
  );
}