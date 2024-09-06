import { Request, Response } from "express";
import { createPost, fetchAllPost, fetchByPostId, updatePost, deletePost } from "../model/post.model";

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
        const postDetails = await fetchByPostId(id);
        if (postDetails == false) {
            return res.status(400).json("No record found");
        } else {
            return res.status(200).json(postDetails);
        }
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

export async function httpUpdatePostBlog(req:Request, res:Response) {
    const id = req.params.id;
    const data = req.body;
    try {
        const postDetails = await fetchByPostId(id);
        if(!postDetails){
            return "No record found"
        } else {
            const response = await updatePost(data, id);
            return res.status(201).json(response)
        }
    } catch (error) {
        
    }

}

export async function httpDeletePost(req:Request, res:Response) {
    const id = req.params.id;
    try {
        const postDetails = await deletePost(id);
        if (postDetails == true) {
            return res.status(200).json("Record deleted successfully");
        } else {
            return res.status(200).json("No record found");
        }
    } catch (error) {

        console.error("Error while trying fetching post by ID:", error);
        return error;
    }
}