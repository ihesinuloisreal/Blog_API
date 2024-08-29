import { Request, Response } from "express";
import { fetchByPostId } from "../model/post.model";

export async function httpGetBlog(req:Request, res:Response){
    // Send a response to the client
    res.send('Hello, World!');
}

export async function httpGetById(req:Request, res:Response){
    const id = req.params.id;
    const post = fetchByPostId(id);
    if(!post){
        return new Error ("No post matching the id provided");
    }
    return res.status(200).json();
}

export async function httpPostBlog(req:Request, res:Response){
    const data = req.params;

    return res.status(201).json();

}
