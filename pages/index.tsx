import type { NextPage } from 'next'
import Head from 'next/head'
import Headline from '../components/Headline'

const Home: NextPage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#eeeeee]">
      <Head>
        <title>Bulletin | seancfong</title>
      </Head>

      <Headline />

      <div className="h-screen">
        SDFSDF
      </div>
      
    </div>
  )
}

export default Home
