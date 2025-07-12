import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import homeRouter from './routes/home.route.js';
import sellerRouter from './routes/seller.route.js';
import ConnectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import addressRouter from './routes/adress.route.js';
import orderRouter from './routes/order.route.js';

dotenv.config();

const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true,limit: '16kb' }));
app.use(cookieParser())
app.use(express.static('public'));
app.use(helmet());
app.use(compression())
app.use(morgan('dev'))
app.use(cors({
  origin:'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type','Authorization']
}))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max:1000,
  message: 'Too many requests, please try again later.'
}))


app.use('/api/user', homeRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)


//connect to mongodb
const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

const startServer = async()=>{

  
  await connectDB();
  await ConnectCloudinary();
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer()