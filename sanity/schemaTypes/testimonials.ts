export default {
  name: 'testimonials',
  title: 'آراء العملاء',
  type: 'document',
  fields: [
    {
      name: 'tag',
      title: 'العلامة',
      type: 'string',
      description: 'العلامة في أعلى القسم'
    },
    {
      name: 'tagAr',
      title: 'العلامة بالعربية',
      type: 'string',
      description: 'العلامة باللغة العربية'
    },
    {
      name: 'title',
      title: 'العنوان',
      type: 'string',
      description: 'العنوان الرئيسي لقسم آراء العملاء'
    },
    {
      name: 'titleAr',
      title: 'العنوان بالعربية',
      type: 'string',
      description: 'العنوان الرئيسي باللغة العربية'
    },
    {
      name: 'button',
      title: 'نص الزر',
      type: 'string',
      description: 'نص الزر في قسم آراء العملاء'
    },
    {
      name: 'buttonAr',
      title: 'نص الزر بالعربية',
      type: 'string',
      description: 'نص الزر باللغة العربية'
    },
    {
      name: 'testimonials',
      title: 'آراء العملاء',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'الوصف',
              type: 'text',
              description: 'وصف رأي العميل'
            },
            {
              name: 'descriptionAr',
              title: 'الوصف بالعربية',
              type: 'text',
              description: 'وصف رأي العميل باللغة العربية'
            },
            {
              name: 'name',
              title: 'الاسم',
              type: 'string',
              description: 'اسم العميل'
            },
            {
              name: 'nameAr',
              title: 'الاسم بالعربية',
              type: 'string',
              description: 'اسم العميل باللغة العربية'
            },
            {
              name: 'role',
              title: 'الدور/المنصب',
              type: 'string',
              description: 'دور أو منصب العميل'
            },
            {
              name: 'roleAr',
              title: 'الدور/المنصب بالعربية',
              type: 'string',
              description: 'دور أو منصب العميل باللغة العربية'
            }
          ]
        }
      ]
    }
  ]
} 