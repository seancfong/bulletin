import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-16">
      <span className="font-light">The Bulletin</span>
      <span className="font-light">&copy; 2023 Sean Collan Fong</span>
    </div>
  );
};

export default Footer;
