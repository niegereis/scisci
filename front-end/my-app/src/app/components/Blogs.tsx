import React from "react";
import Link from "next/link";
import { BlogsProps } from "@/types/types";

const Blogs = ({ blogs }: BlogsProps) => {
  console.log("Blogs:", blogs);

  if (!Array.isArray(blogs.data) || blogs.data.length === 0) {
    return <p>Não há blogs disponíveis no momento.</p>;
  }

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
          ss:grid-cols-1 gap-8 px-4 text-black"
        >
          {blogs.data.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} passHref>
              <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                <img
                  className="h-56 w-full object-cover"
                  src={`http://localhost:1337${blog.coverImage?.url}`}
                  alt={blog.articleTitle}
                />
                <div className="p-8">
                  <h3 className="font-bold text-2xl my-1">
                    {blog.articleTitle}
                  </h3>
                  <p className="text-gray-600 text-xl">
                    {blog.blogDescripition}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
