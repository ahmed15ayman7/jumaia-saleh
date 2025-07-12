// schema/sharedPageContent.ts
export default {
    name: 'sharedPageContent',
    title: '  المحتوى المشترك بين اللغات في صفح الخدمات',
    type: 'document',
    fields: [
      { name: 'title', title: 'اسم الصفحة', type: 'string' },
      { name: 'image', title: 'Main Image | الصورة الرئيسية', type: 'image', options: { hotspot: true } },
      { name: 'brochureFiles', title: 'Brochure Files | ملفات الكتيبات', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label | العنوان', type: 'string' },
              { name: 'labelAr', title: 'Label Arabic | العنوان باللغة العربية', type: 'string' },
              { name: 'link', title: '  الملف', type: 'file', options: { accept: [".pdf", ".docx", ".jpg"] } }
            ]
          }
        ]
      },
      { name: 'newsletterSlides', title: 'Newsletter Slides | عروض النشرة الإخبارية', type: 'array', of: [
        {
          type: 'object',
          fields: [
            { name: 'backgroundImage', title: 'Background Image | صورة الخلفية', type: 'image', options: { hotspot: true } },
            { name: 'contentImage', title: 'Content Image | صورة المحتوى', type: 'image', options: { hotspot: true } },
            { name: 'label', title: 'Label | العنوان', type: 'string' },
            { name: 'labelAr', title: 'Label Arabic | العنوان باللغة العربية', type: 'string' },
            { name: 'title', title: 'Title | العنوان', type: 'string' },
            { name: 'titleAr', title: 'Title Arabic | العنوان باللغة العربية', type: 'string' }
          ]
        }
      ] },
      { name: 'relatedServices', title: 'Related Services | الخدمات المتعلقة', type: 'array', of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image | الصورة', type: 'image', options: { hotspot: true } },
            { name: 'title', title: 'Title | العنوان', type: 'string' },
            { name: 'titleAr', title: 'Title Arabic | العنوان باللغة العربية', type: 'string' },
            { name: 'link', title: 'Link | الرابط', type: 'string' }
          ]
        }
      ] },
      
    ],preview: {
      select: {
        title: 'title',
        media: 'image'
      },
      prepare(selection: any) {
        return {
          title: selection.title,
          media: selection.media
        }
      }
    }
  }
  