import express from 'express';
import * as dotenv from 'dotenv' ;
import initializeApp  from './src/initializeApp.js'
import path from 'path'
import mongoose from 'mongoose';

dotenv.config({path:path.resolve('./config/.env')})
const port = process.env.PORT||3000;
const app = express();
initializeApp (app,express)

// data base 
// const mongoose=require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/EgyGrow').then(()=>{
    console.log("connnected");
    
}).catch((err)=>{
    console.log("can not connect");
    
})

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});


