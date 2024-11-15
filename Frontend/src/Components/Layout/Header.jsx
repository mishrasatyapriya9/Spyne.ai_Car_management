import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import icon from "../../assets/carmanage LOg.jpeg";
import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        // Adjust the value as needed
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={isSticky ? "sticky" : ""}>
      <Navbar
        expand="lg"
        className="bg-body-tertiary background navbar"
        bg="primary"
        varient="dark"
      >
        <Container fluid>
          <img src={icon} alt="" className="icon" />
          <Navbar.Brand>
            <Link to="/" style={{ color: "black" }}>
              Car Galary
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="d-flex justify-content-between w-100">
              <div>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/" style={{ color: "black" }}>
                    Home
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/Mycars" style={{ color: "black" }}>
                      My Cars
                    </Link>
                  </Nav.Link>
                  <NavDropdown title="Satya priya" id="navbarScrollingDropdown" >
                    <NavDropdown.Item href="#action3">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.clear("userinfo");
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Contact me
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
                </Nav>
              </div>
              <div>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="danger">Search</Button>
                </Form>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

{
  /* <div
      className="bg-transparent text-lg bg-center text-center"
      style={{ position: "absolute", fontSize: "30px" }}
    >
      <h1> header</h1>
    </div> */
}
