import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';
import { useThemeContext } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';
import Comment from '../../components/Comment/Comment';
import './SingleBlogPage'

const SingleBlogPage = () => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [author , setAuthor] = useState({})
  const { id } = useParams();
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  const fetchBlogPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/blog/post/${id}`, config);
      setPost(data.blogPost);
      setComments(data.blogPost.comments);
      setAuthor(data.blogPost.author)
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };






  useEffect(() => {
    fetchBlogPost();
  }, []);

  const handleAddComment = async () => {
    if (content !== '') {
      setLoading(true)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const postId = id;
        await axios.post(`/api/blog/add-comment/${postId}`, { content }, config);
        await fetchBlogPost();
        setContent('');
        toast.success('Comment Added');
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.message);
      }
    } else {
      toast.error('Please enter some text');
    }
  };

  return (
    <>
    {
      loading ? (<Loader/>) : (
        <div className={`min-h-screen flex flex-col items-center justify-center  p-4 ${theme === 'dark' ? 'dark-theme' : 'mt-16'}`}>
        {post ? (
          <>
            {/* <h1>{owner.name}</h1> */}
            <h1 className={`text-4xl font-bold mb-4  ${theme === 'dark' ? 'dark-theme ' : 'text-teal-800'}`}>{post.title}</h1>
            <p className={` mb-2 ${theme === 'dark' ? 'dark-theme' : 'text-gray-500'}`}>{post.date}</p>
            <img
              src={post.image}
              alt={post.title}
              className="md:w-[50%]  sm:w-full max-h-96 object-cover mb-8 rounded-md shadow-md"
            />
            <div className={` leading-relaxed ${theme === 'dark' ? 'dark-theme' : 'text-gray-700'}`}>{post.content}</div>

            <Link  to={`/profile/${author._id}`} className="mt-10  flex justify-between items-center gap-4">              
            <img className="h-20 w-20 rounded-full object-cover" src={author.pic} alt="" />
            <h3 className="text-2xl underline font-bold">{author.name}</h3>
            </Link>
    
            {/* Comment section */}
            <div className="mt-8">
              <h2 className={`${theme === 'dark' ? 'dark-theme' : ''} text-2xl font-semibold mb-4`}>Comments</h2>
              <div className="mb-4">
                <textarea
                  rows="3"
                  placeholder="Add your comment..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border text-black p-2 w-full rounded"
                ></textarea>
              </div>
              <button
                onClick={handleAddComment}
                className="bg-teal-700 hover:bg-teal-600 font-bold text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Comment
              </button>
    
              <div className="mt-4">
                {comments.map((c, index) => (
                  <Comment key={index} user={c.user.name} pic={c.user.pic} content={c.content} userId={c.user._id}  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      )
    }
  </>
  );
};

export default SingleBlogPage;
