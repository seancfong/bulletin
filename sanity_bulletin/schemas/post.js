import {BsImage, BsPersonVideo2, BsChatSquareQuote, BsPinFill} from 'react-icons/bs'

export default {
  title: 'Bulletin',
  icon: BsPinFill,
  name: 'post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
    },
    {
      name: 'isFeatured',
      title: 'Featured?',
      type: 'boolean',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'tag',
        },
      ],
    },
    {
      name: 'datePosted',
      title: 'Date Posted',
      type: 'date',
      options: {
        dateFormat: 'MM/DD/YY',
      },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          title: 'Block',
        },
        {
          type: 'image',
          title: 'Image',
          icon: BsImage,
          options: {hotspot: true},
          fields: [
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
            },
          ],
        },
        {
          name: 'videoAnimation',
          title: 'Video',
          type: 'videoAnimation',
          icon: BsPersonVideo2,
        },
        {
          title: 'Code',
          type: 'code',
        },
        {
          title: 'Gap',
          type: 'linegap',
        },
        {
          title: 'Quote',
          name: 'quote',
          type: 'quote',
          icon: BsChatSquareQuote,
        },
      ],
    },
  ],
}
