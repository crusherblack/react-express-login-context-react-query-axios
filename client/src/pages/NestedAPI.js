import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const NestedAPI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/v1/users");
    const users = await response.json();

    setUsers(users.data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("state users", users);

  return (
    <>
      <Navbar />
      {loading || !users.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">List Users</h1>
            </div>
            <div className="card-body">
              <ul class="list-group">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NestedAPI;
