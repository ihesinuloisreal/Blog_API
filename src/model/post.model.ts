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
            
            postId: Number(dummyData["id"]),
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
async function update(postData: Partial<IPost> | UpdateQuery<IPost>) {
    await postDatabase.findOneAndUpdate(
        {
            postId: postData.postId
        },{ 
            $set: postData 
        },{
            new: true
        }
    )
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
async function fetchByPostId(postId :string) {
    const query = { postId: postId };
    const options = {_id: 0, __v:0};
    
    try {
        const post = await postDatabase.findOne(query, options );
        if (post) {
            return post;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching post by ID:", error);
    }
}

async function fetchByTag(tag:string){
    return await postDatabase.find(
        {
            tags: tag
        },{
            _id: 0, __v:0
        }
    )
}

async function createPost(postData: Partial<IPost> | UpdateQuery<IPost>) {
    try {
        if(!postData){
            console.log("Please enter required field")
        } else {
            const latestNumber = await getLatestNumber();
            const newNumber = Number(latestNumber) + 1
            const Data = {
                postId: newNumber,
                postTitle: postData.postTitle,
                postBody: postData.postBody,
                tags: postData.tags,
                reactions: postData.reactions,
            }
            console.log(newNumber);
            const result = await savePost(Data);
            return result;
            // return Data;
        }
    } catch (error) {
        
    }
}
async function getLatestNumber(): Promise<any> {
    try {
        const latestNumber = await postDatabase.findOne().sort('-postId');

        return latestNumber?.postId;
      
    } catch (error) {
      console.error("Error fetching the latest number:", error);
      throw error;
    }
}

async function updatePost(postData: Partial<IPost> | UpdateQuery<IPost>, postId: string){
    try {
        const Data = {
            postId: postId,
            postTitle: postData.postTitle,
            postBody: postData.postBody,
            // tags: postData.tags,
            // reactions: postData.reactions,
        }
        const response = await update(Data);
        return response;
    } catch (error) {
        console.error(error)
    }
}

async function deletePost(postId: string){
    const result = await postDatabase.deleteOne({postId:postId});
    if (result.deletedCount > 0) {
        return true;
    } else {
        return false;
    }
}

export { loadDummyData, fetchAllPost, fetchByPostId, createPost, updatePost, deletePost, fetchByTag}