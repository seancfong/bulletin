import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../lib/client'
import IPost from './types/PostInterface'
import { RxArrowTopRight } from 'react-icons/rx'

type Props = {
	post: IPost,
	hoverController: any,
	isLargeScreen: boolean,
	hoveringImage: any
}

const PostCard = ({ post, hoverController, isLargeScreen, hoveringImage }: Props) => {
	
	const { title, description, tags, datePosted, slug, featuredImage } = post;
	const imageUrl = urlFor(featuredImage);
	
  return (
    <div className="w-full relative z-0"
	>
		{ !isLargeScreen &&
			<div className="relative rounded-2xl overflow-hidden aspect-video flex my-5">	
				<motion.img src={imageUrl} alt="" className="rounded-xl w-full object-cover" layoutId={imageUrl}/>
			</div>
		}

		{/* Tags */}
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

		{/* Title */}
			<motion.h3 className="text-2xl sm:text-3xl hover:text-[#084e7c] transition duration-[200ms]" 
				layoutId={slug?.current}>
				<Link href={`/posts/${slug?.current}`}>
				{ isLargeScreen
					? (
					<span								
						onMouseEnter={() => {
							if (post.featuredImage) {
								hoverController(imageUrl)
							}
						}}
					>
						{title}
					</span>
					)
					: (
					<span>
						{title}
					</span>
					)}
				</Link>
			</motion.h3>

		{/* Description */}
		<p className="font-extralight text-sm sm:text-base">
			{description}
		</p>
</div>
  )
}

export default PostCard