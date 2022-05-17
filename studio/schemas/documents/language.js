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
        name:'aboutEHCN',
        type: 'string',
        title: 'About EHCN'
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
      name:'learningResources',
      type: 'string',
      title: 'Learning Resources'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'learningResource',
      type: 'string',
      title: 'Learning Resource'
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
      name:'search',
      type: 'string',
      title: 'Search'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'researchThreads',
      type: 'string',
      title: 'Research Threads'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'fundingOpportunities',
      type: 'string',
      title: 'Funding Opportunities'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'fundingOpportunity',
      type: 'string',
      title: 'Funding Opportunity'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'course',
      type: 'string',
      title: 'Course'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'courses',
      type: 'string',
      title: 'Courses'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'workingGroup',
      type: 'string',
      title: 'Working Group'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'workingGroups',
      type: 'string',
      title: 'Working Groups'
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
      name:'news',
      type: 'string',
      title: 'News'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'studentLed',
      type: 'string',
      title: 'Student-Led'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'facultyLed',
      type: 'string',
      title: 'faculty-Led'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'selectCat',
      type: 'string',
      title: 'Select a category'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'networkWide',
      type: 'string',
      title: 'Network-Wide'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'institutionSpecific',
      type: 'string',
      title: 'Institution-Specific'
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
      name:'eventsByTimezone',
      type: 'string',
      title: 'Display Events in',
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
      name:'ehcnSupported',
      type: 'string',
      title: 'EHCN is supported by the <a href="https://opensocietyuniversitynetwork.org/">Open Society University Network</a>.'
    },
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
