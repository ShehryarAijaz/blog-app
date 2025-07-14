import React from "react";
import appwriteService from "../appwrite/config.service.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-600 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-block px-3 py-1 rounded-md text-sm text-white bg-gray-500">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
