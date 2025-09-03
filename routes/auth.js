import { Router } from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";


const router = Router();

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const hashpassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, username, password: hashpassword });
    await user.save();
    return res.status(201).json({ message: "Signup Successfull" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please Sign up First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password Is Not Correct" });
    }

    const { password: _password, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;

