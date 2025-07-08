'use client'
import {
    Box,
    Dialog,
    DialogContent,
} from "@mui/material";
import React from "react";

export default function AuthLayout({ children, backgroundImage }: { children: React.ReactNode, backgroundImage: string }) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                bgcolor: "white",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    bgcolor: "white",
                }}
            >
                <Box
                    component="img"
                    src={backgroundImage || "/images/backgroundSignin.svg"}
                    alt="Background"
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100vh",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100vh",
                        top: 0,
                        left: 0,
                        bgcolor: "rgba(17, 17, 17, 0.35)",
                        backdropFilter: "blur(62px)",
                    }}
                />
                {children}
                {/* <Dialog open={true} onClose={() => { }}>
                    <DialogContent>

                    </DialogContent>
                </Dialog> */}

            </Box>
        </Box>
    );
}

