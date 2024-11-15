import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import Layout from "../../Components/Layout/Layout";
import "./CreateCarForm.css";

const CreateCarForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carType, setCarType] = useState("");
  const [company, setCompany] = useState("");
  const [dealer, setDealer] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (files) => {
    if (files.length > 10) {
      return toast.error("Maximum 10 images allowed");
    }
    console.log(files);
    setLoading(true);
    const uploadedImages = [];

    for (const file of files) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "notezipper");
        formData.append("cloud_name", "satyapriya");

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_CLODINARY}`,
            formData
          );
          uploadedImages.push(data.url);
        } catch (error) {
          toast.error("Error uploading images");
          console.error(error);
        }
      } else {
        toast.error("Please select JPEG or PNG images only");
      }
    }

    setImages(uploadedImages);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const carData = {
      title,
      description,
      tags: { carType, company, dealer },
      images,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDDOMAIN}/cars/Addcar`,
        carData
      );
      if (response.data.success) {
        toast.success("Car created successfully!");
        setTitle("");
        setDescription("");
        setCarType("");
        setCompany("");
        setDealer("");
        setImages([]);
        navigate("/Mycars")
      } else {
        toast.error("Failed to create car");
      }
    } catch (error) {
      toast.error("Error creating car");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="formContainer">
        <h1>Create New Car</h1>
        {loading && <p>Loading images...</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter car title"
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter car description"
              required
            />
          </Form.Group>
          <Form.Group controlId="carType">
            <Form.Label>Car Type</Form.Label>
            <Form.Control
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              placeholder="Enter car type"
              required
            />
          </Form.Group>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter car company"
              required
            />
          </Form.Group>
          <Form.Group controlId="dealer">
            <Form.Label>Dealer</Form.Label>
            <Form.Control
              type="text"
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              placeholder="Enter dealer name"
              required
            />
          </Form.Group>
          <Form.Group controlId="images">
            <Form.Label>Images (Max 10)</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              accept=".jpg,.jpeg,.png"
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateCarForm;
