export default {
  name: "contactPage",
  title: "صفحة اتصل بنا",
  type: "document",
  fields: [
    {
      name: "breadcrumb",
      title: "الخلفيه",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "العنوان (EN)", type: "string" },
            { name: "labelAr", title: "العنوان (AR)", type: "string" },
            { name: "href", title: "الرابط", type: "string" },
          ],
        },
      ],
    },
    {
      name: "hero",
      title: "الصوره الرئيسيه في الصفحه والكلمات الرئيسيه",
      type: "reference",
      to: [{ type: "hero" }],
    },
    {
      name: "contactFormData",
      title: "معلومات الاتصال",
      type: "object",
      fields: [
        { name: "title", title: " العنوان مثال Send Us A Message", type: "string" },
        { name: "titleAr", title: "العنوان باللغه العربيه مثال ارسل لنا رسالة", type: "string" },
        { name: "subtitle", title: " العنوان الفرعي في ال form", type: "string" },
        { name: "subtitleAr", title: "العنوان الفرعي باللغه العربيه", type: "string" },
        { name: "nameLabel", title: "الاسم مثال Name", type: "string" },
        { name: "nameLabelAr", title: "الاسم باللغه العربيه مثال الاسم", type: "string" },
        { name: "emailLabel", title: "البريد الإلكتروني", type: "string" },
        { name: "emailLabelAr", title: "البريد الإلكتروني باللغه العربيه", type: "string" },
        { name: "phoneLabel", title: "رقم الهاتف", type: "string" },
        { name: "phoneLabelAr", title: "رقم الهاتف باللغه العربيه", type: "string" },
        { name: "serviceTypeLabel", title: "نوع الخدمة", type: "string" },
        { name: "serviceTypeLabelAr", title: "نوع الخدمة باللغه العربيه", type: "string" },
        { name: "messageLabel", title: "الرسالة", type: "string" },
        { name: "messageLabelAr", title: "الرسالة باللغه العربيه", type: "string" },
        { name: "submitButtonLabel", title: "الزر المرسل", type: "string" },
        { name: "submitButtonLabelAr", title: "الزر المرسل باللغه العربيه", type: "string" },
      ],
    },
    {
      name: "lowerImage",
      title: "صوره المحامي الجانبيه",
      type: "image",
      options: { hotspot: true },
    },
    { name: "phone", title: "رقم الهاتف", type: "string" },
    { name: "callUsLabel", title: "العنوان اسفل صورة المحامي اتصل بنا", type: "string" },
    { name: "callUsLabelAr", title: "العنوان اسفل صورة المحامي اتصل بنا باللغه العربيه", type: "string" },
    { name: "callUsButtonLabel", title: "الزر اسفل صورة المحامي اتصل بنا", type: "string" },
    { name: "callUsButtonLabelAr", title: "الزر اسفل صورة المحامي اتصل بنا باللغه العربيه", type: "string" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "lowerImage",
    },
    prepare(selection: { title: string; subtitle: string; media: any }) {
      const { title, subtitle, media } = selection;
      return {
        title: title || "صفحة اتصل بنا",
        subtitle: subtitle,
        media: media,
      };
    },
  },
};
