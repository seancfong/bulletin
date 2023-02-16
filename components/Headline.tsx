import React, { useEffect, useState } from "react";

// Components
import BackgroundBlobs from "./BackgroundBlobs";
import PostList from "./PostList";

import useWindowSize from "./hooks/useWindowSize";
import IPost from "./types/PostInterface";
import { RxArrowTopRight } from "react-icons/rx";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  posts: Array<IPost>;
};

const Headline = ({ posts }: Props) => {
  const windowSize = useWindowSize();
  const [renderOnLarge, setRenderOnLarge] = useState(true);

  const [blurBlob, setBlurBlob] = useState(false);

  const { scrollY } = useScroll();

  const boxY = useTransform(scrollY, [0, 1500], [0, 100], { ease: easeInOut });
  const boxScale = useTransform(scrollY, [0, 1000], [1, 1.5], {
    ease: easeInOut,
  });
  const blobX = useTransform(scrollY, [400, 1000], [0, -270], {
    ease: easeInOut,
  });
  const blobScale = useTransform(scrollY, [200, 1200], [1, 1.4], {
    ease: easeInOut,
  });
  const blobRotate = useTransform(scrollY, [700, 900], [0, 3], {
    ease: easeInOut,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() > 700 && blurBlob == false) {
      setBlurBlob(true);
    } else if (scrollY.get() <= 700 && blurBlob == true) {
      setBlurBlob(false);
    }
  });

  useEffect(() => {
    if (windowSize.width) return setRenderOnLarge(windowSize.width >= 1024);
  }, [windowSize.width]);

  return (
    <div className="h-full relative w-full flex flex-col gap-96">
      {/* Fixed background texture */}
      <div className=" headerTexture w-full h-full fixed" />

      {/* Header */}
      <div className="font-primary w-full h-screen flex flex-col justify-center items-center relative">
        <div className="w-[20rem] h-[20rem] sm:w-[33rem] sm:h-[33rem] relative flex justify-center items-center">
          <motion.div
            className={
              "w-full h-full fixed flex justify-center items-center opacity-80 pointer-events-none " +
              (blurBlob && "blur-[2px]")
            }
            style={{
              x: renderOnLarge ? blobX : 0,
              scale: blobScale,
              rotate: blobRotate,
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
          <div className="absolute bottom-10 right-5 text-right w-full h-full flex flex-col justify-end">
            <h2 className="font-extralight text-5xl sm:text-7xl">
              the bulletin
            </h2>
            <h3 className="font-extralight text-2xl sm:text-4xl">
              forward thinking
            </h3>
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
