import React, { useEffect, useState } from 'react'

// Components
import BackgroundBlobs from './BackgroundBlobs'
import PostList from './PostList'


import useWindowSize from './hooks/useWindowSize'
import IPost from './types/PostInterface'
import { RxArrowTopRight } from 'react-icons/rx'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
	posts: Array<IPost>
}

const Headline = ({ posts }: Props) => {
	const windowSize = useWindowSize();

	const [ renderOnLarge, setRenderOnLarge ] = useState(true);
	const [ hoveringImage, setHoveringImage ] = useState(null); 

	useEffect(() => {
    if (windowSize.width)
			return setRenderOnLarge(windowSize.width >= 1024);

  }, [windowSize.width]);

  return (
		
    <div className="w-full h-full flex flex-col lg:flex-row justify-between relative z-0">
			{/* left side: bulletin title */}
			<div className="h-[50vh] z-0 lg:h-screen lg:w-1/2 bg-opacity-[20%] sticky top-0 left-0 overflow-hidden">
				{/* Blobs in background */}
				<div className="absolute h-full w-full flex flex-col justify-center items-center -z-10">
					<BackgroundBlobs/>
				</div>

				{/* Title content */}
				<div className="absolute top-0 left-0 h-full w-full bg-[#eeeeee] backdrop-blur-sm z-0 bg-opacity-50">
					<div className="absolute top-0 left-0 headerTexture w-full h-full"/>
					{/* Background for hovering so image is more visible */}		
					<div className={`w-full h-full bg-gradient-to-r from-[rgba(255,214,80,0.2)] to-[rgba(67,173,206,0.01)] absolute top-0 left-0 transition duration-[2000ms] ` + (hoveringImage ? "opacity-100" : "opacity-0")}/>

					<div className="w-full h-full flex items-center justify-center relative">
						<motion.div className="flex flex-col translate-y-10" layout="position" transition={{delay: 0.5, duration: 2}}>
							<h2 className={"font-extralight text-2xl sm:text-4xl xl:text-5xl transition duration-[3000ms] " + (hoveringImage ? "opacity-10" : "opacity-100")}>the bulletin</h2>
							<h1 className={"font-light text-4xl sm:text-6xl xl:text-7xl transition duration-[3000ms] " + (hoveringImage ? "opacity-10" : "opacity-100")}>forward thinking</h1>

							{ !hoveringImage && (
								<motion.span className="self-end" layout="position" layoutId="headline-arrow"
								transition={{delay: 0.5, type: 'spring', stiffness: 50}}>
									<RxArrowTopRight className="text-7xl sm:text-8xl lg:text-9xl"/> 
								</motion.span>
							)}
							
						</motion.div>
						<AnimatePresence>
								{ hoveringImage && 
									<div className={"absolute w-[50vw] lg:w-[30vw] max-w-[50vh] lg:top-[10vw] right-[5vw] " + (!renderOnLarge && "top-10")}>
										<div className="w-full aspect-square">
											<motion.img src={hoveringImage} alt="IMAGE" layoutId="hoverImage"
											initial={{x: 200, opacity: 0, scale: 0.8}} animate={{x: 0, opacity: 1, scale: 1, transition: {duration: 0.8, type: 'spring', stiffness: 50}}} 
											exit={{ x: 20, opacity: 0, scale: 0.8, transition: {delay: 0.5, duration: 1, ease: "easeInOut"}}}
											className="w-full h-full object-cover rounded-xl"/>
										</div>
								
										<motion.span layout="position" layoutId="headline-arrow" className="absolute top-[60%] left-[-8vw]" 
										animate={{rotate: 30}} transition={{type: 'spring', stiffness: 50}}
										>
											<RxArrowTopRight className="text-7xl sm:text-8xl lg:text-9xl"/>
										</motion.span>
									</div>
								}				
							</AnimatePresence>
					</div>

				</div>
			</div>

			{/* Section border */}
			{ renderOnLarge && <div className="sticky top-[10vh] h-[80vh] w-[1px] bg-black"/>}
				
			{/* right side: posts scroll */}
		
			<div className="lg:w-1/2 z-10 relative">			
				<PostList isLargeScreen={renderOnLarge} posts={posts} hoverController={setHoveringImage} hoveringImage={hoveringImage}/>
				
			</div>
			
    </div>
  )
}

export default Headline