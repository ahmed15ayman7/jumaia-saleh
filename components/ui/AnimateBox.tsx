'use client';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

type AnimationType = 'fadeUp' | 'scaleIn' | 'slideLeft' | 'rotateIn' | 'bounceIn' | 'slideRight';

interface AnimateBoxProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
}

const animationVariants = {
  fadeUp: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  scaleIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  slideLeft: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
  rotateIn: { initial: { opacity: 0, rotate: -10 }, animate: { opacity: 1, rotate: 0 } },
  bounceIn: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: [100, -10, 5, 0] },
  },
  slideRight: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
};

const AnimateBox = ({ children, animation = 'fadeUp', delay = 0.1 }: AnimateBoxProps) => {
  const { ref, isInView } = useInViewAnimation();

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      animate={isInView ? variants.animate : {}}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    >
      <Box>{children}</Box>
    </motion.div>
  );
};

export default AnimateBox;
