export default {
    name: 'post',
    type: 'document',
    title: 'Post',
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
            }
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
            of: [{
                type: 'tag'
            }]
        },
        {
            name: 'datePosted',
            title: 'Date Posted',
            type: 'date',
            options: {
                dateFormat: 'MM/DD/YY'
            }
        },
        {
            title: 'Content', 
            name: 'content',
            type: 'array', 
            of: [{type: 'block'}]
        },
        
    ]
}