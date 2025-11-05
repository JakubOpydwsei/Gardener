import { Plant } from "../Types/plant";

interface PlantListProps {
  plants: Plant[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

export function PlantList({
  plants,
  loading,
  search,
  setSearch,
}: PlantListProps) {
  const filteredPlants = plants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center px-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj rośliny..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {loading &&
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-base-200 shadow-sm p-3 rounded-xl"
            >
              <div className="skeleton h-32 w-full rounded-lg"></div>
              <div className="skeleton h-4 w-3/4 mx-auto"></div>
            </div>
          ))}

        {!loading &&
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-base-200 shadow-sm rounded-xl overflow-hidden text-center cursor-grab"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("plantId", plant._id);
              }}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 font-medium">{plant.name}</div>
            </div>
          ))}
      </section>
    </div>
  );
}
