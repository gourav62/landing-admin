// ProjectCard.jsx
export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="h-44 w-full bg-gray-100">
        {project.image ? (
          <img src={project.image} alt={project.name} className="h-44 w-full object-cover" />
        ) : (
          <div className="h-44 w-full bg-gray-100" />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-blue-700 font-semibold text-lg mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>

        <div className="mt-4">
          <button className="bg-orange-500 text-white px-3 py-2 rounded-md text-sm shadow">READ MORE</button>
        </div>
      </div>
    </div>
  );
}
