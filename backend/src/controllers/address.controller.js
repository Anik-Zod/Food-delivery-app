import Address from "../models/address.model.js";

//add address 
export const addAddress = async (req, res) => {
    try {
        const {address,userId} = req.body;
        await Address.create({...address,userId});
        res.json({success:true,message:"Address Added Successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//get address : 
export const getAddress = async (req, res)=>{
    try {
        const {userId} = req.body
        const address = await Address.find({userId})
        res.json({success:true,address})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}