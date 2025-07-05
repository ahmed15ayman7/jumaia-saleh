// sanity/schemaTypes/dynamicPage.ts

const realEstate = {
  name: 'real-estate',
  title: ' بيانات الصفحة الخاصة بخدماتنا',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug | اختر اسم الصفحه',
      type: 'reference',
      to: [{ type: 'pageType' }],
      validation: (Rule: any) => Rule.required(),
    },
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
  {
    name: 'sharedPageContent',
    title: ' المحتوى المشترك بين اللغات في صفح الخدمات',
    type: 'reference',
    to: [{ type: 'sharedPageContent' }],
  },
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
    // { name: 'newsletterInput', title: 'Newsletter Input| حقل الإشتراك في النشرة الإخبارية', type: 'string' },
    { name: 'newsletterCta', title: 'Newsletter CTA| زر الإشتراك في النشرة الإخبارية', type: 'string' },
    { name: 'relatedTitle', title: 'Related Services Title| عنوان الخدمات المتعلقة', type: 'string' },
    { name: 'relatedDesc', title: 'Related Services Description| وصف الخدمات المتعلقة', type: 'string' },
  ],
  preview: {
    select: {
      title: 'mainTitle',
      lang: 'language',
      slug: 'slug'
    },
    prepare(value: any) {
      const title = value.title || 'No Title';
      const lang = value.lang || '';
      const slug = value.slug?.value || '';
      return {
        title: `${title} (${lang.toUpperCase()})`,
        subtitle: slug
      };
    }
  }
  
};

export default realEstate;
