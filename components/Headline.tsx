import React, { useEffect, useState } from 'react'
import BackgroundBlobs from './BackgroundBlobs'
import BulletinTitle from './BulletinTitle'
import PostList from './PostList'

import useWindowSize from './hooks/useWindowSize'

type Props = {}

const Headline = (props: Props) => {
	const windowSize = useWindowSize();

	const [ renderOnLarge, setRenderOnLarge ] = useState(true);

	useEffect(() => {
    if (windowSize.width)
			return setRenderOnLarge(windowSize.width >= 1024);

  }, [windowSize.width]);

  return (
		
    <div className="w-full h-full flex flex-col lg:flex-row justify-between relative">

      {/* left side: bulletin title */}
			<div className="h-[50vh] lg:h-screen lg:w-1/2 bg-opacity-[20%] sticky top-0 left-0 overflow-hidden">
				{/* Blobs in background */}
				<div className="absolute h-full w-full flex flex-col justify-center items-center -z-10">
					<BackgroundBlobs />
				</div>

				{/* Title content */}
				<div className="absolute top-0 left-0 h-full w-full bg-[#eeeeee] backdrop-blur-sm bg-opacity-50">
					<BulletinTitle />
				</div>
			</div>

			{/* Section border */}
				{ renderOnLarge
					? (<div className="sticky top-[10vh] h-[80vh] w-[1px] bg-black"/>)
					: (<div className="h-[1px] w-[80vw] bg-black self-center"/>)
				}
				
			{/* right side: posts scroll */}
			<div className="lg:w-1/2 z-10">			
				<PostList isLargeScreen={renderOnLarge}/>
			</div>
    </div>
  )
}

export default Headline