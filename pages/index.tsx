import { useMotionValueEvent, useScroll } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
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
