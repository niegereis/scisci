import { BlogsProps } from "@/types/types";
import ProjectsPage from "./ProjectsPage";
const ProjectPage = ({ blogs }: BlogsProps) => {
  <div>
    <section className="max-w-[1240px] mx-auto  p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="font-bold text-2xl sm:text-2xl ">Nossos Projetos</h2>
      </div>
      <ProjectsPage blogs={blogs} />
    </section>
  </div>;
};

export default ProjectPage;
