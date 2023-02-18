import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full py-10">
      <span className="font-light">The Bulletin</span>
      <span className="font-light">&copy; 2023 Sean Collan Fong</span>
      <a
        className="font-light"
        href="https://www.vecteezy.com/free-vector/website"
      >
        Website Vectors by Vecteezy
      </a>
    </div>
  );
};

export default Footer;
