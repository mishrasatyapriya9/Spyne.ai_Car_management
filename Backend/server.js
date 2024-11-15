import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import notes from "../Backend/data/notes.js";
import Noteroute from "../Backend/Routes/Noteroute.js";
import Authroute from "../Backend/Routes/Authroutes.js";
import Carroute   from "../Backend/Routes/Carroute.js"
import cookieParser from "cookie-parser";
dotenv.config();
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // If you are using cookies or sessions
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  //we can take data from the urls
// app.use(express.static("public"));  //for taking files or photos  
app.use(cookieParser());
// app.use(express.static); 
//now we can send json data in req and res
app.use(morgan("dev"));

// app.use("/api/auth/", AuthRoute);
// app.use("/api/users/", UserRoute);
// app.use("/api/notes", (req, res) => {

//     res.send(notes);
// })
// app.use("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.json(note);
// });
app.use("/api/notes", Noteroute);
app.use("/api/users", Authroute);
app.use("/api/cars", Carroute);

//databse config
connectDB();

const PORT = process.env.PORT || 8800;
const MODE = process.env.DEV_MODE;
app.listen(PORT, () => {
  console.log(
    `Server  is running in ${MODE} MODE IN port no ${PORT}`.bgCyan.black
  );
  // app.on("error", (error) => {
  //   console.error("EROR IS: ", error);
  //   throw error
  // })
});
