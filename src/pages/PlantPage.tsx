import { useEffect, useState } from "react";
import PlantFilter from "../components/PlantFilter";
import PlantCard from "../components/PlantCard";
import { plantService } from "../services/plantService.ts";
import { Plant } from "../Types/plant.ts";
import { Filters } from "../Types/filters";
import { useFavorites } from "../context/FavoritesContext.tsx";

function PlantPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filters, setFilters] = useState<Filters>({
    floweringSeasons: [],
    lifeLength: 0,
    plantingSeasons: [],
    soil: [],
    toxiticy: [],
    species: [],
  });
  const { favorites } = useFavorites();

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredPlants = plants.filter((plant) => {
    const seasons = {
      winter: { start: 12, end: 2 },
      spring: { start: 3, end: 5 },
      summer: { start: 6, end: 8 },
      autumn: { start: 9, end: 11 },
    } as const;

    const filteredName =
      searchQuery.trim() === "" ||
      plant.name.toLowerCase().includes(searchQuery.toLowerCase());

    const filteredFloweringSeasons =
      filters.floweringSeasons.length === 0
        ? true
        : filters.floweringSeasons.some((season) => {
            const { start, end } = seasons[season as keyof typeof seasons];
            const { start: plantStart, end: plantEnd } = plant.floweringPeriod;

            if (start > end) {
              return plantStart >= start || plantEnd <= end;
            }
            return plantStart <= end && plantEnd >= start;
          });

    const lengthMap: Record<number, string> = {
      1: "annual",
      2: "biennial",
      3: "perennial",
    };

    const filteredLifeLength =
      filters.lifeLength === 0
        ? true
        : plant.lifespan.includes(lengthMap[filters.lifeLength]);

    const filteredPlantingSeasons =
      filters.plantingSeasons.length === 0
        ? true
        : filters.plantingSeasons.some((season) => {
            const { start, end } = seasons[season as keyof typeof seasons];
            const { start: plantStart, end: plantEnd } = plant.plantingPeriod;

            if (start > end) {
              return plantStart >= start || plantEnd <= end;
            }
            return plantStart <= end && plantEnd >= start;
          });

    const filteredSpecies =
      filters.species.length === 0 ||
      filters.species.some((s) => plant.species.includes(s));

    const filteredSoil =
      filters.soil.length === 0 ||
      filters.soil.some((s) => plant.soil.includes(s));

    let filteredToxiticy = true;

    if (filters.toxiticy.length !== 0 && filters.toxiticy.length !== 2) {
      if (filters.toxiticy[0] === "save") {
        filteredToxiticy = plant.toxicity === false;
      }
      if (filters.toxiticy[0] === "toxic") {
        filteredToxiticy = plant.toxicity === true;
      }
    }

    return (
      filteredFloweringSeasons &&
      filteredLifeLength &&
      filteredPlantingSeasons &&
      filteredSoil &&
      filteredSpecies &&
      filteredToxiticy &&
      filteredName
    );
  });

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    plantService
      .getAllPlants()
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="block lg:flex pb-6">
      <section
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-full p-6 lg:p-0 lg:w-3/10 xl:w-2/5 lg:ml-1 h-fit`}
      >
        <PlantFilter filters={filters} onFilterChange={handleFilterChange} />
      </section>

      <section className="w-full ">
        <div className="flex justify-between mb-4">
          <label className="input rounded-2xl m-auto md:w-5/12 lg:w-4/12 w-1/2">
            <input
              type="search"
              className="pl-2"
              required
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="plant-search-input"
            />
            <span className="label">
              <svg
                className="h-[1em] cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </span>
          </label>

          <div
            onClick={menuHandler}
            className="mr-2 block lg:hidden xs:bg-green-100 sm:mr-6 md:mr-8 lg:mr-14 xl:mr-24"
          >
            Filtry
            <button
              aria-label="Przycisk rozsuń/zsuń filtry"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>{" "}
              </svg>
            </button>
          </div>
        </div>
        {filteredPlants.length > 0 && (
          <h1 className="my-2">Liczba roślin: {filteredPlants.length}</h1>
        )}
        {!filteredPlants.length && (
          <h1 className="my-2">Nie odnaleziono żadnej rośliny</h1>
        )}
        <div className="grid mx-4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredPlants.map((plant: Plant) => (
            <PlantCard
              key={plant._id}
              plant={plant}
              isFavorite={favorites.some((f) => f._id === plant._id)}
            />
          ))}

          {plants.length === 0 &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 bg-base-200 shadow-sm p-4 rounded-xl"
              >
                <div
                  className="skeleton h-46 w-full"
                  data-testid="plant-skeleton"
                ></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-12 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-7 w-full"></div>
                <div className="skeleton h-9 w-full"></div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default PlantPage;
