import jwt from 'jsonwebtoken';

export const authSeller = (req,res,next)=>{
   try {
       const {sellerToken} = req.cookies;
       if(!sellerToken) return res.status(401).json({message:"Unauthorized"});

       const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET);
       if(decodedToken.email == process.env.SELLER_EMAIL){
            console.log("Seller Authenticated");
           next();
       }else{
           return res.status(401).json({message:"Unauthorized"});
       }
    
   } catch (error) {
       console.error(error);
       return res.status(500).json({message:error});
   }
}

export default authSeller;
