import toast from "react-hot-toast";
// demo use == toast.success("Register sucessfull");
// import profilepic from "../../assets/defaultProfilePicture.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Register.css";
import Loader from "../../Components/Loaders/Loadingex";

const Registerform = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("userinfo");
    if (data) {
      navigate("/");
    }
  }, [navigate]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (password != confirmpassword) {
      toast.error("passwords donot match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKENDDOMAIN}/users/Register`,
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        setLoading(false);
        localStorage.setItem("userinfo", JSON.stringify(res));
        //`${process.env.REACT_APP_API}/api/v1/auth/Register`,
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Something went wrong in handling the submiting the register data"
        );
      }
    }
  };

  // const TargetSignin = () => {
  //   navigate("/Signin");
  // };

  const postDetails = async (pics) => {
    if (!pics) {
      return setPicMessage("Please select the Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "satyapriya");
      await fetch("https://api.cloudinary.com/v1_1/satyapriya/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPicMessage(
        "Please select a image or check image must be jpeg or png type"
      );
    }
  };
  // console.log(process.env.REACT_APP_API);
  return (
    <div className="registerform">
      {/* <div className="register"> */}
      {loading && <Loader />}
      <div>
        <section
          className="vh-100 register"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container-sm h-70">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 15 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>
                        <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="flex-fill mb-0">
                              <input
                                value={name} //binding usestate with our input fields
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="form3Example1c"
                                className="form-control form-control-lg"
                                placeholder="Your Name"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div className=" flex-fill mb-0">
                              {/* we  delete the form-outline from above clssname otherwise the border is not showing in the form */}
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                placeholder="Your Email"
                                aria-required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="flex-fill mb-0">
                              <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                placeholder="Password"
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw" />
                            <div className=" flex-fill mb-0">
                              {/* we  delete the form-outline from above clssname otherwise the border is not showing in the form */}
                              <input
                                value={confirmpassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                placeholder="Repeat your password"
                                required
                              />
                            </div>
                          </div>

                          {picMessage && toast.error(picMessage)}
                          <div className="row align-items-center py-3">
                            <div className="col-md-3 ps-5">
                              <h6 className="mb-0">Upload pic</h6>
                            </div>
                            <div className="col-md-9 pe-5">
                              <input
                                // value={pic}
                                onChange={(e) => postDetails(e.target.files[0])}
                                className="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                              />
                              <div className="small text-muted mt-2">
                                Upload your picture . Max file size 50 MB
                              </div>
                            </div>
                          </div>

                          {/* <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              defaultValue
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                            >
                              I agree all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div> */}

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              // type="button"
                              className="btn btn-primary btn-lg"
                            >
                              Register
                            </button>
                            <button
                              onClick={TargetSignin}
                              className="btn btn-primary btn-lg"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Registerform;
