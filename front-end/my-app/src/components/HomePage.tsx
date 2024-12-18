'use client';
import React from 'react';
import NavBar from './NavBar';
import Blogs from './Blogs';
import Footer from './Footer';
import { BlogsProps } from '@/types/types';


const HomePage: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <div>
      <NavBar />
      <Blogs blogs={blogs} />
      <Footer />
    </div>
  );
};

export default HomePage;
