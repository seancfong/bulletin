import React from 'react'

type Props = {
    title: string,
    description: string,
		tags: Array<string>,
		datePosted: string
}

const PostCard = ({ title, description, tags, datePosted }: Props) => {
  return (
    <div>
			{/* Tags */}
			<div className="flex gap-3 text-[#999999]">
				<span>
					{datePosted}
				</span>

				{ tags.map((tagName, index) => {
					return (
						<span key={index} className="border-[1px] border-[#cccccc] rounded-full px-3">
							{tagName}
						</span>
					)
				}) }
			</div>
			

			{/* Title */}
			<h3 className="text-3xl">
				{title}
			</h3>

			{/* Description */}
			<p className="font-extralight">
				{description}
			</p>
    </div>
  )
}

export default PostCard