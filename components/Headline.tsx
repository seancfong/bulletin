import React, { useEffect, useState } from "react";

// Components
import BackgroundBlobs from "./BackgroundBlobs";
import PostList from "./PostList";

import useWindowSize from "./hooks/useWindowSize";
import IPost from "./types/PostInterface";
import { BsSquare, BsSquareFill } from "react-icons/bs";
import {
  AnimatePresence,
  easeInOut,
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";

type Props = {
  posts: Array<IPost>;
  scrollY: MotionValue<number>;
  navbarVertical: boolean;
  renderOnLarge: boolean;
};

const Headline = ({ posts, scrollY, navbarVertical, renderOnLarge }: Props) => {
  const boxY = useTransform(scrollY, [0, 1500], [0, 100], { ease: easeInOut });
  const boxScale = useTransform(scrollY, [0, 1000], [1, 1.5], {
    ease: easeInOut,
  });
  const blobX = useTransform(
    useSpring(scrollY, { damping: 30, stiffness: 100 }),
    [400, 1000],
    [0, -270],
    {
      ease: easeInOut,
    }
  );
  const blobScale = useTransform(
    useSpring(scrollY, { stiffness: 20, damping: 10 }),
    [200, 1200],
    [1, 1.4],
    {
      ease: easeInOut,
    }
  );
  const blobOpacity = useTransform(scrollY, [200, 1200], [0.95, 0.6], {
    ease: easeInOut,
  });
  const blobRotate = useTransform(scrollY, [700, 900], [0, 3], {
    ease: easeInOut,
  });

  return (
    <div className="h-full relative w-full flex flex-col gap-96">
      {/* Fixed background texture */}
      <div className=" headerTexture w-full h-full fixed" />

      {/* Header */}
      <div className="font-primary w-full h-screen flex flex-col justify-center items-center relative">
        <div className="w-[20rem] h-[20rem] sm:w-[33rem] sm:h-[33rem] relative flex justify-center items-center">
          <motion.div
            className="w-full h-full fixed flex justify-center items-center pointer-events-none"
            style={{
              x: renderOnLarge ? blobX : 0,
              scale: blobScale,
              rotate: blobRotate,
              opacity: blobOpacity,
            }}
          >
            <BackgroundBlobs />
          </motion.div>

          {/* Border box */}
          <motion.div
            className="border-gray-500 border-[3px] w-full h-full absolute bg-[#eeeeee] bg-opacity-20"
            style={{ y: boxY, scale: boxScale }}
          />

          {/* Title box */}
          <div className="absolute w-full h-full flex flex-col justify-end p-5">
            {/* Sample nav */}
            <AnimatePresence>
              {navbarVertical && (
                <motion.div
                  className="hidden text-xl absolute top-5 right-full translate-x-[-2rem] origin-top-right -rotate-90 sm:flex gap-10 justify-between font-light tracking-wider text-gray-500"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span>
                    <Link href="https://www.seancfong.com/">seancfong</Link>
                  </span>
                  <span>
                    <Link href="">archive</Link>
                  </span>
                  <span>
                    <Link href="">home</Link>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title */}
            <div className="text-right pb-5">
              <h2 className="font-extralight text-5xl sm:text-7xl">
                the bulletin
              </h2>
              <h3 className="font-extralight text-2xl sm:text-4xl">
                forward thinking
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Post list */}
      <div className="relative">
        <PostList posts={posts} isLargeScreen={renderOnLarge} />
      </div>
    </div>
  );
};

export default Headline;
