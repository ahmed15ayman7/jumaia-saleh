import { motion } from 'framer-motion'
import React from 'react'
import { Stack , Button , Paper , Typography ,Tooltip, Box, IconButton} from '@mui/material'
import Image from 'next/image'

const phoneNumbers = [
    { id: 1, number: "+97122558866", top: "5vh" },
    { id: 2, number: "+97122558866", top: "13vh" },
  ];
const Contact = ({locale}: {locale: string}) => {

  return (
    <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    style={{zIndex: 1000}}

  >
    <Box
        sx={{ position: "fixed", bottom: "10vh", left:locale === "ar" ? "auto" : "1vw", right:locale === "ar" ? "1vw" : "auto", width: "4vw",zIndex: 1000 }}
        className='flex flex-col gap-2.25'
    >
        <Tooltip title={phoneNumbers[0].number} placement={locale === "ar" ? "right" : "left"}>

      <IconButton sx={{ width: 70, height: 70 }}>
        <Image
        className='rotateInUpRight'
          src="/images/whatsapp.svg"
          alt="whatsapp"
          width={70}
          height={70}
          />
      </IconButton>
          </Tooltip>
      <Tooltip title={phoneNumbers[1].number} placement={locale === "ar" ? "right" : "left"}>
        <IconButton sx={{ width: 70, height: 70 }}>
          <Image className='animate-scale' style={{animationDuration: "0.7s", animationIterationCount: "infinite"}} src="/images/call.svg" alt="call" width={70} height={70} />
        </IconButton>
      </Tooltip>
    </Box>

  </motion.div>

  )
}

export default Contact