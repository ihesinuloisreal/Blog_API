import axios from "axios";
import {postDatabase} from "./post.mongo"
import { IPost } from "./post.type";
import { UpdateQuery } from "mongoose";

async function fetchDummyData() {
    const response = await axios.get('https://dummyjson.com/posts');

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }

    const dummyDatas = response.data.posts;
    for (const dummyData of dummyDatas){
        const postData = {
            postId: dummyData["id"],
            postTitle: dummyData["title"],
            postBody: dummyData["body"],
            tags: dummyData["tags"],
            reactions: dummyData["reactions"],
        }
        await savePost(postData)
    }

}

async function savePost(postData: Partial<IPost> | UpdateQuery<IPost>) {
    await postDatabase.findOneAndUpdate(
        {
            postId: postData.postId,
        },postData,{
            upsert: true,
        }
    )
    // const data = await fetchDummyData()
    // console.log(postData)
}

async function loadDummyData() {
    const initialPost = await postDatabase.findOne({
        postId: 17,
        postTitle: 'She was in a hurry.',
    });
    if(initialPost){
        console.log("DAta already loaded")
    } else {
        await fetchDummyData()
    }
}

async function fetchAllPost() {
    try {
        const posts = await postDatabase.find();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
async function fetchByPostId(id:string) {
    try {
        const post = await postDatabase.findById(id);
        if (post) {
            console.log("Post found:", post);
            // return post;
        } else {
            console.log("Post not found");
        }
    } catch (error) {
        console.error("Error fetching post by ID:", error);
    }
}

async function createPost(postData: Partial<IPost> | UpdateQuery<IPost>) {
    try {
        if(!postData){
            console.log("Please enter required field")
        } else {
            const latestNumber = await getLatestNumber();
            const newNumber = Number(latestNumber.postId) + 1
            const Data = {
                postId: newNumber,
                postTitle: postData.postTitle,
                postBody: postData.postBody,
                tags: postData.tags,
                reactions: postData.reactions,
            }
            console.log(Data);
            // await savePost(Data);
            // return Data;
        }
    } catch (error) {
        
    }
}
async function getLatestNumber(): Promise<any> {
    try {
        return await postDatabase.findOne().sort('-postId');
      
    } catch (error) {
      console.error("Error fetching the latest number:", error);
      throw error;
    }
  }

export { loadDummyData, fetchAllPost, fetchByPostId, createPost}