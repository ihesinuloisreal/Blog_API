import { Request, Response } from "express";
import { createPost, fetchAllPost, fetchByPostId } from "../model/post.model";

export async function httpGetBlog(req:Request, res:Response){
    // Send a response to the client
    // res.send('Hello, World!');
    try {
        const response = await fetchAllPost();
        return res.status(200).json(response)
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

export async function httpGetById(req:Request, res:Response){
    const id = req.params.id;
    try {
        const post = fetchByPostId(id);
        if (!post) {
            return new Error("No post matching the id provided");
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        return error;
    }
}

export async function httpPostBlog(req:Request, res:Response){
    const data = req.body;
    // console.log(data);

    if (!data.postTitle && !data.postBody) {
        console.log("Please valid data")
        return 
    }
    const response = await createPost(data);
    return res.status(201).json(response);

}
