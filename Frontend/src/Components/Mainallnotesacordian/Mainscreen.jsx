import Container from "react-bootstrap/esm/Container";
import "./Mainscreen.css";
import Row from "react-bootstrap/Row";
import "./Mainscreen.css"
const Mainscreen = ({ title, children }) => {
  return (
      <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <div>
                <h1 className="heading">{title} </h1>
                <hr />
              </div>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Mainscreen;
