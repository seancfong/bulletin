import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  isVisible: boolean;
};

const IndexLinks = ({ isVisible = true }: Props) => {
  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed w-full flex flex-row-reverse justify-end bg-gradient-to-b from-[#eeeeee] to-transparent h-20 z-50 font-light tracking-wider text-xl text-gray-500 gap-10 items-center px-20 max-w-[1920px]"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ type: "spring", damping: 10, stiffness: 40 }}
          >
            <span>
              <Link href="https://www.seancfong.com/">seancfong</Link>
            </span>
            <span>
              <Link href="">archive</Link>
            </span>
            <span>
              <Link href="">the bulletin</Link>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndexLinks;
