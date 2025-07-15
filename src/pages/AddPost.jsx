import React from 'react'
import { PostForm as PostFormComponent, Container } from '../components/index.js'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostFormComponent />
        </Container>
    </div>
  )
}

export default AddPost