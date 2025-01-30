import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]); // State for storing images

  useEffect(() => {
    const fetchPostsAndImages = async () => {
      try {
        // Fetch posts
        const response = await axios.get("/posts");
        setPosts(response.data);

        // Fetch images related to the posts (using Unsplash API)
        const imagesForPosts = await Promise.all(
          response.data.map(async (post) => {
            // Use the post title or tags as search keywords for Unsplash API
            const query = post.title || post.tags.join(" ");
            const imageResponse = await axios.get(
              `https://api.unsplash.com/search/photos?query=${query}&client_id=qHoSgW1oMKc5Pz_YbpEtmOxwfz1BaYH4tx-vAV3eSI8`
            );
            // If no image is found, use a fallback image
            return imageResponse.data.results[0]?.urls?.regular || "https://www.shutterstock.com/image-illustration/new-post-neon-text-blogging-260nw-1538276189.jpg";
          })
        );
        setImages(imagesForPosts);
      } catch (error) {
        console.error("Error fetching posts or images:", error);
      }
    };

    fetchPostsAndImages();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) || // Filter by title
      post.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()) // Filter by tags
      )
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Latest Blog Posts
      </h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 sm:w-1/2 px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={images[index]} // Use the fetched image URL based on the post
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.content.slice(0, 100)}...
              </p>
              <div className="flex flex-wrap mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
