import Express from "express";
const router = Express.Router();
import {
  Addcar,
  getAllCars,
  searchCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../Controller/Carcontroller.js";


router.post("/Addcar", Addcar);
router.get("/Allcars", getAllCars);
router.get("/Getcars/search", searchCars);
router.get("/Getcar/:id", getCarById);
router.put("/Updatecar/:id", updateCar);
router.delete("/Deletecar/:id", deleteCar);

export default router;
