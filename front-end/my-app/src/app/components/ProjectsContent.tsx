import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Author, ProjectContentProps } from "@/types/types";
import { Blog } from "@/types/types";
import Link from "next/link";

const ProjectsContent = ({ project }: ProjectContentProps) => {
  if (!project) {
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

  const {
    projectTitle,
    projectDescription,
    projectImage,
    authors,
    blog_articles,
  } = project;

  return (
    <article className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
          md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black"
        >
          <section className="col-span-4">
            {projectImage?.url && (
              <img
                className="h-56 w-full object-cover rounded-xl"
                src={`http://localhost:1337${projectImage.url}`}
                alt={projectTitle}
                loading="lazy"
              />
            )}
            <h1 className="font-bold text-2xl my-1 pt-5">{projectTitle}</h1>
            <div className="pt-5 prose text-justify max-w-none">
              <BlocksRenderer content={projectDescription} />
            </div>

            <div className="col-span-2">
              <h1 className="font-bold text-2xl my-1 pt-5  mb-4">Equipe</h1>
              <div
                className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
          ss:grid-cols-1 gap-8 px-4 text-black"
              >
                {authors.map((author: Author) => (
                  <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                    <img
                      className="h-56 w-full object-contain mx-auto "
                      src={`http://localhost:1337${author.authorImage?.url}`}
                      alt={author.authorName}
                    />
                    <div className="p-8">
                      <h3 className="font-bold text-2xl my-1">
                        {author.authorName}
                      </h3>
                      <p className="text-gray-600 text-xl">
                        {author.authorDescription}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <h1 className="font-bold text-2xl my-1 pt-5 mb-4">
                Publicações relacionadas
              </h1>
              <div
                className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
          ss:grid-cols-1 gap-8 px-4 text-black"
              >
                {blog_articles.map((pub: Blog) => (
                  <Link key={pub.id} href={`/blog/${pub.id}`} passHref>
                    <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                      <img
                        className="h-56 w-full object-contain mx-auto "
                        src={`http://localhost:1337${pub.coverImage?.url}`}
                        alt={pub.articleTitle}
                      />
                      <div className="p-8">
                        <h3 className="font-bold text-2xl my-1">
                          {pub.articleTitle}
                        </h3>
                        <p className="text-gray-600 text-xl">
                          {pub.blogDescripition}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default ProjectsContent;
