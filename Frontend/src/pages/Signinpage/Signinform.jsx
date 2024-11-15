import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Signin.css";
import Loadingex from "./../../Components/Loaders/Loadingex";
const Signinform = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userinfo = localStorage.getItem("userinfo");
  //   if (userinfo) {
  //     navigate("/Mynotespage");
  //   }
  // }, [navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Enter email and password!!");
      }
      else {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const res = await axios.post(
          `http://localhost:8800/api/users/Login`,
          {
            email,
            password,
            //password:hashedpassword,
          },
          config
        );
        setLoading(false);
        console.log(res);
        localStorage.setItem("userinfo", JSON.stringify(res));
        //`${process.env.REACT_APP_API}/api/v1/auth/Register`,
        if (res.data.success) {
          toast("Login successfull");
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in handling login form");
    }
  };
  return (
    <div className="signinform">
      {loading && <Loadingex />}

      <div className="Login">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form onSubmit={handleLogin}>
                  {/* Email input */}
                  <div className=" mb-4">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="form1Example13"
                      className="form-control "
                      placeholder="Email"
                    />
                    {/* <label className="form-label" htmlFor="form1Example13">
                      Email address
                    </label> */}
                  </div>
                  {/* Password input */}
                  <div className=" mb-4">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                    {/* <label className="form-label" htmlFor="form1Example23">
                      Password
                    </label> */}
                  </div>
                  <div className="d-flex justify-content-around align-items-center mb-4">
                    {/* Checkbox */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="form1Example3"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    <a href="#!">Forgot password?</a>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Sign in
                  </button>
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted">
                      OR
                    </p>
                  </div>
                  <Link
                    className="btn btn-primary btn-lg btn-block "
                    style={{ backgroundColor: "#3b5998" }}
                    to="/register"
                    role="button"
                  >Register</Link>
                  <a
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#3b5998" }}
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-facebook-f me-2" />
                    <link rel="stylesheet" />
                    Continue with Facebook
                  </a>
                  {/* <a
                    className="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#55acee" }}
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-twitter me-2" />
                    Continue with Twitter
                  </a> */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signinform;
