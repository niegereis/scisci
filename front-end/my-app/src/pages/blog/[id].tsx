// pages/blog/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../hooks/useFetch';
import BlogContentPage from '../../components/BlogContentPage'; // Certifique-se de que este caminho esteja correto
import { Blog } from '@/types/types';

const BlogContent = () => {
  const { query } = useRouter();
  const blogId = query.id as string;

  const { loading, data, error } = useFetch< {data: Blog[]}>(
    'http://localhost:1337/api/blog-articles?populate[author][populate]=authorImage&populate=coverImage'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blog = data || {data: []};

  return <BlogContentPage blogs={blog} blogId={parseInt(blogId)} />;
};

export default BlogContent;
