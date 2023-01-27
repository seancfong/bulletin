import React from 'react'
import PostCard from './PostCard'
import IPost from './types/PostInterface'
import { urlFor } from '../lib/client'

type Props = {
	isLargeScreen: boolean,
	posts: Array<IPost>,
	hoverController: any
}

const PostList = ({ isLargeScreen, posts, hoverController }: Props) => {
	const sampleData = [
		{
			title: "I combined two ideas into a game and it’s my new favorite thing.",
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
			tags: ["webdev", "portfolio"],
			datePosted: "01/16/23",
		},
		{
			title: "I followed the trend of using AI to create artwork for a website. It was phenomenal.",
			description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam volupt",
			tags: ["webdev", "portfolio"],
			datePosted: "01/16/23"
		},
		{
			title: "Embarking on a journey - the processof creating the bulletin",
			description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named ",
			tags: ["webdev", "portfolio"],
			datePosted: "01/16/23"
		},
	]

  return (
    <div className="w-full z-10 bg-[#eeeeee] bg-opacity-90 flex flex-col items-center lg:items-start">
			{/* Top separator for small devices */}
			{ !isLargeScreen && (<div className="h-[1px] w-[80vw] bg-black self-center mb-5"/>)}
			
			{/* Gutter top */}
			{ isLargeScreen && <div className="hidden lg:block lg:sticky top-0 bg-gradient-to-b from-[rgba(238,238,238,1)] to-[rgba(238,238,238,0)] w-full h-[10vh]"/> }

			{/* Post Card Content */}
			<div className="w-full h-full flex flex-col gap-5 justify-start items-center max-w-3xl">
				{ posts.map((post, index) => {
					return (
						<React.Fragment key={index}>
							<div className="px-10 lg:pl-[10%] lg:pr-[15%] relative"
							>
								<PostCard post={post} hoverController={hoverController} isLargeScreen={isLargeScreen}/>
								
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