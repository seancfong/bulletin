import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="w-full h-[10vh] flex items-center px-[5vw] z-50 relative">
      <Link href="/">
        <h2 className="text-2xl font-extralight">the bulletin</h2>
      </Link>
    </div>
  );
};

export default Navbar;
