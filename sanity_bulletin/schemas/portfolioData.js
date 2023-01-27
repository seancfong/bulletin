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
            'type': 'text'
        },
        {
            'name': 'priority',
            'title': 'Priority',
            'type': 'number'
        },
        {
            'name': 'githubLink',
            'title': 'Github Link',
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