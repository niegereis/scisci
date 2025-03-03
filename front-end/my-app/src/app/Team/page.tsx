interface Team {
  authorName: string;
  authorDescription: string;
  authorImage: {
    url: string;
  };
}

async function getTeamInfos() {
  const res = await fetch("http://localhost:1337/api/authors?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os artigos.");
  }

  const data = await res.json();
  return data;
}

async function Team() {
  const teamMembers = await getTeamInfos();
  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
          ss:grid-cols-1 gap-8 px-4 text-black"
        >
          {teamMembers.data.map((team: Team) => (
            <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
              <img
                className="h-56 w-full object-contain mx-auto "
                src={`http://localhost:1337${team.authorImage?.url}`}
                alt={team.authorName}
              />
              <div className="p-8">
                <h3 className="font-bold text-2xl my-1">{team.authorName}</h3>
                <p className="text-gray-600 text-xl">
                  {team.authorDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Team;
