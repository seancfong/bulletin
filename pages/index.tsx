import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Headline from "../components/Headline";
import IndexLinks from "../components/IndexLinks";

// Sanity client
import { client } from "../lib/client";

interface Post {
  title: string;
  description: string;
}

type Props = {
  posts: Array<Post>;
};

const Home = ({ posts }: Props) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#eeeeee] font-primary overflow-x-hidden scroll-smooth">
      <Head>
        <title>Bulletin | seancfong</title>
      </Head>

      {/* <IndexLinks /> */}
      <Headline posts={posts} />

      <div className="h-screen flex justify-center items-center">
        <span className="font-extralight text-4xl text-center">
          New Posts <br /> on the way!
        </span>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const postQuery = `*[_type == 'post' && !(_id in path("drafts.**")) && isFeatured == true][0..9] {
		_id, _createdAt, title, description, tags, datePosted, slug, featuredImage, 
	}`;
  const posts = await client.fetch(postQuery);

  return {
    props: {
      posts,
    },
  };
};
