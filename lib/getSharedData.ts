import { 
  fetchAdvocates, 
  fetchHero, 
  fetchLegalAdvisors, 
  fetchOurExperience, 
  fetchOurLawyers, 
  fetchOurPracticeAreas, 
  fetchTestimonials 
} from '@/sanity/lib/fetchDynamicPage';
import { 
  transformAdvocatesData, 
  transformHeroData, 
  transformLegalAdvisorsData, 
  transformOurExperienceData, 
  transformOurLawyersData, 
  transformOurPracticeAreasData, 
  transformTestimonialsData 
} from './sanityHelpers';

export const getSharedData = async (locale: string = 'ar') => {
  try {
    // Fetch all shared data in parallel
    const [
      advocatesData,
      heroData,
      legalAdvisorsData,
      ourExperienceData,
      ourLawyersData,
      ourPracticeAreasData,
      testimonialsData
    ] = await Promise.all([
      fetchAdvocates(locale),
      fetchHero(locale),
      fetchLegalAdvisors(locale),
      fetchOurExperience(locale),
      fetchOurLawyers(locale),
      fetchOurPracticeAreas(locale),
      fetchTestimonials(locale)
    ]);

    // Transform data to component format
    return {
      advocates: transformAdvocatesData(advocatesData, locale),
      hero: transformHeroData(heroData, locale),
      legalAdvisors: transformLegalAdvisorsData(legalAdvisorsData, locale),
      ourExperience: transformOurExperienceData(ourExperienceData, locale),
      ourLawyers: transformOurLawyersData(ourLawyersData, locale),
      ourPracticeAreas: transformOurPracticeAreasData(ourPracticeAreasData, locale),
      testimonials: transformTestimonialsData(testimonialsData, locale)
    };
  } catch (error) {
    console.error('Error fetching shared data:', error);
    return {
      advocates: null,
      hero: null,
      legalAdvisors: null,
      ourExperience: null,
      ourLawyers: null,
      ourPracticeAreas: null,
      testimonials: null
    };
  }
};

// Individual data fetching functions
export const getAdvocatesData = async (locale: string = 'ar') => {
  try {
    const data = await fetchAdvocates(locale);
    return transformAdvocatesData(data, locale);
  } catch (error) {
    console.error('Error fetching advocates data:', error);
    return null;
  }
};

export const getHeroData = async (locale: string = 'ar') => {
  try {
    const data = await fetchHero(locale);
    return transformHeroData(data, locale);
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
};

export const getLegalAdvisorsData = async (locale: string = 'ar') => {
  try {
    const data = await fetchLegalAdvisors(locale);
    return transformLegalAdvisorsData(data, locale);
  } catch (error) {
    console.error('Error fetching legal advisors data:', error);
    return null;
  }
};

export const getOurExperienceData = async (locale: string = 'ar') => {
  try {
    const data = await fetchOurExperience(locale);
    return transformOurExperienceData(data, locale);
  } catch (error) {
    console.error('Error fetching our experience data:', error);
    return null;
  }
};

export const getOurLawyersData = async (locale: string = 'ar') => {
  try {
    const data = await fetchOurLawyers(locale);
    return transformOurLawyersData(data, locale);
  } catch (error) {
    console.error('Error fetching our lawyers data:', error);
    return null;
  }
};

export const getOurPracticeAreasData = async (locale: string = 'ar') => {
  try {
    const data = await fetchOurPracticeAreas(locale);
    return transformOurPracticeAreasData(data, locale);
  } catch (error) {
    console.error('Error fetching our practice areas data:', error);
    return null;
  }
};

export const getTestimonialsData = async (locale: string = 'ar') => {
  try {
    const data = await fetchTestimonials(locale);
    return transformTestimonialsData(data, locale);
  } catch (error) {
    console.error('Error fetching testimonials data:', error);
    return null;
  }
}; 