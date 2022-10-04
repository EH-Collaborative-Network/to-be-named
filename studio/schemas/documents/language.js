import { MdLanguage } from "react-icons/md";

export default {
  name: 'language',
  type: 'document',
  title: 'Language',
  icon: MdLanguage,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      description: 'i18n code',
      name:'code',
      type: 'string',
      title: 'i18n code'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'TBN',
      type: 'string',
      title: 'To Be–Named'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'aboutTBN',
        type: 'string',
        title: 'About To Be–Named'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'aboutVolume',
        type: 'string',
        title: 'About The Edited Volume'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'inVolume',
        type: 'string',
        title: 'In The Edited Volume'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'inExhibition',
        type: 'string',
        title: 'In The Exhibition'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'exhibition',
      type: 'string',
      title: 'Exhibition'
  },
  {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'volume',
        type: 'string',
        title: 'Edited Volume'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'about',
      type: 'string',
      title: 'About'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'aboutExhibition',
        type: 'string',
        title: 'About The Exhibition'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'calendar',
      type: 'string',
      title: 'Calendar'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'availableIn',
      type: 'string',
      title: 'This text is also available in'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'enter',
      type: 'string',
      title: 'Enter'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'page',
      type: 'string',
      title: 'Page'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'researchThread',
      type: 'string',
      title: 'Research Thread'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'researchThreads',
      type: 'string',
      title: 'Research Threads'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'search',
      type: 'string',
      title: 'Search'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'event',
      type: 'string',
      title: 'Event'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'events',
      type: 'string',
      title: 'Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'mediums',
      type: 'string',
      title: 'Mediums'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'allArtists',
      type: 'string',
      title: 'All Artists'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'allLocations',
      type: 'string',
      title: 'All Locations'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'traveling',
      type: 'string',
      title: 'Traveling Artists'
    },

    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'commissioned',
      type: 'string',
      title: 'Commissioned Artists'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'regional',
      type: 'string',
      title: 'Regional Artists'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'upcomingEvents',
      type: 'string',
      title: 'Upcoming Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'pastEvents',
      type: 'string',
      title: 'Past Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'currentEvents',
      type: 'string',
      title: 'Current Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'partners',
      type: 'string',
      title: 'Partner Institutions'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'featured',
      type: 'string',
      title: 'Featured'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'partner',
      type: 'string',
      title: 'Partner Institution'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'ourPartners',
      type: 'string',
      title: 'Our Partners'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'project',
      type: 'string',
      title: 'Project'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'projects',
      type: 'string',
      title: 'Projects'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'selectCat',
      type: 'string',
      title: 'Select a category'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'results',
      type: 'string',
      title: 'Results'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'noResults',
      type: 'string',
      title: 'No results for'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'studentWork',
      type: 'string',
      title: 'Student Work'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'eventsByLocation',
      type: 'string',
      title: 'Display Events Happening In',
      description: '(location)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'eventsByTopic',
      type: 'string',
      title: 'Display Events Happening About',
      description: '(topic)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'timezone',
      type: 'string',
      title: 'Timezone',
      description: '(timezone)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'seeMore',
      type: 'string',
      title: 'See More',
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'back',
      type: 'string',
      title: 'Back',
      description: '(as in back to previous page)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedContent',
      type: 'string',
      title: 'Related Content'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'tbnSupported',
      type: 'string',
      title: 'TBN is supported by the <a href="https://opensocietyuniversitynetwork.org/">Open Society University Network</a>.'
    },
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
