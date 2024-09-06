import mongoose from "mongoose";
import { IPost } from "./post.type";

const postSchema = new mongoose.Schema({
    postId: { type: Number, required: true },
    postTitle: { type: String, required: true },
    postBody: { type: String, required: true },
    tags: [ String ],
    reactions: { String },
    
    // createdAt: { type: Date, default: Date.now },
});



const postDatabase = mongoose.model<IPost>('post',postSchema);

export { postDatabase};