import { useMotionValueEvent, useScroll } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Footer from "../components/Footer";
import Headline from "../components/Headline";
import useWindowSize from "../components/hooks/useWindowSize";
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

const NAVBAR_BREAKPOINT = 200;

const Home = ({ posts }: Props) => {
  const { scrollY } = useScroll();
  const [navbarVertical, setNavbarVertical] = useState(true);

  const windowSize = useWindowSize();
  const [renderOnLarge, setRenderOnLarge] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > NAVBAR_BREAKPOINT && navbarVertical === true) {
      setNavbarVertical(false);
    } else if (latest < NAVBAR_BREAKPOINT && navbarVertical === false) {
      setNavbarVertical(true);
    }
  });

  useEffect(() => {
    if (windowSize.width) return setRenderOnLarge(windowSize.width >= 1024);
  }, [windowSize.width]);

  return (
    <div className="w-full h-full flex flex-col bg-[#eeeeee] font-primary overflow-x-hidden scroll-smooth">
      <Head>
        <title>Bulletin | seancfong</title>
      </Head>

      <IndexLinks
        isVisible={!navbarVertical && (windowSize.width ?? 0) > 768}
      />
      <Headline
        posts={posts}
        scrollY={scrollY}
        navbarVertical={navbarVertical}
        renderOnLarge={renderOnLarge}
      />

      <div className="h-screen flex justify-center items-center font-extralight relative z-0">
        <div className="flex flex-col gap-5 items-start bg-[#eeeeee] bg-opacity-50 p-10 md:p-32 shadow-lg rounded-lg">
          <span className="text-4xl sm:text-5xl text-center">Forthcoming:</span>
          <ul className="list-inside list-disc text-lg lg:text-2xl">
            <li>
              <BsPencilSquare className="inline-block" />
              &nbsp;irvinesweeper: pulling off a stunt
            </li>
            <li>bulletin: redesigning a blog</li>
            <li>phenomenal: using AI for assets</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const postQuery = `*[_type == 'post' && !(_id in path("drafts.**")) && isFeatured == true] | order(datePosted desc) [0..9] {
		_id, _createdAt, title, description, tags, datePosted, slug, featuredImage, 
	}`;
  const posts = await client.fetch(postQuery);

  return {
    props: {
      posts,
    },
  };
};
