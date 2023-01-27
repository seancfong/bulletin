import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../lib/client'
import IPost from './types/PostInterface'

type Props = {
	post: IPost,
	hoverController: any,
	isLargeScreen: boolean
}

const PostCard = ({ post, hoverController, isLargeScreen }: Props) => {
	const { title, description, tags, datePosted, slug } = post;
	
  return (
    <div className="w-full relative z-0">
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
								hoverController(urlFor(post.featuredImage))
							}
						}}
						onMouseLeave={() => {hoverController(null)}}
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