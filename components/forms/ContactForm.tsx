"use client";
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(7, 'رقم الهاتف مطلوب'),
  serviceType: z.string().min(1, 'اختر نوع الخدمة'),
  message: z.string().min(5, 'الرسالة مطلوبة'),
});

const serviceTypes = [
  { value: '', label: 'اختر نوع الخدمة' },
  { value: 'استشارة قانونية', label: 'استشارة قانونية' },
  { value: 'قضية', label: 'قضية' },
  { value: 'عقد', label: 'عقد' },
  { value: 'أخرى', label: 'أخرى' },
];

interface ContactFormData{
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  emailLabel: string;
  emailLabelAr: string;
  phoneLabel: string;
  phoneLabelAr: string;
  serviceTypeLabel: string;
  serviceTypeLabelAr: string;
  messageLabel: string;
  messageLabelAr: string;
  submitButtonLabel: string;
  submitButtonLabelAr: string;
  nameLabel: string;
  nameLabelAr: string;
  }
export default function ContactForm({contactFormData,locale}:{contactFormData:ContactFormData,locale:string}) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess(false);
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSuccess(true);
        setValues({ name: '', email: '', phone: '', serviceType: '', message: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '2rem', mb: 2 }}>
        {contactFormData.title}
      </Typography>
      <Typography sx={{ color: '#666', fontSize: '1.2rem', mb: 3 }}>
        {contactFormData.subtitle}
      </Typography>
      <TextField
        name="name"
        label={locale === 'ar' ? contactFormData.nameLabelAr : contactFormData.nameLabel}
        value={values.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="email"
        label={locale === 'ar' ? contactFormData.emailLabelAr : contactFormData.emailLabel}
        value={values.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="phone"
        label={locale === 'ar' ? contactFormData.phoneLabelAr : contactFormData.phoneLabel}
        value={values.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="serviceType"
        label={locale === 'ar' ? contactFormData.serviceTypeLabelAr : contactFormData.serviceTypeLabel}
        value={values.serviceType}
        onChange={handleChange}
        error={!!errors.serviceType}
        helperText={errors.serviceType}
        select
        fullWidth
        sx={{ mb: 2 }}
      >
        {serviceTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="message"
        label={locale === 'ar' ? contactFormData.messageLabelAr : contactFormData.messageLabel}
        value={values.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message}
        fullWidth
        multiline
        minRows={4}
        sx={{ mb: 3 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          bgcolor: '#C8931C',
          color: '#fff',
          fontSize: '1.4rem',
          fontWeight: 600,
          borderRadius: '6px',
          py: 1.2,
          mt: 1,
          mb: 2,
          '&:hover': { bgcolor: '#b07d13' },
        }}
        fullWidth
      >
        {loading ? '...جاري الإرسال' : locale === 'ar' ? contactFormData.submitButtonLabelAr : contactFormData.submitButtonLabel}
      </Button>
      {success && (
        <Typography sx={{ color: 'green', mt: 1, textAlign: 'center' }}>
          تم إرسال رسالتك بنجاح!
        </Typography>
      )}
    </Box>
  );
} 