import { useState } from "react";
import Navbar from "../components/Navbar";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

//https://github.com/crusherblack/Login-and-cart-context-api-dumbways-batch-18/blob/integrasi-backend/src/pages/CrudReactQuery.js

const Post = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    videoFile: "",
  });

  const { isLoading, error, data, refetch } = useQuery(
    "postsData",
    async () => {
      const response = await fetch("http://localhost:5000/api/v1/posts");
      return await response.json();
    }
  );

  const { title, description, content, thumbnail, videoFile } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    storePosts();
  };

  const [storePosts] = useMutation(async () => {
    const body = new FormData();
    body.append("title", title);
    body.append("description", description);
    body.append("content", content);
    body.append("thumbnail", thumbnail);
    body.append("videoFile", videoFile);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const response = await API.post("/post", body, config);
      const newPost = response.data.data.post;

      setFormData({
        title: "",
        description: "",
        content: "",
        thumbnail: "",
        videoFile: "",
      });

      refetch();
      return response;
    } catch (err) {
      console.log(err);
    }
  });

  const handleChange = (e) => {
    const updateForm = { ...formData };
    console.log(e.target.type);
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData(updateForm);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="card-header mt-3">
            <h1 className="text-center">List Posts</h1>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Input Title"
                  className="form-control"
                  value={title}
                  name="title"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Input description"
                  className="form-control"
                  value={description}
                  name="description"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Input content"
                  className="form-control"
                  name="content"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  placeholder="Input thumbnail"
                  className="form-control"
                  name="thumbnail"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  placeholder="Input videoFile"
                  className="form-control"
                  name="videoFile"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  SAVE POST
                </button>
              </div>
            </form>
            {data.data.posts.map((post) => (
              <h1 key={post.id}>{post.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
