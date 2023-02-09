import React from 'react'
import { client, urlFor } from '../../lib/client'
import { PortableText } from '@portabletext/react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Head from 'next/head';

interface PostDetails {
	title?: string | undefined,
	description?: string | undefined,
	datePosted?: string | undefined,
	content?: any,
	featuredImage?: any,
	tags?: Array<string> | undefined,

}

type Props = {
	post: PostDetails,
	slug: string
}

// Use custom image component to get URL from CMS
const ptComponents = {
	list: {
		bullet: ({children}: any) => <ul className="mt-xl">{children}</ul>,
		number: ({children}: any) => <ol className="mt-lg">{children}</ol>,
	},
	listItem: {
		// Ex. 1: customizing common list types
		bullet: ({children}: any) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
		number: ({children}: any) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
	},
	block: {
		h1: ({children}: any) => <h1 className="text-5xl mt-5">{children}</h1>,
		h2: ({children}: any) => <h2 className="text-4xl mt-5">{children}</h2>,
		h3: ({children}: any) => <h3 className="text-3xl mt-5 text-gray-800">{children}</h3>,
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

const PostDetails = ({ post, slug }: Props) => {
	const { 
		title,
		description,
		tags,
		datePosted,
		featuredImage,
		content
	} = post ?? {};

	const imageUrl = urlFor(featuredImage);
	
  return (
    <div className="w-full h-full min-h-screen bg-[#eeeeee] font-primary">	
		<Head>
			<title>{title ?? ""}</title>
		</Head>
			{/* Navbar */}
			<Navbar />

			{/* Article content */}
			<article className="flex flex-col items-center gap-5">
				{/* Top half */}
				<div className="max-w-4xl w-[90vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-2">
					{/* Date and Tags */}
					<div className="flex gap-3 text-[#777777]">
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
					<motion.h3 layout="position" layoutId={slug} className="text-3xl md:text-4xl xl:text-5xl">{title}</motion.h3>
					<span className="font-light text-lg">written by {'Sean Collan Fong'}</span>
				</div>

				{/* Middle */}
				<div className="max-w-6xl w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col md:flex-row md:flex-[1_0] gap-5">
					{/* Featured Image */}
					<div className="flex justify-center basis-[60%]">
						<div className="aspect-square w-full max-w-2xl h-full rounded-xl">
							<motion.img src={imageUrl} alt={title ?? "Featured Image"} className="h-full w-full object-cover rounded-xl" width={1024} height={1024}
							whileHover={{ scale: 1.01, transition: { duration: 0.8, ease: "easeOut" } }}
							transition={{ duration: 0.5, ease: "easeOut" }} layoutId="hoverImage"/>
						</div>
					</div>
					
					{/* Description */}
					<div className="font-light italic basis-[40%] text-lg">
						<p>{description}</p>
					</div>
				</div>

				{/* Section separator */}
				<div className="h-[1px] w-[80vw] md:w-[30vw] max-w-3xl bg-black self-center mb-5"/>

				{/* Bottom half */}
				{/* Content */}
				<div className="max-w-5xl w-[90vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-2 text-lg leading-9 text-gray-500">
					<PortableText 
						value={content}
						components={ptComponents}
					/>
				</div>
				
			</article>
			
		<Footer />
    </div>
  )
}


export const getStaticPaths = async () => {
	const postQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

	const paths = await client.fetch(postQuery);

	return {
    paths: paths.map((slug: any) => ({params: {slug}})),
    fallback: false,
  }
}

export const getStaticProps = async ( context: any ) => {
	const { slug = " " } = context.params;
	const query = `*[_type == 'post' && slug.current == $slug][0] {
		title, description, content, tags, datePosted, featuredImage, _id
	}`;

	const post = await client.fetch(query, { slug });

	return {
		props: { post, slug }
	}
}


export default PostDetails