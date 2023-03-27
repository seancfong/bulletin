export default {
  name: 'videoAnimation',
  title: 'Video animation',
  type: 'object',
  fields: [
    {
      name: 'webm',
      title: 'WebM format',
      type: 'file',
      options: {
        accept: 'video/webm',
      },
    },
    {
      name: 'fallback',
      title: 'Fallback image',
      type: 'image',
    },
    {
      name: 'aspectratio',
      title: 'Aspect Ratio',
      type: 'number',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
}
