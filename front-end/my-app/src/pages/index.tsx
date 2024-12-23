import React from 'react';
import useFetch from '../hooks/useFetch';
import { Blog } from '@/types/types';
import HomePage from '../components/HomePage';
interface ApiResponse {
  data: Blog[];
}

const IndexPage = () => {
  const { loading, data, error } = useFetch<ApiResponse>(
    'http://localhost:1337/api/blog-articles?populate[author][populate]=authorImage&populate=coverImage'
  );

  console.log('Fetched Data:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <HomePage blogs={data || { data: [] }} />;
};

export default IndexPage;
