export interface IPost extends Document {
    postId: number,
    postTitle: string,
    postBody: string,
    tags: string,
    reactions: string,
}