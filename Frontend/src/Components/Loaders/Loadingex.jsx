import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Loadingex() {
  return (
    <>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>{" "} */}
      <Button variant="primary" disabled style={{marginLeft:"340px",marginTop:"10px"}}>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </>
  );
}

export default Loadingex;
