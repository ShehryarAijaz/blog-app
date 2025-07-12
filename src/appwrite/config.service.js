import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteEndpoint);
        this.client.setProject(config.appwriteProjectID);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch(error) {
            console.log(error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch(error) {
            console.log(`Appwrite service :: deletePost :: ${error}`);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch(error) {
            console.log(`Appwrite service :: getPost :: ${error}`);
        }
    }

    async getPosts(queries = [
        Query.equal("status", "active")
    ]) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log(`Appwrite service :: getPosts :: ${error}`);
            return false;
        }
    }

    // file upload method
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            return true;
        } catch (error) {
            console.log(`Appwrite service :: deleteFile :: ${error}`);
            return false;
        }
    }

    getfilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileID
        )
    }
}

const service = new Service()

export default service;