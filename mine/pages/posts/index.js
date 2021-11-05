import React from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

function AllPostsPage(props) {
  return <AllPosts posts={props.allPosts} />;
}

export default AllPostsPage;

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
    revalidate: 1800,
  };
}
