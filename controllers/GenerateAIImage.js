import * as dotenv from "dotenv";
 import { createError } from "../error.js";

import axios from "axios";
dotenv.config();

 

 
 const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Query Unsplash API
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: prompt,
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Extract the first image URL
    const images = response.data.results;
    if (images.length === 0) {
      throw createError(404, 'No images found for the given prompt.');
    }

    const imageUrl = images[0].urls.regular;

    // Send the image URL in the response
    return res.status(200).json({ photo: imageUrl });
  } catch (error) {
    next(createError(error.response?.status || 500, error.response?.data?.errors || error.message));
  }
};