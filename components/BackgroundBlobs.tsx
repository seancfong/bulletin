import React from "react";
import Image from "next/image";

type Props = {};

const BackgroundBlobs = ({}: Props) => {
  return (
    <>
      {/* Blob 1 red orange */}
      <div className="absolute translate-x-[2.8rem] -translate-y-5 w-[27rem] sm:w-[33rem]">
        <img
          src="/svg/blobanimation3.svg"
          alt="blob 1"
          width={500}
          height={500}
        />
      </div>
      {/* Blob 3 purple blue */}
      <div className="absolute translate-x-[-2rem] translate-y-[5rem] w-[19rem] sm:w-[24rem]">
        <img
          src="/svg/blobanimation2.svg"
          alt="blob 1"
          width={500}
          height={500}
        />
      </div>
      {/* Blob 2 green yellow */}
      <div className="absolute translate-x-[-5.5rem] sm:translate-x-[-6.5rem] translate-y-[-4rem] sm:translate-y-[-5.5rem] w-[16rem] sm:w-[20rem]">
        <img
          src="/svg/blobanimation1.svg"
          alt="blob 1"
          width={500}
          height={500}
        />
      </div>
    </>
  );
};

export default BackgroundBlobs;
