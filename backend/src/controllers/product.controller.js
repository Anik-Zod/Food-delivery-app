 import {v2 as cloudinary} from 'cloudinary' 
import Product from '../models/product.model.js';
  
  //add product
  export const addProduct = async (req, res) => {
    try {
        //parse data into json format
        const productData = JSON.parse(req.body.productData);
       if(!productData.name || !productData.price || !productData.category || !productData.description) {
            return res.json({success:false,message:"Please fill all fields"})
        }
        // get uploaded files
        const images = req.files;
        
        //craete a array of image links
        const imageUrls = [];
        //upload in cloudinary and populate imageUrls array to store in db
        for(const file of images){
            const result = await cloudinary.uploader.upload(file.path,{resource_type:'image'})
            imageUrls.push(result.secure_url);
        }
        //create the product in db
        await Product.create({...productData,image:imageUrls})
        console.log('BODY:', req.body);
        console.log('FILES:', req.files);
        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
  }

  //get all product 
  export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }

  // get single product 
  export const productById = async (req, res) => {
    try {
        const {id} = req.body;
        const product = await Product.findById(id)
      res.json({success:true,product})
    } catch (error) {
        res.json({succes:false,message:error.message})
    }
  }

  //change product stock
  export const changeStock = async (req, res) => {
    try {
        const {id,inStock} = req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true,message:"Stock Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
  }

