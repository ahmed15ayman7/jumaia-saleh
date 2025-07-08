'use client'

import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AnimateBox from '@/components/ui/AnimateBox'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import AuthLayout from '../layout/AuthLayout'
import { useRouter } from 'next/navigation'

const schema = z.object({
  code: z.string().min(1, 'رمز التحقق مطلوب'),
})

type FormData = z.infer<typeof schema>

export default function VerifyForm() {
  const [showCode, setShowCode] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    let toastId = toast.loading('يتم  الان التحقق...')
    let response = await signIn('credentials', {
      code: data.code,
      redirect: true,
      callbackUrl: '/auth/reset-password',
    })

    if (response?.error) {
      toast.error('خطأ في البيانات', { id: toastId })
    } else {
      router.push('/auth/reset-password')
      toast.success('تم التحقق من البريد الإلكتروني بنجاح', { id: toastId })
    }
  }

  return (
  <AuthLayout backgroundImage={'/images/bg-login.jpg'}>
      <Box
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          p: { xs: 3, sm: 5 },
          px: { xs: 3, md: "150px" },
          py: { xs: 3, md: "51px" },
          borderRadius: 4,
          maxWidth: { xs: '100%', md: "55vw" },
          width: '100%',
          boxShadow: 6,
        }}
      >
        <AnimateBox >
          <Typography variant="h5" fontSize={"2rem"} fontWeight={700} textAlign="center" mb={1}>
            التحقق من البريد الإلكتروني
          </Typography>
          <Typography textAlign="center" sx={{ mb: { xs: 3, md: "40px" }, color: 'gray', fontSize: '1rem' }}>
            سيتم ارسال رمز التحقق على بريدك الإلكتروني{' '}
            <br/>
            <MuiLink href="#" sx={{ color: '#cf9425', fontWeight: 500 }}>
              {"info@jumaia-saleh.com"}
            </MuiLink>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: "30px" }, mb: { xs: 2, md: "40px" } }}>
            <TextField
              fullWidth
              label="رمز التحقق"
              type={showCode ? 'text' : 'password'}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'primary.dark',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              }}
              {...register('code')}
              error={!!errors.code}
              helperText={errors.code?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => setShowCode((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showCode ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: '#cf9425', cursor: 'pointer' }}
                      onClick={() => setShowCode((prev) => !prev)}
                    >
                      {showCode ? 'إخفاء' : 'عرض'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              التحقق
            </Button>
          </form>
        </AnimateBox>
      </Box>
    </AuthLayout>
  )
}
