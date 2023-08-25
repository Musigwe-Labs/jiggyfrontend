/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Gist from "./gist";
import GistLinks from "./gistLinks";
import HomeInfo from "./homeInfo";
import { PostType } from "./postType";

const Posts = ({ posts, onPostClick }) => {
  const [sortedPostsByTime, setSortedPostsByTime] = useState([]);
  useEffect(() => {
    let sortPosts = async () => {
      let sortedPosts = await posts.sort((post1, post2) => {
        let post1date = new Date(post1.created_at);
        let post2date = new Date(post2.created_at);

        return post1date > post2date ? -1 : post1date < post2date ? 1 : 0;
      });
      setSortedPostsByTime(sortedPosts);
    };
    sortPosts();
  }, [posts]);
  return (
    <div className="pb-[29px]">
      {sortedPostsByTime.map((post) => {
        let { id, post_type, user, content, created_at } = post;
        return (
          <div key={id} className="text-base mt-2">
            <div className="mx-4 md:mx-16 p-3 border-b border-y-[#4B5563]">
              <HomeInfo
                school={user.school}
                name={user.generated_username}
                created_at={created_at}
              />
              <PostType post_type={post_type} />
              <div onClick={() => onPostClick(post)}>
                <Gist content={content} />
              </div>
              <GistLinks post={post} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
