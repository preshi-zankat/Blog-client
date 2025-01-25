import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        console.log(response.data); // Log the data received from the API

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center text-xl text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{post.content}</p>
      
      <div className="flex flex-wrap mb-6">
        <span className="text-lg font-semibold text-gray-600">Tags: </span>
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t pt-4">
        <p className="text-center text-gray-500 text-sm">© 2025 Your Blog</p>
      </div>
    </div>
  );
};

export default PostDetails;
