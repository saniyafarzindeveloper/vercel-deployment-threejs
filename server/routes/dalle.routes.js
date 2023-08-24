import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//creating routes
const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, //from .env 
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({message : "Hello from DALL-E ROUTER"})
});

//frontend, backend interaction
router.route('/').post(async(req, res) => {
    try {
        const {prompt} = req.body; //getting the promptmfrom the frontend 
        const response = await openai.createImage({
            prompt,
            n: 1, //no of images
            size: '1024x1024',
            response_format: 'b64_json'
        });

        //getting the image from the response
        const image = response.data.data[0].b64_json;
        //passing image to the frontend
        res.status(200).json({photo : image});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Sorry! Something went wrong"});
    }
})

export default router;