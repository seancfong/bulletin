import Link from 'next/link'
import React from 'react'
import IPost from './types/PostInterface'

type Props = {
	post: IPost
}

const PostCard = ({ post }: Props) => {
	const { title, description, tags, datePosted, slug } = post;
	
  return (
    <Link href={`/posts/${slug?.current}`}>
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
			<h3 className="text-2xl sm:text-3xl">
				{title}
			</h3>

			{/* Description */}
			<p className="font-extralight text-sm sm:text-base">
				{description}
			</p>
    </Link>
  )
}

export default PostCard