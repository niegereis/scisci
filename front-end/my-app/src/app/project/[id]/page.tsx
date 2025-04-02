import React from "react";
import { notFound } from "next/navigation";
import ProjectsContent from "@/app/components/ProjectsContent";
import { ProjectPostPageProps } from "@/types/types";

async function getAllProjects() {
  const res = await fetch(
    "http://localhost:1337/api/sci-sci-projects?populate[authors][populate]=authorImage&populate=projectImage&populate[blog_articles][populate]=coverImage&populate[blog_articles][fields]=articleTitle,blogDescripition",
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Erro ao buscar artigo:", res.status);
    notFound();
    return null;
  }

  const data = await res.json();
  return data;
}

export default async function BlogPostPage({ params }: ProjectPostPageProps) {
  const { id } = params;
  const projectData = await getAllProjects();

  if (!projectData) {
    notFound();
    return null;
  }

  const project = projectData.data.find((b: any) => b.id.toString() === id);

  if (!project) {
    notFound();
    return null;
  }

  return <ProjectsContent project={project} />;
}
