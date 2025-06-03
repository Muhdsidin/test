'use client';

import { useState, useCallback, useEffect } from 'react';
import type { BlogPost } from '@/lib/types';
import { initialBlogPosts } from '@/lib/mock-data';

// Helper to ensure posts are loaded only once on the client
let hydrated = false;
let postsCache: BlogPost[] = initialBlogPosts;
let nextIdCache = initialBlogPosts.length > 0 ? Math.max(...initialBlogPosts.map(p => parseInt(p.id, 10))) + 1 : 1;


export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(postsCache);
  const [nextId, setNextId] = useState<number>(nextIdCache);

  useEffect(() => {
    if (!hydrated) {
      // This effect runs only once on the client after hydration
      // to initialize state from potentially updated mock data or persisted state in future
      setPosts(postsCache);
      setNextId(nextIdCache);
      hydrated = true;
    }
  }, []);

  const updateGlobalCache = (newPosts: BlogPost[], newNextId?: number) => {
    postsCache = newPosts;
    if (newNextId !== undefined) {
      nextIdCache = newNextId;
    }
  };

  const addPost = useCallback((postData: Omit<BlogPost, 'id' | 'publishDate'> & { publishDate: Date }) => {
    const currentNextId = nextId;
    const newPost: BlogPost = {
      ...postData,
      id: String(currentNextId),
      publishDate: postData.publishDate.toISOString().split('T')[0],
    };
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts];
      updateGlobalCache(updatedPosts, currentNextId + 1);
      return updatedPosts;
    });
    setNextId(currentNextId + 1);
    return newPost;
  }, [nextId]);

  const updatePost = useCallback((updatedPostData: Omit<BlogPost, 'publishDate'> & { publishDate: Date | string }) => {
    const formattedPost: BlogPost = {
      ...updatedPostData,
      publishDate: typeof updatedPostData.publishDate === 'string' 
        ? updatedPostData.publishDate 
        : updatedPostData.publishDate.toISOString().split('T')[0],
    };
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(p => (p.id === formattedPost.id ? formattedPost : p));
      updateGlobalCache(updatedPosts);
      return updatedPosts;
    });
    return formattedPost;
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.filter(p => p.id !== postId);
      updateGlobalCache(updatedPosts);
      return updatedPosts;
    });
  }, []);

  const getPostById = useCallback((postId: string): BlogPost | undefined => {
    return posts.find(p => p.id === postId);
  }, [posts]);

  return { posts, addPost, updatePost, deletePost, getPostById };
}
