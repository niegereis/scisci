import React from "react";
import Link from "next/link";
import { BlogsProps } from "@/types/types";

interface Projects {
  id: number;
  projectTitle: string;
  projectDescription: string;
  projectImage: {
    url: string;
  };
}

async function getProjectInfo() {
  const res = await fetch(
    "http://localhost:1337/api/sci-sci-projects?populate=*",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os artigos.");
  }

  const data = await res.json();
  return data;
}
async function OurProjects() {
  const projectsInfos = await getProjectInfo();
  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
          ss:grid-cols-1 gap-8 px-4 text-black"
        >
          {projectsInfos.data.map((project: Projects) => (
            <Link key={project.id} href={`/project/${project.id}`} passHref>
              <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                <img
                  className="h-56 w-full object-cover"
                  src={`http://localhost:1337${project.projectImage?.url}`}
                  alt={project.projectTitle}
                />
                <div className="p-8">
                  <h3 className="font-bold text-2xl my-1">
                    {project.projectTitle}
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Colocar pequena descrição?
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProjects;
