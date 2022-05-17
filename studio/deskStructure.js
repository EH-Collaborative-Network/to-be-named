import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdLock } from "react-icons/md";

const hiddenDocTypes = listItem =>
  ![ 'person', 'siteSettings', 'language', 'page','timezone'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
        S.listItem()
          .title('Admin Access Only')
          .child(
            S.list()
            .title('Admin Access Only')
            .items([
              S.listItem()
              .title('Site Settings')
              .child(
                S.editor()
                .id('siteSettings')
                .schemaType('siteSettings')
                .documentId('siteSettings') 
              ).icon(MdSettings),
              S.listItem()
              .title('Languages')
              .schemaType('language')
              .child(S.documentTypeList('language').title('Language')),
              S.listItem()
              .title('Pages')
              .schemaType('page')
              .child(S.documentTypeList('page').title('Page')),
              S.listItem()
              .title('Timezones')
              .schemaType('timezone')
              .child(S.documentTypeList('timezone').title('Timezone')),
           
            ])
            
          )
          .icon(MdLock),
        S.listItem()
          .title('Collaborators')
          .schemaType('person')
          .child(S.documentTypeList('person').title('People')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ].reverse())
