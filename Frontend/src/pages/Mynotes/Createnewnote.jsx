import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import "./Createnewnote.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Createnewnote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title, content, category);
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    console.log(userInfo.data.accessToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.data.accessToken}`,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/notes/createnote",
        {
          title: title,
          content: content,
          category: category,
        },
        config
      );
      console.log("innside the fucntion");
      console.log(res.data);
      if (res.data.success) {
        toast.success("Note created successfully");
        navigate("/Mynotespage");
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="formconatiner">
        <div>
          <h1>Create New Note</h1>
        </div>
        <div className="box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {/* Disable button when submitting */}
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Createnewnote;
