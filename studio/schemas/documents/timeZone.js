import { MdAlarm } from "react-icons/md";

export default {
  name: 'timezone',
  type: 'document',
  title: 'Timezone',
  icon: MdAlarm,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Timezone',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      name:'offset',
      type: 'string',
      title: 'UTF offset',
      options:{
        list: ["−12:00",
        "-11:00",
        "-10:00",
        "-09:30",
        "-09:00",
        "-08:00",
        "-07:00",
        "-06:00",
        "-05:00",
        "-04:00",
        "-03:30",
        "-03:00",
        "-01:00",
        "-02:00",
        "+00:00",
        "+01:00",
        "+02:00",
        "+03:00",
        "+03:30",
        "+04:00",
        "+04:30",
        "+05:00",
        "+05:30",
        "+05:45",
        "+06:00",
        "+06:30",
        "+07:00",
        "+08:00",
        "+08:45",
        "+09:00",
        "+09:30",
        "+10:00",
        "+10:30",
        "+11:00",
        "+12:00",
        "+12:45",
        "+13:00"]
      },
      validation: Rule => Rule.required().error('this cannot be left blank')
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
