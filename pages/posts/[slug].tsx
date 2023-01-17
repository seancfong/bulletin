import React from 'react'
import { client, urlFor } from '../../lib/client'
import { PortableText } from '@portabletext/react'
import Navbar from '../../components/Navbar'

interface PostDetails {
	title?: string,
	description?: string,
	datePosted?: string,
	content?: any,
	featuredImage?: any,
	tags?: Array<string>
}

type Props = {
	post: PostDetails
}

// Use custom image component to get URL from CMS
const ptComponents = {
	block: {
		h1: ({children}: any) => <h1 className="text-5xl">{children}</h1>,
		h2: ({children}: any) => <h2 className="text-4xl">{children}</h2>,
		h3: ({children}: any) => <h3 className="text-3xl">{children}</h3>,
	},
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      )
    },
  }
}

const PostDetails = ({ post }: Props) => {
	const { 
		title = " ",
		description = " ",
		tags,
		datePosted,
		featuredImage,
		content
	} = post;
	
  return (
    <div className="w-full h-full min-h-screen bg-[#eeeeee]">	
			{/* Navbar */}
			<Navbar />

			{/* Article content */}
			<article className="flex flex-col items-center gap-5">
				{/* Top half */}
				<div className="max-w-7xl w-[90vw] flex flex-col gap-2">
					{/* Date and Tags */}
					<div className="flex gap-3 text-[#999999]">
						<span>
							{datePosted}
						</span>

						{ tags?.map((tagName, index) => {
							return (
								<span key={index} className="border-[1px] border-[#cccccc] rounded-full px-3 text-sm">
									{tagName}
								</span>
							)
						}) }
					</div>

					{/* Title and author */}
					<h1 className="text-3xl">{title}</h1>
					<span className="font-extralight">written by {'Sean Collan Fong'}</span>
				</div>

				{/* Middle */}
				<div className="max-w-7xl w-[90vw] flex flex-col gap-2">
					{/* Featured Image */}
					<div className="aspect-square w-full h-full overflow-hidden">
						<img src={urlFor(featuredImage)} alt={title ?? "Featured Image"} className="h-full w-full object-cover"/>
					</div>
					
				</div>


				{/* Bottom half */}

				{/* Content */}
				<div className="max-w-7xl w-[90vw] flex flex-col gap-2">
					<PortableText 
						value={content}
						components={ptComponents}
					/>
				</div>
				
			</article>
			
    </div>
  )
}


export const getStaticPaths = async () => {
	const postQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

	const paths = await client.fetch(postQuery);

	return {
    paths: paths.map((slug: any) => ({params: {slug}})),
    fallback: true,
  }
}

export const getStaticProps = async ( context: any ) => {
	const { slug = " " } = context.params;
	const query = `*[_type == 'post' && slug.current == $slug][0] {
		title, description, content, tags, slug, datePosted, featuredImage, _id
	}`;

	const post = await client.fetch(query, { slug });

	return {
		props: { post }
	}
}


export default PostDetails