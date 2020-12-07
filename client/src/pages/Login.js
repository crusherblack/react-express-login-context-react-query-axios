import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";

const Login = () => {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "validemail3@gmail.com",
    password: "12435678",
  });

  const { email, password } = formData;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ email, password });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h1 className="text-center">Silahkan Login</h1>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Input Email"
                className="form-control"
                value={email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Input Password"
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                LOGIN
              </button>
            </div>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Login;
