import { useMemo, useState } from "react";
import { Plant } from "../types/plant";
import UploadPanel from "./UploadPanel";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscChromeClose } from "react-icons/vsc";

interface PlantListProps {
  plants: Plant[];
  loading: boolean;
  search: string;
  setBg: (url: string | undefined) => void;
  clearSignal?: boolean;
  setSearch: (value: string) => void;
}

export function PlantList({
  plants,
  loading,
  search,
  clearSignal,
  setSearch,
  setBg,
}: PlantListProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  const filteredPlants = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return plants;
    return plants.filter((p) => p.name.toLowerCase().includes(q));
  }, [plants, search]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="bg-base-100 px-4 py-2 border border-base-300 rounded-lg flex items-center justify-between">
        <button
          className="btn btn-ghost btn-square"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Zwiń panel" : "Rozwiń panel"}
          title={menuOpen ? "Zwiń panel" : "Rozwiń panel"}
        >
          {menuOpen ? (
            <VscChromeClose size={30} />
          ) : (
            <RxHamburgerMenu size={30} />
          )}
        </button>
        <div className="text-sm text-base-content/70">
          {loading
            ? "Ładowanie roślin..."
            : `Rośliny: ${filteredPlants.length} / ${plants.length}`}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        } border border-base-300 rounded-lg bg-base-100 p-4 flex flex-col gap-4`}
      >
        <UploadPanel setBg={setBg} clearSignal={clearSignal} />

        <div className="form-control">
          <label className="label">
            <span className="label-text">Wyszukaj roślinę</span>
          </label>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="np. Róża, Tuja, Lawenda..."
            className="input input-bordered w-full"
          />
        </div>

        <div className="max-h-[30vh] overflow-y-auto">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading &&
              [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 bg-base-200/70 shadow-sm p-4 rounded-xl"
                >
                  <div className="skeleton h-36 w-full rounded-lg"></div>
                  <div className="skeleton h-4 w-3/4 mx-auto"></div>
                </div>
              ))}

            {!loading && filteredPlants.length === 0 && (
              <div className="col-span-full text-center p-6 bg-base200 rounded-xl">
                Brak wyników. Spróbuj wpisać inną frazę.
              </div>
            )}

            {!loading &&
              filteredPlants.map((plant) => (
                <div
                  key={plant._id}
                  className="bg-base-200 shadow-sm rounded-xl overflow-hidden text-center cursor-grab flex flex-col hover:shadow-md transition-all duration-150"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("plantId", plant._id.toString());
                  }}
                >
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-sm font-medium">{plant.name}</div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PlantList;
