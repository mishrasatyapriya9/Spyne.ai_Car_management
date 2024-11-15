import Usermodel from "../Models/Usermodel.js";
import { comparePassword, hashPassword } from "../Helper/AuthHelper.js";
import JWT from "jsonwebtoken";
import verifyUpdateAuth from "../Middleware/verifyUpdateAuth.js";
//@description     Register new user
//@route           POST http://localhost:8800/api/users/Register
//@access          Public
export const Registercontroller = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    //check name
    const existingname = await Usermodel.findOne({ name });
    //checking for previously existing users
    if (existingname) {
      return res.status(200).send({
        success: false,
        message:
          "This name is already used for  Registration , please Give a new name",
      });
    }

    //check User
    const existingUser = await Usermodel.findOne({ email });
    //checking for previously existing users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This Email is already used for  Registration , please login",
      });
    }
    //registering new User to our website
    //changing password to hashed password for more security with AUTHCONTROLLER
    const hashedPassword = await hashPassword(password);

    const user = await new Usermodel({
      name,
      email,
      password: hashedPassword,
      pic,
    }).save();

    res.status(200).send({
      success: true,
      message: "Registration successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Registration part",
      error,
    });
  }
};

//@description     Login the user
//@route           POST http://localhost:8800/api/users/Login
//@access          Public
export const Logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password,or fill the email or password",
      });
    }
    const user = await Usermodel.findOne({ email });
    !user && res.status(401).json("invalid email");

    //check the matching of password and hashedpassword
    const match = await comparePassword(password, user.password);
    !match && res.status(401).json("invalid password");

    //create token for that user
    const accessToken = await JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin }, //user._id,user.isAdmin comes from saved database
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const options = {
      httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
      secure: true,
      sameSite: "strict", // Cookie only sent in same-site requests
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 10000), // Cookie expiration time (7 days)
      secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options) //i written cookie to cookies
      .send({
        success: true,
        message: "Login successfull",
        user: {
          isAdmin: user.isAdmin,
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          // cookies: req.cookies?._accessToken,
        },
        accessToken,
      });
    console.log("Cookies: ", req.cookies);

    //This down code is written by yt video
    // const { password, ...info } = user._doc;
    // res.status(200).send({ ...info, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Login part!!",
      error,
    });
  }
};

// @desc    put user profile and update user profile
// @route   put http://localhost:8800/api/users/updateprofile/660c204981c4f256746b9974
// @access  Private
//@(POSTMAN) In the header in Postman key is : Authorization , Value :Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBjMjA0OTgxYzRmMjU2NzQ2Yjk5NzQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzEyMDc4NjI4LCJleHAiOjE3MTQ2NzA2Mjh9.dsqn1zuPWgqA0B0V-UcYyTFSLAj0WBxTqaLM0nxB_6w
export const Updateuserprofile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, pic } = req.body;

    // Validation
    if (!name && !email && !password) {
      return res
        .status(400)
        .send({ message: "At least one field is required for update" });
    }

    // Find user by ID
    const user = await Usermodel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update user fields if provided
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
      }
      if (pic) user.pic = pic;
    } else {
      res.status(403).json("you can update your account!!");
    }

    // Save updated user to database
    await user.save();

    res.status(200).send({
      success: true,
      message: "User information updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error IN updating user information",
      error: error.message,
    });
  }
};
