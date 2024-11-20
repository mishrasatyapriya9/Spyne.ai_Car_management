import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button, Carousel, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import "./CarDetail.css";

const CarDetail = () => {
  const { id } = useParams(); // Get car ID from URL params
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKENDDOMAIN}/cars/Getcar/${id}`
        );
        setCar(data.car);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car details");
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKENDDOMAIN}/cars/Deletecar/${id}`
      );
      toast.success(data.message);
      navigate("/Mycars"); // Navigate to car listing after deletion
    } catch (err) {
      toast.error("Failed to delete car");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCarData = {
        ...car,
        title: e.target.title.value,
        description: e.target.description.value,
        tags: {
          carType: e.target.carType.value,
          company: e.target.company.value,
          dealer: e.target.dealer.value,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKENDDOMAIN}/cars/Updatecar/${id}`,
        updatedCarData
      );
      toast.success("Car updated successfully");
      setCar(data.car);
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating car");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Layout>
      <div className="car-detail-container">
        <h2>{car.title}</h2>
        <Carousel>
          {car.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 car-image"
                src={image}
                alt={`Car ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="car-details">
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control defaultValue={car.title} name="title" required />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={car.description}
                  name="description"
                  required
                />
              </Form.Group>
              <Form.Group controlId="carType">
                <Form.Label>Car Type</Form.Label>
                <Form.Control
                  defaultValue={car.tags.carType}
                  name="carType"
                  required
                />
              </Form.Group>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  defaultValue={car.tags.company}
                  name="company"
                  required
                />
              </Form.Group>
              <Form.Group controlId="dealer">
                <Form.Label>Dealer</Form.Label>
                <Form.Control
                  defaultValue={car.tags.dealer}
                  name="dealer"
                  required
                />
              </Form.Group>
              <Button type="submit">Save Changes</Button>
            </Form>
          ) : (
            <>
              <p>
                <strong>Description:</strong> {car.description}
              </p>
              <p>
                <strong>Type:</strong> {car.tags.carType}
              </p>
              <p>
                <strong>Company:</strong> {car.tags.company}
              </p>
              <p>
                <strong>Dealer:</strong> {car.tags.dealer}
              </p>
              <Button variant="primary" onClick={handleEditClick}>
                Edit Car
              </Button>
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete Car
              </Button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CarDetail;
