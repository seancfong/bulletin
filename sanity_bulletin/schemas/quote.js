import {ImQuotesLeft} from 'react-icons/im'

export default {
  title: 'Tag',
  name: 'quote',
  type: 'object',
  fields: [
    {
      title: 'Said by',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'name',
    },
  },
}
