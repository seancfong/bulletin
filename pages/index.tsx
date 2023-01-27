import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Headline from '../components/Headline'

// Sanity client
import { client } from '../lib/client'

interface Post {
  title: string,
  description: string
}

type Props = {
  posts: Array<Post>
}

const Home = ({ posts }: Props) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#eeeeee] font-primary">
      <Head>
        <title>Bulletin | seancfong</title>
      </Head>

      <Headline posts={posts}/>

      {/* <div className="h-screen flex justify-center items-center uppercase">
        <span className="font-extralight text-3xl text-center">
          New Features <br /> On the way!
        </span>
        
      </div> */}

      <Footer />
      
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
	const postQuery = `*[_type == 'post' && !(_id in path("drafts.**")) && isFeatured == true][0..9] {
		_id, _createdAt, title, description, tags, datePosted, slug, featuredImage, 
	}`;
	const posts = await client.fetch(postQuery);

	return {
		props: {
			posts
		}
	} 
}