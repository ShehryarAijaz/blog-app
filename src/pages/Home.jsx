import React, { useEffect, useState } from 'react'
import { Container, PostCard as PostCardComponent } from '../components/index.js'
import appwriteService from '../appwrite/config.service.js'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts()
        .then((posts) => {
            setPosts(posts.documents)
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <h1 className="text-2xl font-bold">No Posts Found</h1>
                <p className="text-gray-500">
                    Be the first one to write a post
                </p>
            </div>
        )
    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCardComponent {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home