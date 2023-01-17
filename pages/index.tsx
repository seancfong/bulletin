import type { NextPage } from 'next'
import Head from 'next/head'
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
    <div className="w-full h-full flex flex-col bg-[#eeeeee]">
      <Head>
        <title>Bulletin | seancfong</title>
      </Head>

      <Headline posts={posts}/>

      <div className="h-screen">
        SDFSDF
      </div>
      
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
	const postQuery = `*[_type == 'post'][0..9] {
		_createdAt, title, description, tags, datePosted, slug
	}`;
	const posts = await client.fetch(postQuery);

	return {
		props: {
			posts
		}
	} 
}