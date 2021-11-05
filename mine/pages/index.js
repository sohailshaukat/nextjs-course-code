import React from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-util";

function HomePage(props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.featuredPosts} />
    </>
  );
}

export default HomePage;

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { featuredPosts },
    revalidate: 1800,
  };
}
