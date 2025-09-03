import { Router } from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs"


const router = Router();

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password)
    const user = new User({ email, username, password:hashpassword });
    await user.save().then(() => 
      res.status(200).json({ message: "Signup Successfull" })
    );
  } catch (error) {
    
    res.status(200).json({ message: "User Already Exists" });
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
   const user = await User.findOne({email: req.body.email });
   if (!user){
    res.status(200).json({ message: "Please Sign up First"  })
   };

  
 const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
   if (!isPasswordCorrect){
    res.status(200).json({ message: "Password Is Not Correct"  })
   }

   const { password , ...others } = user._doc;
   res.status(200).json({others });
   
  
   } catch (error) {
    console.error(error);
    res.status(200).json({ message: "User Already Exists" });
  }
});
export default router;

