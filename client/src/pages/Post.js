import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/posts");

      if (response.status === 500) {
        console.log("server error");
      }

      setPosts(response.data.data.posts);
    } catch (err) {
      console.log(err);
    }
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
