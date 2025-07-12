// Helper functions to transform Sanity data to component format

export const transformAdvocatesData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    title: locale === 'ar' ? data.titleAr : data.title,
    description: locale === 'ar' ? data.descriptionAr : data.description,
    statistics: data.statistics?.map((stat: any) => ({
      value: stat.value,
      suffix: stat.suffix,
      key: locale === 'ar' ? stat.labelAr : stat.label
    })) || []
  };
};

export const transformHeroData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    hero: locale === 'ar' ? data.heroAr : data.hero,
    subtitle: locale === 'ar' ? data.subtitleAr : data.subtitle,
    subtitle2: locale === 'ar' ? data.subtitle2Ar : data.subtitle2,
    subtitle3: locale === 'ar' ? data.subtitle3Ar : data.subtitle3,
    description: locale === 'ar' ? data.descriptionAr : data.description,
    button: locale === 'ar' ? data.buttonAr : data.button
  };
};

export const transformLegalAdvisorsData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    header: {
      get: locale === 'ar' ? data.header?.getAr : data.header?.get,
      advisors: locale === 'ar' ? data.header?.advisorsAr : data.header?.advisors,
      description: locale === 'ar' ? data.header?.descriptionAr : data.header?.description
    },
    contact: {
      phoneNumber: locale === 'ar' ? data.contact?.phoneNumberAr : data.contact?.phoneNumber
    },
    divider: locale === 'ar' ? data.dividerAr : data.divider,
    sendUs: {
      header: {
        send: locale === 'ar' ? data.sendUs?.header?.sendAr : data.sendUs?.header?.send,
        us: locale === 'ar' ? data.sendUs?.header?.usAr : data.sendUs?.header?.us,
        inquiry: locale === 'ar' ? data.sendUs?.header?.inquiryAr : data.sendUs?.header?.inquiry
      },
      description: locale === 'ar' ? data.sendUs?.descriptionAr : data.sendUs?.description
    },
    cta: locale === 'ar' ? data.ctaAr : data.cta
  };
};

export const transformOurExperienceData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    yourFirstAid: locale === 'ar' ? data.yourFirstAidAr : data.yourFirstAid,
    letOurExperience: locale === 'ar' ? data.letOurExperienceAr : data.letOurExperience,
    beYourGuide: locale === 'ar' ? data.beYourGuideAr : data.beYourGuide,
    description: locale === 'ar' ? data.descriptionAr : data.description,
    contactUs: locale === 'ar' ? data.contactUsAr : data.contactUs
  };
};

export const transformOurLawyersData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    title: locale === 'ar' ? data.titleAr : data.title,
    description: locale === 'ar' ? data.descriptionAr : data.description,
    lawyers: data.lawyers?.map((lawyer: any) => ({
      name: locale === 'ar' ? lawyer.nameAr : lawyer.name,
      title: locale === 'ar' ? lawyer.titleAr : lawyer.title,
      image: lawyer.image?.asset?.url
    })) || []
  };
};

export const transformOurPracticeAreasData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    title: locale === 'ar' ? data.titleAr : data.title,
    description: locale === 'ar' ? data.descriptionAr : data.description,
    practiceAreas: data.practiceAreas?.map((area: any) => ({
      title: locale === 'ar' ? area.pageType.titleAr : area.pageType.title,
      value: area.pageType.value,
      image: area.image?.asset?.url
    })) || []
  };
};

export const transformTestimonialsData = (data: any, locale: string) => {
  if (!data) return null;
  
  return {
    tag: locale === 'ar' ? data.tagAr : data.tag,
    title: locale === 'ar' ? data.titleAr : data.title,
    button: locale === 'ar' ? data.buttonAr : data.button,
    testimonials: data.testimonials?.map((testimonial: any, index: number) => ({
      description: locale === 'ar' ? testimonial.descriptionAr : testimonial.description,
      name: locale === 'ar' ? testimonial.nameAr : testimonial.name,
      role: locale === 'ar' ? testimonial.roleAr : testimonial.role,
      // Keep original format for backward compatibility
      description_0: index === 0 ? (locale === 'ar' ? testimonial.descriptionAr : testimonial.description) : '',
      description_1: index === 1 ? (locale === 'ar' ? testimonial.descriptionAr : testimonial.description) : '',
      description_2: index === 2 ? (locale === 'ar' ? testimonial.descriptionAr : testimonial.description) : '',
      name_0: index === 0 ? (locale === 'ar' ? testimonial.nameAr : testimonial.name) : '',
      name_1: index === 1 ? (locale === 'ar' ? testimonial.nameAr : testimonial.name) : '',
      name_2: index === 2 ? (locale === 'ar' ? testimonial.nameAr : testimonial.name) : '',
      role_0: index === 0 ? (locale === 'ar' ? testimonial.roleAr : testimonial.role) : '',
      role_1: index === 1 ? (locale === 'ar' ? testimonial.roleAr : testimonial.role) : '',
      role_2: index === 2 ? (locale === 'ar' ? testimonial.roleAr : testimonial.role) : ''
    })) || []
  };
}; 