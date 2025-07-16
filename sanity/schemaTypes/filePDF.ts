export default {
  name: 'filePDF',
  title: 'File PDF | الملفات المرفقة',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title | العنوان', type: 'string' },
    { name: 'file', title: 'File | الملف', type: 'file' },
  ],
};