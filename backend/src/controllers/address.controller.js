import Address from "../models/address.model.js";

//add address
export const addAddress = async (req, res) => {
  try {
    const { userId, ...addressData } = req.body; // destructure userId, rest is address
    await Address.create({ ...addressData, userId });

    res.json({ success: true, message: "Address Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get address by id :
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const addresses = await Address.find({ userId:userId });
    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
