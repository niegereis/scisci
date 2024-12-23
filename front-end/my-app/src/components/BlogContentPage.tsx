'use client';
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogContent from '../components/BlogContents';
import { BlogsProps } from '@/types/types';

const BlogContentPage = ({ blogs, blogId} : BlogsProps) => {
  const blog = blogs.data.find((blog) => blog.id === blogId) || null;

  return (
    <div>
      <NavBar />
      <BlogContent blog={blog} />
      <Footer />
    </div>
  );
};

export default BlogContentPage;
