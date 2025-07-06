import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//register user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(201).json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    next(error); // Pass to error-handling middleware
  }
};

//login user
export const login = async (req, res) => {
  try {
        // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'Request body is missing' });
    }
    const { email, password } = req.body;
    if (!email || !password)
      res.json({
        success: false,
        message: "email and password both are required",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "wrong credentials" });

    const istrue = await bcrypt.compare(password, user.password);
    if (!istrue)
      return res.json({ success: false, message: "wrong credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ success: true, user:{name:user.name,email:user.email}});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//check Auth 
export const isAuth =async(req,res)=>{
    try {
        const {userId} = req.body
        const user = await User.findById(userId).select('-password')
        return res.json({success:true,user})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//logout
export const logout = async(req,res)=>{
    try {
        res.cookie("token","",{maxAge:0},)
        res.status(200).json({message:"Logout successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
