import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';

const ImageHeader = ({imgHeader,title,subtitle}:{imgHeader:SanityImageSource,title:string,subtitle:string}) => {
  return (
     <Box
        sx={{
          width:  "100%",
          maxWidth: "100vw",
          height: { xs: "28vw", sm: "160px", md: "220px" },
          // mx: "auto",
          position: "relative",
          backgroundImage: `url(${urlFor(imgHeader).url()})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // mt: {xs: 1, md: "53px"},
          mb: {xs: 1, md: "40px"},
        }}
      >
        {/* <Image
          src={urlFor(imgHeader).url()}
          alt="Header"
          fill
          style={{
            objectFit: "cover",
            borderRadius: "2px",
            zIndex: 1,
          }}
        /> */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.26)",
            borderRadius: "2px",
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
              fontSize: { xs: "1rem", md: "2.1rem" },
              textAlign: "center",
              fontFamily: "'Manrope-Bold', Helvetica",
              mb: 1,
              mt: { xs: 1, md: 2 },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 400,
              fontSize: { xs: ".7rem", md: "1.1rem" },
              textAlign: "center",
              maxWidth: "86%",
              mx: "auto"
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box> 

  )
}

export default ImageHeader