import Car from "../Models/CarModel.js";

//add new car with all details
export const Addcar = async (req, res) => {
    try {
      const car = new Car(req.body);
      await car.save();
      res.json({ success: true, car });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error saving car data", error });
    }
}
// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({ success: true, cars });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cars", error });
  }
};

// Search cars by keyword in title, description, or tags
export const searchCars = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const cars = await Car.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { carType: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { dealer: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json({ success: true, cars });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error searching cars", error });
  }
};

// Get a car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });
    res.json({ success: true, car });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching car details", error });
  }
};

// Update a car
export const updateCar = async (req, res) => {
  try {
    console.log(req.params.id);
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });
    res.json({ success: true, car });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating car", error });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting car", error });
  }
};