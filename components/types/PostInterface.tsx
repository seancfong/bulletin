type slug = {
    current: string
}

export interface IPost {
    title?: string | undefined,
    description?: string | undefined,
    tags?: Array<string> | undefined,
    datePosted?: string | undefined,
    slug?: slug | undefined,
    featuredImage?: any,
}

export default IPost