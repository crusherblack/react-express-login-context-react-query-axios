import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const NestedAPI = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/users");
      const users = await response.json();

      const responsePosts = await fetch("http://localhost:5000/api/v1/posts");
      const posts = await responsePosts.json();

      if (!responsePosts.ok) {
        console.log("server error");
        console.log("error message", posts.error.message);
        setError(true);
      }

      setUsers(users.data.users);
      setPosts(posts.data.posts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("state users", users);

  const loadingData = loading || users.length === 0 || posts.length === 0;

  return (
    <>
      <Navbar />
      {error ? (
        <h1>Server lagi gangguan sabar cuy</h1>
      ) : loadingData ? (
        <div className="d-flex justify-content-center align-items-center">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">List Users</h1>
              {JSON.stringify(posts)}
            </div>
            <div className="card-body">
              <ul className="list-group">
                {users.map((user) => (
                  <li className="list-group-item" key={user.id}>
                    <h4>Name: {user.name}</h4>
                    <h4 className="text-secondary">Email: {user.email}</h4>
                    {user.skills.length > 0 &&
                      user.skills.map((skill) => {
                        return (
                          skill && (
                            <h6 key={skill.id}>
                              {skill.id} | {skill.name}
                            </h6>
                          )
                        );
                      })}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NestedAPI;
