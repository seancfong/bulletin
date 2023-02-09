import React from 'react'
import PostCard from './PostCard'
import IPost from './types/PostInterface'
import { urlFor } from '../lib/client'

type Props = {
	isLargeScreen: boolean,
	posts: Array<IPost>,
	hoverController: any,
	hoveringImage: any
}

const PostList = ({ isLargeScreen, posts, hoverController, hoveringImage }: Props) => {
	const sampleData = [
		{
			title: "Embarking on a journey - the process of creating the bulletin",
			description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named ",
			tags: ["webdev", "portfolio"],
			datePosted: "2023-01-26"
		},
		{
			title: "How I used Framer Motion to animate a collapsible list stack component",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
			tags: ["webdev"],
			datePosted: "2023-01-26",
		},
		{
			title: "Another test header right here.",
			description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam volupt",
			tags: ["webdev", "portfolio"],
			datePosted: "2023-01-26"
		},
	]

  return (
    <div className="w-full z-10 bg-[#eeeeee] bg-opacity-90 flex flex-col items-center lg:items-start"
		onMouseLeave={() => {hoverController(null)}}>
			{/* Top separator for small devices */}
			{ !isLargeScreen && (<div className="h-[1px] w-[80vw] bg-black self-center mb-5"/>)}
			
			{/* Gutter top */}
			{ isLargeScreen && <div className="hidden lg:block z-30 lg:sticky top-0 bg-gradient-to-b from-[rgba(238,238,238,1)] to-[rgba(238,238,238,0)] w-full h-[10vh]"/> }

			{/* Post Card Content */}
			<div className="w-full h-full flex flex-col gap-5 justify-start items-center max-w-3xl">
				{ posts.map((post, index) => {
					return (
						<React.Fragment key={index}>
							<div className="px-10 lg:pl-[10%] lg:pr-[15%] relative"
							>
								<PostCard post={post} hoverController={hoverController} isLargeScreen={isLargeScreen} hoveringImage={hoveringImage}/>
								
							</div>
							<hr className="border-t-[1px] border-black w-[80vw] lg:w-[90%]"/>
						</React.Fragment>
					)
				})}
			</div>

			{/* Gutter bottom */}
			{ isLargeScreen && <div className="hidden lg:block sticky bottom-0 bg-gradient-to-t from-[rgba(238,238,238,1)] to-[rgba(238,238,238,0)] w-full h-[10vh]"/>}
    </div>
  )
}

export default PostList