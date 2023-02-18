import React from "react";
import PostCard from "./PostCard";
import IPost from "./types/PostInterface";

type Props = {
  posts: Array<IPost>;
  isLargeScreen: boolean;
};

const PostList = ({ posts, isLargeScreen }: Props) => {
  const sampleData = [
    {
      title: "Embarking on a journey - the process of creating the bulletin",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named ",
      tags: ["webdev", "portfolio"],
      datePosted: "2023-01-26",
    },
    {
      title:
        "How I used Framer Motion to animate a collapsible list stack component",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
      tags: ["webdev"],
      datePosted: "2023-01-26",
    },
    {
      title: "Another test header right here.",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam volupt",
      tags: ["webdev", "portfolio"],
      datePosted: "2023-01-26",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Post Card Content */}
      <div className="w-full h-full flex flex-col gap-[15rem] items-center px-8 sm:px-16 lg:px-0 max-w-xl lg:max-w-5xl">
        {posts.map((post, index) => {
          return (
            <div key={index} className="w-full min-h-[40rem]">
              <PostCard post={post} isLargeScreen={isLargeScreen} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
