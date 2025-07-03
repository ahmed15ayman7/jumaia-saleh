"use client";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { IconButton } from '@mui/material';
interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <IconButton
      sx={{
        backgroundColor: 'white',
        color: 'primary.main',
        borderRadius: '50%',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
        },
      }}
      onClick={onClick}
      // className="fixed bottom-8 flex items-center justify-center right-8 bg-white text-primary-main rounded-full shadow-lg p-2 px-4 hover:bg-primary hover:text-gold transition z-[9999]"
      title="حفظ التعديلات"
    >
      <TurnedInIcon />
    </IconButton>
  );
} 