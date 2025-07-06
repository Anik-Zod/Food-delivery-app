import jwt from "jsonwebtoken";

// login : seller
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const sellertoken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", sellertoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json({
        success: true,
        message: "Seller logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// check seller auth
export const isSellerAuth =async(req,res)=>{
    try {
        return res.json({success:true})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

// logout seller
export const sellerLogout = async (req, res) => {
  try {
    res.cookie("sellerToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Seller logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}