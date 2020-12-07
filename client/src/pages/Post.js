import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Post = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/api/v1/posts");
    const posts = await response.json();

    setPosts(posts.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("state posts", posts);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">List Posts</h1>
          </div>
          <div className="card-body">
            {posts.map((post) => (
              <h1 key={post.id}>{post.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
