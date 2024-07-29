import bcrypt from "bcrypt";
import User from "../models/userModel";

export const userRegister = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "A user with this email already exists!",
      });
    }
    //hashing password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error("Error while hashing password :", err);
        return res
          .status(500)
          .send({ success: false, message: "Error while hashing password." });
      }
      //creating new user
      const user = await User.create({ email: email, password: hash });
      return res.status(200).json({
        success: true,
        message: "User registered successfully!",
      });
    });
  } catch (error) {
    console.error("Error while registering user.");
    return res
      .status(500)
      .json({ success: false, message: "Error while registering user." });
  }
};

export const userLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    //finding the user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this email." });
    }
    //comparing the passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error while comparing password :", err);
        return res
          .status(500)
          .json({ success: false, message: "Error while comparing password." });
      }
      return !result
        ? res.status(404).json({ success: false, message: "Wrong password." })
        : res.status(200).json({ success: true, message: "Login successfull" });
    });
  } catch (error) {
    console.error("Error while validating user login.");
    return res
      .status(500)
      .json({ success: false, message: "Error while validating user login." });
  }
};
