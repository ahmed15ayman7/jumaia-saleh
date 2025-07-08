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
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    let toastId = toast.loading('يتم تسجيل الدخول...')
    let response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/studio',
    })

    if (response?.error) {
      toast.error('خطأ في البيانات', { id: toastId })
    } else {
      router.push('/studio')
      toast.success('تم تسجيل الدخول بنجاح', { id: toastId })
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
            تسجيل الدخول
          </Typography>
          <Typography textAlign="center" sx={{ mb: { xs: 3, md: "40px" }, color: 'gray', fontSize: '1rem' }}>
            ليس لديك حساب؟{' '}
            <MuiLink href="#" sx={{ color: '#cf9425', fontWeight: 500 }}>
              تسجيل
            </MuiLink>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: "30px" } }}>
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'primary.dark',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              }}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="كلمة المرور"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'primary.dark',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: '#cf9425', cursor: 'pointer' }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? 'إخفاء' : 'عرض'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                mb: 2,
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center' }}>
                {/* <Checkbox size="small" {...register('remember')} />
                <Typography variant="body2">تذكرني</Typography> */}
              </label>
              <MuiLink href="#" sx={{ fontSize: 14, color: '#cf9425' }}>
                هل نسيت كلمة المرور؟
              </MuiLink>
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
              تسجيل الدخول
            </Button>
          </form>
        </AnimateBox>
      </Box>
    </AuthLayout>
  )
}
