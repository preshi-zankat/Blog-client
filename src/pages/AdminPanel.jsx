import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or editing posts
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPostId) {
        // Update existing post
        const response = await axios.put(`/posts/${editingPostId}`, {
          ...formData,
          tags: formData.tags.split(","),
        });
        console.log("Post updated:", response.data);
      } else {
        // Create a new post
        const response = await axios.post("/posts", {
          ...formData,
          tags: formData.tags.split(","),
        });

        console.log("Post created:", response.data);
      }
      // Reset form and refresh posts
      setFormData({ title: "", content: "", tags: "" });
      setEditingPostId(null);
      fetchPosts();
      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
    }

  };

  // Handle delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Populate form for editing
  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      tags: post.tags.join(","),
    });
    setEditingPostId(post._id);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

      {/* Form for creating/editing posts */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingPostId ? "Edit Post" : "Add New Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingPostId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      {/* List of posts */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Posts</h2>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post._id}
            className="border-b pb-4 mb-4 bg-gray-50 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-600">{post.content.substring(0, 150)}...</p>
            <div className="text-sm text-gray-500 mt-2">
              Tags:{" "}
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
