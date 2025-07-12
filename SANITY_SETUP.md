# نظام إدارة المحتوى - Sanity CMS

## نظرة عامة

تم إنشاء نظام إدارة محتوى شامل لجميع الأقسام المتغيرة في الموقع باستخدام Sanity CMS. النظام يدعم اللغتين العربية والإنجليزية.

## الملفات المُنشأة

### 1. Schemas (نماذج البيانات)

تم إنشاء الـ schemas التالية في مجلد `sanity/schemaTypes/`:

- **`advocates.ts`** - قسم المحامون والإحصائيات
- **`hero.ts`** - القسم الرئيسي (Hero Section)
- **`legalAdvisors.ts`** - المستشارون القانونيون
- **`ourExperience.ts`** - قسم خبرتنا
- **`ourLawyers.ts`** - محامونا
- **`ourPracticeAreas.ts`** - مجالات ممارستنا
- **`testimonials.ts`** - آراء العملاء

### 2. Functions للحصول على البيانات

تم إضافة الـ functions التالية في `sanity/lib/fetchDynamicPage.ts`:

- `fetchAdvocates(locale)`
- `fetchHero(locale)`
- `fetchLegalAdvisors(locale)`
- `fetchOurExperience(locale)`
- `fetchOurLawyers(locale)`
- `fetchOurPracticeAreas(locale)`
- `fetchTestimonials(locale)`

### 3. Helper Functions

تم إنشاء ملفات helper لتحويل البيانات:

- **`lib/sanityHelpers.ts`** - تحويل البيانات من Sanity إلى تنسيق المكونات
- **`lib/getSharedData.ts`** - دوال مساعدة لجلب البيانات

## كيفية الاستخدام

### 1. في الصفحات (Server Components)

```typescript
import { getSharedData } from '@/lib/getSharedData';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const sharedData = await getSharedData(params.locale);
  
  return (
    <div>
      <Hero 
        isAdmin={false} 
        t={t} 
        locale={params.locale}
        sanityData={sharedData.hero}
      />
      <Advocates 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.advocates}
      />
      <LegalConsultation 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.legalAdvisors}
      />
      <OurExperience 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.ourExperience}
      />
      <OurLawyers 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.ourLawyers}
      />
      <PracticeAreas 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.ourPracticeAreas}
      />
      <TestimonialSection 
        locale={params.locale} 
        isAdmin={false}
        sanityData={sharedData.testimonials}
      />
    </div>
  );
}
```

### 2. في المكونات (Client Components)

```typescript
import { getSharedData } from '@/lib/getSharedData';

const HomePageComponent = ({ locale, isAdmin }: { locale: string; isAdmin: boolean }) => {
  const [sharedData, setSharedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSharedData(locale);
      setSharedData(data);
    };
    fetchData();
  }, [locale]);

  return (
    <div>
      <Hero 
        isAdmin={isAdmin} 
        t={t} 
        locale={locale}
        sanityData={sharedData?.hero}
      />
      <Advocates 
        locale={locale} 
        isAdmin={isAdmin}
        sanityData={sharedData?.advocates}
      />
      {/* باقي المكونات */}
    </div>
  );
};
```

### 3. مثال كامل للصفحة الرئيسية

راجع ملف `examples/HomePageExample.tsx` للحصول على مثال كامل لاستخدام جميع المكونات.

### 3. جلب جميع البيانات مرة واحدة

```typescript
import { getSharedData } from '@/lib/getSharedData';

const sharedData = await getSharedData(locale);

// استخدام البيانات
const {
  advocates,
  hero,
  legalAdvisors,
  ourExperience,
  ourLawyers,
  ourPracticeAreas,
  testimonials
} = sharedData;
```

## هيكل البيانات

### Advocates Schema
```typescript
{
  title: string,
  titleAr: string,
  description: string,
  descriptionAr: string,
  statistics: [
    {
      value: number,
      suffix: string,
      label: string,
      labelAr: string
    }
  ]
}
```

### Hero Schema
```typescript
{
  hero: string,
  heroAr: string,
  subtitle: string,
  subtitleAr: string,
  subtitle2: string,
  subtitle2Ar: string,
  subtitle3: string,
  subtitle3Ar: string,
  description: string,
  descriptionAr: string,
  button: string,
  buttonAr: string
}
```

### Legal Advisors Schema
```typescript
{
  header: {
    get: string,
    getAr: string,
    advisors: string,
    advisorsAr: string,
    description: string,
    descriptionAr: string
  },
  contact: {
    phoneNumber: string,
    phoneNumberAr: string
  },
  divider: string,
  dividerAr: string,
  sendUs: {
    header: {
      send: string,
      sendAr: string,
      us: string,
      usAr: string,
      inquiry: string,
      inquiryAr: string
    },
    description: string,
    descriptionAr: string
  },
  cta: string,
  ctaAr: string
}
```

## الميزات

1. **دعم اللغات**: كل حقل له نسخة عربية وإنجليزية
2. **التوافق مع النظام الحالي**: المكونات تعمل مع البيانات القديمة والجديدة
3. **إدارة المحتوى**: يمكن تعديل المحتوى من لوحة تحكم Sanity
4. **الأداء**: جلب البيانات بشكل متوازي لتحسين الأداء
5. **معالجة الأخطاء**: معالجة شاملة للأخطاء مع قيم افتراضية
6. **قيم افتراضية**: جميع المكونات تحتوي على قيم افتراضية في حالة عدم وجود بيانات من Sanity

## المكونات المحدثة

تم تحديث جميع المكونات التالية لاستخدام البيانات من Sanity:

### ✅ المكونات المحدثة
- **Hero** - القسم الرئيسي
- **Advocates** - قسم المحامون والإحصائيات
- **LegalConsultation** - المستشارون القانونيون
- **OurExperience** - قسم خبرتنا
- **OurLawyers** - محامونا
- **PracticeAreas** - مجالات ممارستنا
- **TestimonialSection** - آراء العملاء

### 🔧 التغييرات في كل مكون
1. **إضافة prop جديد**: `sanityData` لاستقبال البيانات من Sanity
2. **قيم افتراضية**: استخدام البيانات القديمة كقيم افتراضية
3. **التوافق**: المكونات تعمل مع البيانات الجديدة والقديمة
4. **TypeScript**: إضافة أنواع البيانات المناسبة

## الخطوات التالية

1. إنشاء محتوى في Sanity Studio
2. تحديث باقي المكونات لاستخدام البيانات الجديدة
3. إضافة المزيد من الحقول حسب الحاجة
4. اختبار النظام في بيئة الإنتاج

## ملاحظات مهمة

- جميع البيانات لها قيم افتراضية في حالة عدم وجود بيانات من Sanity
- النظام متوافق مع النظام الحالي ولا يسبب أي مشاكل
- يمكن إضافة المزيد من الحقول بسهولة في الـ schemas 