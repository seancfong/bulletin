export default {
	title: 'Portfolio Data',
	name: 'portfolioData',
	type: 'document',
	fields: [
        {
            'name': 'title',
            'title': 'Title',
            'type': 'string'
        },
        {
            'name': 'subtitle',
            'title': 'Subtitle',
            'type': 'string'
        },
        {
            'name': 'description',
            'title': 'Description',
            'type': 'array',
            'of': [{type: 'block'}]
        },
        {
            'name': 'priority',
            'title': 'Priority',
            'type': 'number'
        },
        {
            'name': 'isFeatured',
            'title': 'Featured',
            'type': 'boolean'
        },
        {
            'name': 'githubLink',
            'title': 'Github Link',
            'type': 'string'
        },
        {
            'name': 'award',
            'title': 'Award',
            'type': 'award'
        },
        {
            'name': 'deploymentLink',
            'title': 'Deployment Link',
            'type': 'string'
        },
        {
            'name': 'featuredImage',
            'title': 'Featured Image',
            'type': 'image'
        },
        {
            'name': 'hoverGif',
            'title': 'Hover GIF',
            'type': 'file',
            'options': {
                accept: 'video/webm'
            }
        },
    ]
	
}