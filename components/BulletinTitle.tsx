import React from 'react'

// import icon and media query for responsive design
import { RxArrowTopRight } from 'react-icons/rx'

type Props = {}

const BulletinTitle = (props: Props) => {
  return (
      // Title container
			<div className="w-full h-full flex items-center justify-center relative font-primary">
				<div className="flex flex-col translate-y-10">
					<h2 className="font-extralight text-2xl sm:text-4xl xl:text-5xl">the bulletin</h2>
					<h1 className="font-light text-4xl sm:text-6xl xl:text-7xl">forward thinking</h1>
					<span className="self-end">
						<RxArrowTopRight className="text-7xl sm:text-8xl lg:text-9xl"/>
					</span>
				</div>
			</div>
  )
}

export default BulletinTitle