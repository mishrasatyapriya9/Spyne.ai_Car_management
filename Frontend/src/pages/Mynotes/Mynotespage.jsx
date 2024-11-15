import "./Mynotespage.css";
import Layout from "../../Components/Layout/Layout.jsx";
import Mainscreen from "../../Components/Mainallnotesacordian/Mainscreen.jsx";
// import notes from "../../data/notes";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useState, useEffect } from "react";
const Mynotespage = () => {
  const [notes, setNotes] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(userInfo.data.accessToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${userInfo.data.accessToken}`,
    },
  };
  const fetchnote = async () => {
    const { data } = await axios.get(
      "http://localhost:8800/api/notes/getallnote",
      {
        headers: {
          Authorization: "Bearer " + `${userInfo.data.accessToken}`,
        },
      }
    );
    setNotes(data);
    console.log(data)
  };

  useEffect(() => {
    fetchnote();
  }, []);

  const [clicked, setClicked] = useState(false);
  const toggleacordian = (id) => {
    setClicked(clicked === id ? false : id);
  };
  const deleteHandler = (id) => {
    if (window.confirm("are you sure to delete this note ?")) {
      console.log("going to delete");
    }
  };
  return (
    <div>
      <Layout>
        <Mainscreen title="My Notes :-">
          <Link to="/Createnewnote">
            <Button className="" variant="primary">
              Add new Car
            </Button>
          </Link>
          {notes.map((note, index) => (
            <Card key={note.id || index}>
              <Card.Header
                className=""
                onClick={() => toggleacordian(note._id)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span className="" style={{ fontSize: "25px", flex: 1 }}>
                  {note.title}
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>

                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              {clicked === note._id && (
                <Card.Body>
                  <h4>
                    {" "}
                    <Badge className="category" bg="success">
                      Category is {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>

                    <footer className="blockquote-footer">
                      Created in -{" "}
                      <cite title="Source Title">
                        pass the date here from database{" "}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              )}
            </Card>
          ))}
        </Mainscreen>
      </Layout>
    </div>
  );
};

export default Mynotespage;
