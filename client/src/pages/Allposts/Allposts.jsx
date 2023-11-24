import React, { useEffect, useState } from 'react';
import BlogPost from '../../components/BlogPost/BlogPost';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './Allposts.css';
import Loader from '../../components/Loader/Loader';
import { useThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  const [searchQuery, setSearchquery] = useState()
  const { theme, toggleTheme } = useThemeContext();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`/api/blog/getallposts?page=${page}`, config);
      setPosts(response.data.blogPosts);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts and whenever the page changes
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchChange = async (e) => {

    const query = e.target.value
    setSearchquery(query)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (query.trim() !== '') {
        const { data } = await axios.get(`/api/blog/search?searchQuery=${query}`, config)
        setPosts(data.blogPosts)
      }

      else {
        setLoading(true)
        const response = await axios.get(`/api/blog/getallposts?page=${page}`, config);
        setPosts(response.data.blogPosts);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <>
    {
      posts.length !== 0 ? (
        <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="relative md:w-[50%] mx-auto flex flex-col items-center justify-center mb-4">
            {/* Search bar with search icon */}
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="text-black shadow-xl border-2 border-gray p-2 w-full pl-10 rounded-full"
            />
            <SearchIcon className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
          </div>

          {loading && (<Loader />)}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 blog-posts-container"
          >
            {posts.map((post, index) => (
              <BlogPost
                id={post._id}
                key={index}
                title={post.title}
                date={post.date}
                content={post.content}
                image={post.image}
              />
            ))}
          </motion.div>
          <div className="pagination">
            <button
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="p-4 bg-gray ">{page}</span>
            <button
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              onClick={handleNextPage}
              disabled={posts.length < 10}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      ) : ( 
      <div className={`h-screen flex flex-col items-center justify-center ${theme === "dark" ? "dark-theme" : ""}`}>
         <h1 className="text-center text-3xl font-bold">No Posts Yet</h1>
         <Link to="/createblog">
         <button className="px-4 py-3 rounded-md bg-teal-500 hover:bg-teal-400 text-white font-bold mt-3">Upload a Post</button>
         </Link>
      </div>
      )
    }

    </>
  );
};

export default AllPosts;