import React from 'react'
import { client, urlFor } from '../../lib/client'
import { PortableText } from '@portabletext/react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
				<div>
					<img
						alt={value.alt || ' '}
						loading="lazy"
						src={urlFor(value).width(320).height(240).fit('max').auto('format')}
						className="rounded-xl"
					/>
				</div>
      )
				
        
    },
		code: ({ value }: any) => {
			console.log(value)
			return (
				<div className="overflow-auto">
					<SyntaxHighlighter language={value.language} style={ oneDark } className="codeScrollbar">
						{value.code}
					</SyntaxHighlighter>
				</div>
			)
		}
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
				<div className="max-w-5xl w-[90vw] md:w-[70vw] lg:w-[55vw] flex flex-col gap-2">
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
					<span className="font-light">written by {'Sean Collan Fong'}</span>
				</div>

				{/* Middle */}
				<div className="max-w-6xl w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col md:flex-row md:flex-[1_0] gap-5">
					{/* Featured Image */}
					<div className="flex justify-center basis-[60%]">
						<div className="aspect-square w-full max-w-2xl h-full overflow-hidden">
							<img src={urlFor(featuredImage)} alt={title ?? "Featured Image"} className="h-full w-full object-cover rounded-xl"/>
						</div>
					</div>
					
					{/* Description */}
					<div className="font-extralight italic basis-[40%]">
						<p>{description}</p>
					</div>
				</div>

				{/* Section separator */}
				<div className="h-[1px] w-[80vw] md:w-[30vw] max-w-3xl bg-black self-center mb-5"/>

				{/* Bottom half */}
				{/* Content */}
				<div className="max-w-5xl w-[90vw] md:w-[70vw] lg:w-[55vw] flex flex-col gap-2">
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