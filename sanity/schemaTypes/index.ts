import { type SchemaTypeDefinition } from 'sanity'
import dynamicPage from './dynamicPageSchema'
import pageType from './pageTypes'
import sharedPageContent from './sharedPageContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dynamicPage, pageType, sharedPageContent],
}
