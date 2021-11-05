import React from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/post-util";

function PostDetailPage(props) {
  return <PostContent post={props.postData} />;
}

export default PostDetailPage;

export function getStaticPaths(){
  const postFiles = getPostsFiles(); 

  const slugs = postFiles.map(filename => filename.replace(/\.md$/,""));

  return {
    paths: slugs.map(slug => ({params: {slug:slug}})),
    fallback: true,
  }
}

export function getStaticProps(context) {

  const { params } = context;
  const {slug} = params;
  const postData = getPostData(slug);

  return {
    props: {
      postData
    },
    revalidate: 600
  }
}