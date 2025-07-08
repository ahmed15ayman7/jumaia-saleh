import { type SchemaTypeDefinition } from 'sanity'
import dynamicPage from './dynamicPageSchema'
import pageType from './pageTypes'
import sharedPageContent from './sharedPageContent'
import aboutUs from './aboutUs'
import HeroSection from './HeroSection'
import terms from './terms'
import privacy from './privacy'
import adminAuth from './AdminAuth'
import blog from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dynamicPage, pageType, sharedPageContent,aboutUs,HeroSection,terms,privacy,adminAuth,blog],
}
