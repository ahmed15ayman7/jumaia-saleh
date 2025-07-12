export default {
  name: 'legalAdvisors',
  title: 'المستشارون القانونيون',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'العنوان الرئيسي',
      type: 'object',
      fields: [
        {
          name: 'get',
          title: 'احصل على',
          type: 'string',
          description: 'الجزء الأول من العنوان'
        },
        {
          name: 'getAr',
          title: 'احصل على بالعربية',
          type: 'string',
          description: 'الجزء الأول من العنوان باللغة العربية'
        },
        {
          name: 'advisors',
          title: 'مستشارون',
          type: 'string',
          description: 'الجزء الثاني من العنوان (ملون)'
        },
        {
          name: 'advisorsAr',
          title: 'مستشارون بالعربية',
          type: 'string',
          description: 'الجزء الثاني من العنوان باللغة العربية (ملون)'
        },
        {
          name: 'description',
          title: 'الوصف',
          type: 'text',
          description: 'وصف العنوان الرئيسي'
        },
        {
          name: 'descriptionAr',
          title: 'الوصف بالعربية',
          type: 'text',
          description: 'وصف العنوان الرئيسي باللغة العربية'
        }
      ]
    },
    {
      name: 'contact',
      title: 'معلومات الاتصال',
      type: 'object',
      fields: [
        {
          name: 'phoneNumber',
          title: 'رقم الهاتف',
          type: 'string',
          description: 'رقم الهاتف للاتصال'
        },
        {
          name: 'phoneNumberAr',
          title: 'رقم الهاتف بالعربية',
          type: 'string',
          description: 'رقم الهاتف باللغة العربية'
        }
      ]
    },
    {
      name: 'divider',
      title: 'نص الفاصل',
      type: 'string',
      description: 'نص الفاصل بين الأقسام'
    },
    {
      name: 'dividerAr',
      title: 'نص الفاصل بالعربية',
      type: 'string',
      description: 'نص الفاصل باللغة العربية'
    },
    {
      name: 'sendUs',
      title: 'أرسل لنا',
      type: 'object',
      fields: [
        {
          name: 'header',
          title: 'العنوان',
          type: 'object',
          fields: [
            {
              name: 'send',
              title: 'أرسل',
              type: 'string',
              description: 'الجزء الأول من العنوان'
            },
            {
              name: 'sendAr',
              title: 'أرسل بالعربية',
              type: 'string',
              description: 'الجزء الأول من العنوان باللغة العربية'
            },
            {
              name: 'us',
              title: 'لنا',
              type: 'string',
              description: 'الجزء الثاني من العنوان (ملون)'
            },
            {
              name: 'usAr',
              title: 'لنا بالعربية',
              type: 'string',
              description: 'الجزء الثاني من العنوان باللغة العربية (ملون)'
            },
            {
              name: 'inquiry',
              title: 'استفسار',
              type: 'string',
              description: 'الجزء الثالث من العنوان'
            },
            {
              name: 'inquiryAr',
              title: 'استفسار بالعربية',
              type: 'string',
              description: 'الجزء الثالث من العنوان باللغة العربية'
            }
          ]
        },
        {
          name: 'description',
          title: 'الوصف',
          type: 'text',
          description: 'وصف قسم أرسل لنا'
        },
        {
          name: 'descriptionAr',
          title: 'الوصف بالعربية',
          type: 'text',
          description: 'وصف قسم أرسل لنا باللغة العربية'
        }
      ]
    },
    {
      name: 'cta',
      title: 'نص الزر',
      type: 'string',
      description: 'نص زر الدعوة للعمل'
    },
    {
      name: 'ctaAr',
      title: 'نص الزر بالعربية',
      type: 'string',
      description: 'نص زر الدعوة للعمل باللغة العربية'
    }
  ]
} 