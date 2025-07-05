// sanity/schemaTypes/dynamicPage.ts

const realEstate = {
  name: 'real-estate',
  title: 'Real Estate || قضايا عقارية',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Language | اللغة',
      type: 'string',
      options: {
        list: [
          { title: 'Arabic', value: 'ar' },
          { title: 'English', value: 'en' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'breadcrumb', title: 'Breadcrumb | الخلفية', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', title: 'Label | التسمية', type: 'string' }, { name: 'href', title: 'Href | الرابط', type: 'string' }] }] },
    { name: 'imageUrl', title: 'Main Image URL| صورة الصفحة الرئيسية', type: 'url' },
    { name: 'mainTitle', title: 'Main Title | العنوان الرئيسي', type: 'string' },
    { name: 'description', title: 'Description | الوصف', type: 'text' },
    {
      name: 'points',
      title: 'Points | النقاط',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title | العنوان', type: 'string' },
            { name: 'desc', title: 'Description | الوصف', type: 'text' },
          ],
        },
      ],
    },
    { name: 'endDescription', title: 'End Description | الوصف النهائي', type: 'text' },
    { name: 'readMore', title: 'Read More | القراءة المتابعة', type: 'string' },
    { name: 'readMoreLink', title: 'Read More Link | رابط القراءة المتابعة', type: 'url' },
    { name: 'brochureTitle', title: 'Brochure Title | عنوان الملف الثاني', type: 'string' },
    { name: 'brochureDesc', title: 'Brochure Description | وصف الملف الثاني', type: 'string' },
    {
      name: 'brochureFiles',
      title: 'Brochure Files | الملفات في الملف الثاني',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label | التسمية', type: 'string' },
            { name: 'link', title: 'File Link | رابط الملف', type: 'url' },
          ],
        },
      ],
    },
    { name: 'whyTitle', title: 'Why Us Title | عنوان الصفحة الثانية', type: 'string' },
    { name: 'whyDesc', title: 'Why Us Description | وصف الصفحة الثانية', type: 'string' },
    {
      name: 'whyPoints',
      title: 'Why Points | النقاط في الصفحة الثانية',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'newsletterTitle', title: 'Newsletter Title| عنوان النشرة الإخبارية', type: 'string' },
    { name: 'newsletterDesc', title: 'Newsletter Description| وصف النشرة الإخبارية', type: 'string' },
    { name: 'newsletterPhone', title: 'Newsletter Phone| رقم الهاتف في النشرة الإخبارية', type: 'string' },
    { name: 'newsletterInput', title: 'Newsletter Input| حقل الإشتراك في النشرة الإخبارية', type: 'string' },
    { name: 'newsletterCta', title: 'Newsletter CTA| زر الإشتراك في النشرة الإخبارية', type: 'string' },
    { name: 'newsletterSlides', title: 'Newsletter Slides| الشرائح في النشرة الإخبارية', type: 'array', of: [{ type: 'object', fields: [{ name: 'backgroundImage', title: 'Background Image| صورة الخلفية', type: 'url' }, { name: 'contentImage', title: 'Content Image| صورة المحتوى', type: 'url' }, { name: 'label', title: 'Label| التسمية', type: 'string' }, { name: 'title', title: 'Title| العنوان', type: 'string' }] }] },
    { name: 'bottomImage', title: 'Bottom Decorative Image URL| صورة الصفحة السفلية', type: 'url' },
    { name: 'relatedTitle', title: 'Related Services Title| عنوان الخدمات المتعلقة', type: 'string' },
    { name: 'relatedDesc', title: 'Related Services Description| وصف الخدمات المتعلقة', type: 'string' },
    { name: 'relatedServices', title: 'Related Services| الخدمات المتعلقة', type: 'array', of: [{ type: 'object', fields: [{ name: 'image', title: 'Image| صورة الخدمة', type: 'url' }, { name: 'title', title: 'Title| العنوان', type: 'string' }] }] },
  ],
};

export default realEstate;
