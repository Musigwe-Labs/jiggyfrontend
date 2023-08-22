/* eslint-disable react/prop-types */
import  { createContext, useContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

// Posts Context
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const updatePosts = useCallback((newPosts) => {
    setPosts(newPosts)
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://cruise.pythonanywhere.com/annon/posts/');
        updatePosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
      setTimeout(fetchPosts,2000)
    }
    // Fetch posts initially and then every 2.5 seconds
    fetchPosts();
    const interval = setInterval(fetchPosts, 2500)

    return () => clearInterval(interval);
  }, [updatePosts]);

  return (
    <PostsContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};

