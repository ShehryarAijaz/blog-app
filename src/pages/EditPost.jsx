import React, { useEffect, useState } from "react";
import {
  Container,
  PostForm as PostFormComponent,
} from "../components/index.js";
import appwriteService from "../appwrite/config.service.js";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostFormComponent post={posts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
