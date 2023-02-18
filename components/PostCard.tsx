import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { urlFor } from "../lib/client";
import IPost from "./types/PostInterface";

type Props = {
  post: IPost;
  isLargeScreen: boolean;
};

const PostCard = ({ post, isLargeScreen }: Props) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0.35, 0.75, 1], [-30, 170, 0], {
    ease: easeInOut,
  });

  const textY = useTransform(scrollYProgress, [0, 1], [20, -50], {
    ease: easeInOut,
  });

  const { title, description, tags, datePosted, slug, featuredImage } = post;
  const imageUrl = urlFor(featuredImage) ?? "placeholder.png";

  return (
    <motion.div
      className="w-full h-full relative shadow-xl overflow-hidden"
      ref={cardRef}
      style={{ y }}
    >
      <div className="flex flex-col items-center lg:flex-row h-full w-full gap-5 bg-[#eeeeee] bg-opacity-60 lg:bg-opacity-30">
        <div className="aspect-square w-full shadow-lg">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <motion.div
          className="flex flex-col justify-center w-full pr-10 py-3 px-5 gap-2"
          style={{ y: isLargeScreen ? textY : 0 }}
        >
          <div className="flex gap-3 text-[#999999]">
            <span>{datePosted}</span>

            {tags?.map((tagName, index) => {
              return (
                <span
                  key={index}
                  className="border-[1px] border-[#cccccc] rounded-full px-3 text-sm"
                >
                  {tagName}
                </span>
              );
            })}
          </div>
          <Link href={slug?.current ? `posts/${slug?.current}` : ""}>
            <h2 className="text-4xl font-light transition-all hover:text-sky-700 duration-300">
              {title}
            </h2>
          </Link>
          <p className="font-light text-lg text-gray-600">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostCard;
