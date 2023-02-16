import Link from 'next/link'
import React from 'react'

type Props = {}

const IndexLinks = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 z-50 px-16 pt-5 w-full flex justify-center lg:justify-start">
        <Link href="https://seancfong.com">
            <span className="font-primary font-light text-xl">
                seancfong
            </span>   
        </Link>
    </div>
  )
}

export default IndexLinks