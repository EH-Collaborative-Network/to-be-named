// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import person from './documents/person'
import page from './documents/page'
import project from './documents/project'
import timeZone from './documents/timeZone'
import siteSettings from './documents/siteSettings'
import language from './documents/language'
import researchThread from './documents/researchThread'
import exhibition from './documents/exhibition'
import medium from './documents/medium'
// Object types
import embed from './objects/embed'
import figure from './objects/figure'
import link from './objects/link'
import mediaItem from './objects/mediaItem'
import pdf from './objects/pdf'
import richText from './objects/richText'
import translation from './objects/translation'
import titleTranslation from './objects/titleTranslation'
import dateObj from './objects/dateObj'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    person,
    page,
    timeZone,
    siteSettings,
    language,
    project,
    exhibition,
    researchThread,
    medium,
    // The following are document types which will appear
    // in the studio.
    embed,
    pdf,
    figure,
    mediaItem,
    richText,
    translation,
    titleTranslation,
    dateObj,
    link
  ])
})
