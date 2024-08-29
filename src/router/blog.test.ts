import { describe } from "node:test";
import request from "supertest"
import app from "../app";
import { mongoConnect, mongoDisconnect } from "../services/mongo";

describe('Blog Http verbs test', ()=>{
    beforeAll(async ()=>{
        await mongoConnect();
    });
    afterAll(async()=>{
        await mongoDisconnect()
    })
    describe("Get all blog post", () => {
        test("Get all blog post with success response of 200", async() => {
            const response = await request(app)
            .get('/blog')
            .expect(200)
        })
    });

    describe("Get a single blog post", async () => {
        test("Get a single blog post with id with success response of 200", async () => {
            const response = await request(app)
            .get('/blog/:id')
            .expect(200)
        })
    })
    describe("Create a blog post", async () => {
        const Post = {
            postId: "112",
            postTitle: "hello",
            postBody: "hi",
            tags: "sef",
            reactions: "ere"
            
        }
        test("Create a blog post with success response of 201", async () => {
            const response = await request(app)
            .post('/blog')
            .send(Post)
            .expect(201)
        })
    })
} )