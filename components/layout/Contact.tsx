"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  Button,
  Paper,
} from "@mui/material";
import Image from "next/image";

const phoneNumbers = [
  { id: 1, number: "00971565955502", top: "5vh" },
  { id: 2, number: "00971565955502", top: "13vh" },
];

const Contact = ({ locale }: { locale: string }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ zIndex: 1000 }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "10vh",
          left: locale === "ar" ? "auto" : "1vw",
          right: locale === "ar" ? "1vw" : "auto",
          zIndex: 1000,
        }}
        className="flex flex-col gap-2.5"
      >
        {/* WhatsApp Button */}
        <Tooltip
          title={phoneNumbers[0].number}
          placement={locale === "ar" ? "right" : "left"}
        >
          <IconButton
            sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 } }}
            onClick={() => setShowChat(!showChat)}
          >
            <Image
              src="/images/whatsapp.svg"
              alt="whatsapp"
              width={70}
              height={70}
            />
          </IconButton>
        </Tooltip>

        {/* Call Button */}
        <Tooltip
          title={phoneNumbers[1].number}
          placement={locale === "ar" ? "right" : "left"}
        >
          <IconButton
            sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 } }}
            onClick={() =>
              window.open(`tel:${phoneNumbers[1].number}`, "_blank")
            }
          >
            <Image
              className="animate-scale"
              style={{
                animationDuration: "0.7s",
                animationIterationCount: "infinite",
              }}
              src="/images/call.svg"
              alt="call"
              width={70}
              height={70}
            />
          </IconButton>
        </Tooltip>

        {/* WhatsApp Chat Widget */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              key="whatsapp-popup"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "100%",
                [locale === "ar" ? "right" : "left"]: "0",
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  width: 300,
                  borderRadius: "16px",
                  overflow: "hidden",
                  bgcolor: "#ffffff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    backgroundColor: "#075E54",
                    color: "white",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Image
                      src="/images/logo-og.png"
                      alt="logo"
                      width={32}
                      height={32}
                      style={{ borderRadius: "50%" }}
                    />
                    <Box>
                      <Typography fontWeight="bold" fontSize="0.6rem">
                      {locale === "ar" ? "مكتب جميعه صالح للمحاماة والاستشارات القانونية" : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"}
                      </Typography>
                      <Typography fontSize="0.4rem">
                      {locale === "ar" ? "عادة ما يتم الرد خلال ساعة" : "Usually replies within an hour"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>

                  <IconButton
                    onClick={() => setShowChat(false)}
                    sx={{ color: "white",height: "50px",width: "50px" }}
                    >
                    ✕
                  </IconButton>
                    </Box>
                </Box>

                {/* Message */}
                <Box
                  sx={{
                    p: 2,
                    backgroundImage:
                      "url('https://web.whatsapp.com/img/bg-chat-tile_8eb56f84b2baed1502efb3e59b56cfe7.png')",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "12px",
                      px: 2,
                      py: 1.5,
                      boxShadow: 1,
                      maxWidth: "80%",
                    }}
                  >
                    <Typography fontWeight="bold" fontSize="0.8rem">
                      {locale === "ar" ? "مكتب جميعه صالح للمحاماة والاستشارات القانونية" : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"} 👋
                    </Typography>
                    <Typography fontSize="0.85rem" mt={1}>
                      {locale === "ar" ? "كيف يمكنني مساعدتك؟" : "How can I help you?"}
                    </Typography>
                    <Typography
                      fontSize="0.65rem"
                      color="gray"
                      sx={{ textAlign: "left", mt: 1 }}
                    >
                     {new Date().toLocaleTimeString(locale === "ar" ? "ar-AE" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Box>
                </Box>

                {/* Start Chat Button */}
                <Box
                  sx={{
                    p: 2,
                    borderTop: "1px solid #e0e0e0",
                    textAlign: "center",
                  }}
                >
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                    onClick={() =>
                      window.open("https://wa.me/00971565955502", "_blank")
                    }
                  >
                    {locale === "ar" ? "ابدأ الدردشة" : "Start Chat"}
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default Contact;
