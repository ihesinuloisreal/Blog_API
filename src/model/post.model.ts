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
    console.log(postData)
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
export { loadDummyData}