export default {
  name: 'advocates',
  title: 'المحامون والإحصائيات',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'العنوان',
      type: 'string',
      description: 'العنوان الرئيسي لقسم المحامون'
    },
    {
      name: 'titleAr',
      title: 'العنوان بالعربية',
      type: 'string',
      description: 'العنوان الرئيسي باللغة العربية'
    },
    {
      name: 'description',
      title: 'الوصف',
      type: 'text',
      description: 'وصف قسم المحامون'
    },
    {
      name: 'descriptionAr',
      title: 'الوصف بالعربية',
      type: 'text',
      description: 'وصف قسم المحامون باللغة العربية'
    },
    {
      name: 'statistics',
      title: 'الإحصائيات',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'القيمة',
              type: 'number',
              description: 'القيمة الرقمية للإحصائية'
            },
            {
              name: 'suffix',
              title: 'اللاحقة',
              type: 'string',
              description: 'اللاحقة مثل % أو +'
            },
            {
              name: 'label',
              title: 'التسمية',
              type: 'string',
              description: 'تسمية الإحصائية باللغة الإنجليزية'
            },
            {
              name: 'labelAr',
              title: 'التسمية بالعربية',
              type: 'string',
              description: 'تسمية الإحصائية باللغة العربية'
            }
          ]
        }
      ]
    }
  ]
} 