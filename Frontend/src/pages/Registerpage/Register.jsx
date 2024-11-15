import Layout from "../../Components/Layout/Layout";
import "./Register.css";
import Backgroundformts from "../../Components/background/ParticlesBackground";
import Registerform from "./Registerform";
const Register = () => {
  return (
    <div>
      <Layout>
        <div className=" inset-0 z-0" style={{ position: "relative" }}>
          <Backgroundformts />
          <Registerform />
        </div>
      </Layout>
    </div>
  );
};

export default Register;
