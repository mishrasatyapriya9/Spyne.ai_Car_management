import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Carousel, Spinner, Alert, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import "./CarDisplay.css"; // Add custom styling if needed

const CarDisplay = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to car detail page

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKENDDOMAIN}/cars/Allcars`
        );
        setCars(data.cars);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cars");
        console.error(err);
        toast.error("Error fetching cars");
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleAddCarClick = () => {
    navigate("/addcar"); // Navigate to the add car page
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <Layout>
        <div className="car-display-container">
          <Link to={"/addcar"}>
            <Button
              className=""
              variant="primary"
            >
              Add new Car
            </Button>
          </Link>

          {/* Check if no cars are found */}
          {cars.length === 0 ? (
            <Alert variant="info">
              No cars added yet. <strong>Add a new car.</strong>
            </Alert>
          ) : (
            cars.map((car) => (
              <Card
                key={car._id}
                className="car-card"
                onClick={() => navigate(`/car/${car._id}`)} // Navigate to car detail page
              >
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
                <Card.Body>
                  <Card.Title>{car.title}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {car.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type:</strong> {car.tags.carType}
                  </Card.Text>
                  <Card.Text>
                    <strong>Company:</strong> {car.tags.company}
                  </Card.Text>
                  <Card.Text>
                    <strong>Dealer:</strong> {car.tags.dealer}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CarDisplay;
