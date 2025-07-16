import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import{ createError } from "../error.js";
import {v2 as cloudinary } from "cloudinary";


dotenv.config();
const  API_SECRET = process.env.API_SECRET
cloudinary.config({ 
    cloud_name: 'drgvrhzwu', 
    api_key: '279543161547265', 
    api_secret: API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const getAllPosts= async(req,res,next)=>{
    try{
        const posts = await Post.find({});
        return res.status(200).json({sucess: true, data:posts});
    }catch(error){
        next(createError(error.status,error?.response?.data?.error?.message || error.message))
    }
}


export const createPost = async (req,res,next) =>{try {
        const {name,prompt,photo}= req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,prompt,photo:photoUrl?.secure_url,
        });
        return res.status(201).json({sucess:true,data:newPost})
}  catch(error){
    next(createError(error.status,error?.response?.data?.error?.message || error.message))
}
}