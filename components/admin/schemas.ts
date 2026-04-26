export type FieldType = 'text' | 'textarea' | 'image' | 'date' | 'slug' | 'tags'

export interface Field {
  key: string
  label: string
  type: FieldType
  bilingual?: boolean
  imageFolder?: string
  required?: boolean
}

export interface CollectionSchema {
  label: string
  addLabel: string
  displayField: string
  idField?: string
  imageField?: string
  fields: Field[]
}

export const SCHEMAS: Record<string, CollectionSchema> = {
  team: {
    label: 'تیم ما',
    addLabel: 'افزودن عضو',
    displayField: 'name',
    imageField: 'photo',
    fields: [
      { key: 'slug', label: 'Slug (URL)', type: 'slug', required: true },
      { key: 'name', label: 'نام', type: 'text', bilingual: true, required: true },
      { key: 'title', label: 'عنوان شغلی', type: 'text', bilingual: true, required: true },
      { key: 'bio', label: 'بیوگرافی کوتاه', type: 'textarea', bilingual: true },
      { key: 'fullBio', label: 'بیوگرافی کامل', type: 'textarea', bilingual: true },
      { key: 'photo', label: 'تصویر', type: 'image', imageFolder: 'team' },
      { key: 'specializations', label: 'تخصص‌ها (جداسازی با کاما)', type: 'tags', bilingual: true },
      { key: 'phone', label: 'تلفن', type: 'text' },
      { key: 'licenseYear', label: 'سال پروانه وکالت', type: 'text' },
    ],
  },
  clients: {
    label: 'موکلین شناخته شده',
    addLabel: 'افزودن موکل',
    displayField: 'name',
    imageField: 'photo',
    fields: [
      { key: 'slug', label: 'Slug (URL)', type: 'slug', required: true },
      { key: 'name', label: 'نام', type: 'text', bilingual: true, required: true },
      { key: 'photo', label: 'تصویر', type: 'image', imageFolder: 'clients' },
      { key: 'caseSummary', label: 'خلاصه پرونده', type: 'textarea', bilingual: true },
      { key: 'caseDetail', label: 'جزئیات پرونده', type: 'textarea', bilingual: true },
      { key: 'category', label: 'دسته‌بندی', type: 'text', bilingual: true },
    ],
  },
  blog: {
    label: 'مقالات',
    addLabel: 'نوشتن مقاله',
    displayField: 'title',
    imageField: 'coverImage',
    fields: [
      { key: 'slug', label: 'Slug (URL)', type: 'slug', required: true },
      { key: 'title', label: 'عنوان', type: 'text', bilingual: true, required: true },
      { key: 'date', label: 'تاریخ (YYYY-MM-DD)', type: 'date', required: true },
      { key: 'category', label: 'دسته‌بندی', type: 'text', bilingual: true },
      { key: 'excerpt', label: 'خلاصه', type: 'textarea', bilingual: true },
      { key: 'body', label: 'متن کامل (Markdown)', type: 'textarea', bilingual: true },
      { key: 'coverImage', label: 'تصویر شاخص', type: 'image', imageFolder: 'blog' },
    ],
  },
  faq: {
    label: 'سوالات متداول',
    addLabel: 'افزودن سوال',
    displayField: 'question',
    fields: [
      { key: 'id', label: 'شناسه (مثال: faq-7)', type: 'slug', required: true },
      { key: 'question', label: 'سوال', type: 'text', bilingual: true, required: true },
      { key: 'answer', label: 'پاسخ', type: 'textarea', bilingual: true, required: true },
    ],
  },
  offices: {
    label: 'دفاتر بین‌الملل',
    addLabel: 'افزودن دفتر',
    displayField: 'city',
    imageField: 'photo',
    fields: [
      { key: 'slug', label: 'Slug (URL)', type: 'slug', required: true },
      { key: 'city', label: 'شهر', type: 'text', bilingual: true, required: true },
      { key: 'country', label: 'کشور', type: 'text', bilingual: true, required: true },
      { key: 'description', label: 'توضیحات', type: 'textarea', bilingual: true },
      { key: 'photo', label: 'تصویر', type: 'image', imageFolder: 'cities' },
    ],
  },
  partners: {
    label: 'شرکا',
    addLabel: 'افزودن شریک',
    displayField: 'name',
    idField: 'slug',
    imageField: 'logo',
    fields: [
      { key: 'slug', label: 'Slug (شناسه)', type: 'slug', required: true },
      { key: 'name', label: 'نام شریک', type: 'text', required: true },
      { key: 'logo', label: 'لوگو', type: 'image', imageFolder: 'partners' },
    ],
  },
}
