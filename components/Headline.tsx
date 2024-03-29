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
  const boxY = useTransform(scrollY, [0, 500, 1500], [0, 150, 100], {
    ease: easeInOut,
  });
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
  const navX = useTransform(scrollY, [0, 500], [-35, -100], {
    ease: easeInOut,
  });
  const bgImgOpacity = useTransform(scrollY, [0, 900], [0.6, 0.3], {
    ease: easeInOut,
  });

  return (
    <div className="h-full relative w-full flex flex-col gap-96">
      {/* Fixed background texture */}
      <motion.div
        className=" w-full h-full fixed "
        style={{ opacity: bgImgOpacity }}
      >
        <div className=" bg-[url('/texture-bg.jpg')] bg-cover w-full h-full shadow-[inset_0_0px_150px_80px] dark:shadow-none shadow-zinc-200 dark:opacity-50" />
      </motion.div>
      <div className=" headerTexture w-full h-full fixed" />

      {/* Header */}
      <div className="z-0 font-primary w-full h-screen flex flex-col justify-center items-center relative">
        <div className="w-[20rem] h-[20rem] sm:w-[33rem] sm:h-[33rem] relative flex justify-center items-center">
          <motion.div
            className="w-full h-full fixed flex justify-center items-center pointer-events-none"
            style={{
              x: renderOnLarge ? blobX : 0,
              scale: blobScale,
              // opacity: blobOpacity,
            }}
          >
            <BackgroundBlobs />
          </motion.div>

          {/* Border box */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: [0.52, 0.12, 0.16, 1], duration: 1.5 }}
            className="border-gray-500 border-[3px] w-full h-full absolute bg-[#eeeeee] bg-opacity-20"
            style={{ y: boxY, scale: boxScale }}
          />

          {/* Title box */}
          <div className="absolute w-full h-full flex flex-col justify-end p-5">
            {/* Sample nav */}
            <AnimatePresence>
              {navbarVertical && (
                <motion.div
                  className="hidden text-lg absolute top-5 right-full origin-top-right sm:flex gap-10 justify-between font-light font-manrope tracking-wider text-gray-600"
                  initial={{ opacity: 0, x: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    x: -35,
                    transition: { ease: "easeInOut", duration: 0.8 },
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ x: navX, rotate: -90 }}
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
            <div className="text-right flex flex-col items-end">
              <div className="overflow-hidden w-fit">
                <motion.h2
                  initial={{ y: 100, rotate: -5 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 22,
                    stiffness: 50,
                    delay: 0.2,
                  }}
                  className="font-extralight text-5xl sm:text-7xl font-manrope"
                >
                  the bulletin
                </motion.h2>
              </div>
              <div className="overflow-hidden w-fit pl-5 pb-5">
                <motion.h3
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    delay: 0.5,
                  }}
                  className="font-extralight text-2xl sm:text-4xl font-manrope"
                >
                  forward thinking
                </motion.h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post list */}
      <motion.div
        className="relative"
        // style={{ scale: postScale }}
      >
        <PostList posts={posts} isLargeScreen={renderOnLarge} />
      </motion.div>
    </div>
  );
};

export default Headline;
