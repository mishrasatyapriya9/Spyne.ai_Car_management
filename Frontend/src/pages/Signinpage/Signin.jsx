import Backgroundformts from "../../Components/background/Backgroundformts";
import Layout from "../../Components/Layout/Layout";
import "./Signin.css";
import Signinform from "./Signinform";
const Signin = () => {
  return (
    <div>
      <Layout>
        <div className=" inset-0 z-0" style={{ position: "relative" }}>
          <Backgroundformts />
            <Signinform />
        </div>
      </Layout>
    </div>
  );
};

export default Signin;
