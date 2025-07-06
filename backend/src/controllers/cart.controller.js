import User from '../models/user.model.js'

//update user cartData
export const updateCart = async (req,res)=>{
    try {
        const {userId,cartItems} = req.body 
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}