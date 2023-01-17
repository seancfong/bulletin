import React from 'react'
import Image from 'next/image'

type Props = {}

const BackgroundBlobs = (props: Props) => {
  return (
    <div className="w-full max-w-[530px] h-[500px] relative opacity-80">
			{/* Blob 1 red orange */}
			<div className="absolute top-0 left-[12%] w-[380px] lg:w-[500px]">
				<img src="svg/blobanimation3.svg" alt="blob 1" width={500} height={500}/>
			</div>
			{/* Blob 3 purple blue */}
			<div className="absolute top-[35%] left-[10%] w-[280px] lg:w-[350px]">
				<img src="svg/blobanimation2.svg" alt="blob 1" width={500} height={500}/>
			</div>
			{/* Blob 2 green yellow */}
			<div className="absolute top-[8%] left-[0%] w-[240px] lg:w-[310px]">
				<img src="svg/blobanimation1.svg" alt="blob 1" width={500} height={500}/>
			</div>
			
    </div>
  )
}

export default BackgroundBlobs