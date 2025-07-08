export default {
  name: 'contactMessage',
  title: 'رسائل التواصل',
  type: 'document',
  fields: [
    { name: 'name', title: 'الاسم', type: 'string' },
    { name: 'email', title: 'البريد الإلكتروني', type: 'string' },
    { name: 'phone', title: 'رقم الهاتف', type: 'string' },
    { name: 'serviceType', title: 'نوع الخدمة', type: 'string' },
    { name: 'message', title: 'الرسالة', type: 'text' },
    { name: 'createdAt', title: 'تاريخ الإرسال', type: 'datetime', initialValue: () => new Date().toISOString() },
  ],
}; 