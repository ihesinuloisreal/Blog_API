import { describe } from "node:test";
import request from "supertest"
import app from "../app";

describe('Blog Http verbs test', ()=>{
    describe("Get all blog post with success response of 200", async () => {
        const response = await request(app)
        .get('')
        .expect(200)
    })
    describe("Get a single blog post with id with success response of 200", async () => {
        const response = await request(app)
        .get('')
        .expect(200)
    })
    describe("Create a blog post with success response of 201", async () => {
        const response = await request(app)
        .post('')
        .expect(201)
    })
} )