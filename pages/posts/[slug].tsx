import React from "react";
import { client, urlFor } from "../../lib/client";
import { PortableText } from "@portabletext/react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Head from "next/head";
import IndexLinks from "../../components/IndexLinks";
import BackgroundBlobs from "../../components/BackgroundBlobs";
import VideoAnimation from "../../components/post/VideoAnimation";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

interface PostDetails {
  title?: string | undefined;
  description?: string | undefined;
  datePosted?: string | undefined;
  content?: any;
  featuredImage?: any;
  tags?: Array<string> | undefined;
}

type Props = {
  post: PostDetails;
  slug: string;
};

// Use custom image component to get URL from CMS
const ptComponents = {
  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-xl list-outside pl-7">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-outside pl-7">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li style={{ listStyleType: "circle" }}>{children}</li>
    ),
    number: ({ children }: any) => (
      <li style={{ listStyleType: "decimal" }}>{children}</li>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-6xl mt-10 font-light">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <span className="w-full flex items-center gap-5 mt-10 font-manrope">
        <h2 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-700 font-semibold w-min whitespace-nowrap pb-2">
          {children}
        </h2>
        <hr className="w-full border-none h-[2px] bg-gray-400 relative" />
      </span>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl md:text-4xl mt-5 text-indigo-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl md:text-3xl mt-5 text-gray-700">{children}</h4>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="w-full py-5">
          <img
            alt={value.alt || " "}
            loading="lazy"
            src={urlFor(value).fit("max").auto("format")}
            className="rounded-xl shadow-md shadow-[rgba(200,200,200,0.1)]"
          />
          {value.caption && (
            <div className="w-full flex justify-center mt-2">
              <p className="italic text-xs gray-400">{value.caption}</p>
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="overflow-auto">
          <SyntaxHighlighter
            language={value.language}
            style={oneDark}
            className="codeScrollbar"
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
    linegap: ({ value }: any) => {
      return <div className="h-20 w-full" />;
    },
    videoAnimation: ({ value }: any) => {
      // console.log(value?.webm?.asset);
      return <VideoAnimation webm={value.webm} fallback={value?.fallback} />;
    },
    quote: ({ value }: any) => {
      // console.log(value.name, value.content);
      if (!value?.name || !value?.content) {
        return <></>;
      }
      return (
        <div className="w-full rounded-lg bg-gradient-to-r from-[rgba(131,96,195,0.1)] to-[rgba(46,191,145,0.1)] bg-opacity-20 h-min flex flex-col items-center pt-10 px-10 pb-5">
          <FaQuoteLeft className="text-indigo-300 mb-3 self-start ml-5" />
          <div className="text-xl font-normal tracking-wide px-10 text-center font-manrope text-gray-500">
            {value?.content}
          </div>
          <FaQuoteRight className="text-indigo-300 mt-3 self-end mr-5" />
          <div className="self-end text-slate-500 font-light italic">
            - {value?.name}
          </div>
        </div>
      );
    },
  },
};

const PostDetails = ({ post, slug }: Props) => {
  const { title, description, tags, datePosted, featuredImage, content } =
    post ?? {};

  const imageUrl = urlFor(featuredImage);

  // console.log(content);

  return (
    <div className="w-full h-full min-h-screen bg-[#eeeeee] font-primary relative z-0">
      <Head>
        <title>{title ?? ""}</title>
      </Head>
      {/* Navbar */}
      <div className="h-[6rem] lg:block">
        <IndexLinks isVisible={true} />
      </div>

      {/* Dots background */}
      <div className="fixed top-0 bg-[url('/texture-bg.jpg')] opacity-25 bg-cover w-full h-full shadow-[inset_0_0px_150px_80px] shadow-zinc-200" />

      <div className="headerTexture w-full h-full fixed top-0" />

      {/* Article content */}
      <article className="flex flex-col items-center gap-5 z-10 relative">
        <div className="absolute top-0 left-0 ml-[10vw] w-[80vw] h-[calc(100%+4rem)] translate-y-[-2rem] bg-[#eeeeee] -z-10 rounded-2xl shadow-[0_0_8px_8px_rgba(200,200,200,0.05)]" />

        {/* Top half */}
        <div className="max-w-4xl w-[90vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-2">
          {/* Date and Tags */}
          <div className="flex gap-3 text-[#777777]">
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

          {/* Title and author */}
          <motion.h1
            layout="position"
            layoutId={slug}
            className="text-3xl md:text-4xl xl:text-5xl font-manrope font-normal text-slate-600"
          >
            {title}
          </motion.h1>
          <span className="font-light text-lg">
            written by {"Sean Collan Fong"}
          </span>
        </div>

        {/* Middle */}
        <div className="max-w-5xl w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col md:flex-row md:flex-[1_0] gap-5">
          {/* Featured Image */}
          <div className="flex justify-center basis-[70%]">
            <div className="aspect-square w-full max-w-2xl h-full rounded-xl relative">
              <motion.img
                src={imageUrl}
                alt={title ?? "Featured Image"}
                className="h-full w-full object-cover rounded-lg"
                width={1024}
                height={1024}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.8, ease: "easeOut" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                layoutId="hoverImage"
              />
            </div>
          </div>

          {/* Description */}
          <div className="font-light text-gray-600 basis-[30%] leading-6 italic text-sm lg:leading-7 lg:text-base">
            <p>{description}</p>
          </div>
        </div>

        {/* Section separator */}
        {/* <div className="h-[1px] w-[80vw] md:w-[30vw] max-w-3xl bg-black self-center mb-5" /> */}

        {/* Bottom half */}
        {/* Content */}
        <div className="max-w-3xl w-[90vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-2 text-base leading-8 lg:text-lg lg:leading-9 font-light mb-10">
          <PortableText value={content} components={ptComponents} />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const postQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

  const paths = await client.fetch(postQuery);

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { slug = " " } = context.params;
  const query = `*[_type == 'post' && slug.current == $slug][0] {
		title, description, content, tags, datePosted, featuredImage, _id
	}`;

  const post = await client.fetch(query, { slug });

  return {
    props: { post, slug },
  };
};

export default PostDetails;
