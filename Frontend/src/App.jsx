import "./App.css";
import Homepage from "./pages/Homepage";
import Signin from "./pages/Signinpage/Signin";
import Register from "./pages/Registerpage/Register";
import Layout from "./Components/Layout/Layout";
import Landingpage from "./pages/Landingpage/Landingpage";
import Mynotespage from "./pages/Mynotes/Mynotespage";
import Mycarspage from "./pages/Cars/Mycarspage";
import { Routes, Route } from "react-router-dom";
import Createnewnote from "./pages/Mynotes/Createnewnote";
import Backgroundformts from "./Components/background/Backgroundformts";
import { Toaster } from "react-hot-toast";
import Signinform from "./pages/Signinpage/Signinform";
import CarForm from "./pages/Cars/CarForm";
import CardetailsPage from "./pages/Cars/CardetailsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signinform" element={<Signinform />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Homepage" element={<Homepage />} />
        {/* <Route path="/Mynotespage" element={<Mynotespage />} /> */}
        <Route path="/Addcar" element={<CarForm />} />
        <Route path="/Mycars" element={<Mycarspage />} />
        <Route path="/car/:id" element={<CardetailsPage />} />
        <Route path="/Createnewnote" element={<Createnewnote />} />
        <Route path="/Backgroundformts" element={<Backgroundformts />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
