'use client';
import React from 'react';
import { BlogContentProps } from '@/types/types';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


const BlogContent: React.FC<BlogContentProps> = ({ blog }) => {
  if (!blog) {
    return (
      <div className="w-full pb-10 bg-[#f9f9f9]">
        <div className="max-w-[1240px] mx-auto text-center pt-20">
          <h1 className="text-2xl font-bold text-gray-800">
            Blog não encontrado
          </h1>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
          md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black"
        >
          <section className="col-span-2">
            <img
              className="h-56 w-full object-cover"
              src={`http://localhost:1337${blog.coverImage.url}`}
              alt={blog.articleTitle}
              loading="lazy"  
            />
            <h1 className="font-bold text-2xl my-1 pt-5">{blog.articleTitle}</h1>
            <div className="pt-5 prose text-justify max-w-none">
              <BlocksRenderer content={blog.blogContent} />
            </div>
          </section>

          <aside className="items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-max">
            <div>
              <img
                className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
                src={`http://localhost:1337${blog.author.authorImage.url}`}
                alt={blog.author.authorName}
                loading="lazy"  
              />
              <h2 className="font-bold text-2xl text-center text-gray-900 pt-3">
                {blog.author.authorName}
              </h2>
              <p className="text-center text-gray-900 font-medium">
                {blog.author.authorDescription}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogContent;
