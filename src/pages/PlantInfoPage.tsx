import { useEffect, useState } from "react";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";
import { useParams } from "react-router-dom";
import { plantSpeciesMap } from "../utils/mappings/plantSpeciesMap";
import { plantWateringMap } from "../utils/mappings/plantWateringMap";
import { soilTypesMap } from "../utils/mappings/plantSoilMap";
import { monthMap } from "../utils/mappings/monthMap";
import { sunlightMap } from "../utils/mappings/sunlightMap";
function PlantInfoPage() {
  const [plant, setPlant] = useState<Plant | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchPlant = async () => {
      try {
        const result = await plantService.getPlantById(id);

        if (result) {
          setPlant(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlant();
  }, [id]);

  const getMonthClass = (month: number): string => {
    if ([12, 1, 2].includes(month)) return "text-info";
    if (month >= 3 && month <= 5) return "text-accent";
    if (month >= 6 && month <= 8) return "text-warning";
    if (month >= 9 && month <= 11) return "text-[#EA600B]";
    return "";
  };

  if (!plant) {
    return (
      <h1 className="text-6xl" data-testid="plant-details-loading">
        Pobieranie danych rośliny
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <section>
        {!plant ? (
          <div
            data-aos=""
            className="p-4 w-full flex flex-col items-center gap-3"
          >
            <div className="skeleton w-5/12 h-10"></div>
            <div className="skeleton w-2/12 h-4"></div>
            <div className="skeleton w-3/12 h-7"></div>
            <div className="skeleton w-3/12 h-7"></div>
            <div className="skeleton w-3/12 h-7"></div>
          </div>
        ) : (
          <div data-aos="fade-down" className="p-4">
            <h1
              className="text-5xl font-semibold text-base-content"
              data-testid="plant-details-name"
            >
              {plant.name}
            </h1>
            <h2
              className="text-md italic text-base-content/70 my-2"
              data-testid="plant-details-latin-name"
            >
              {plant.latinName}
            </h2>

            <p className="text-2xl">
              <span className="font-medium">Gatunek:</span>{" "}
              {plantSpeciesMap[plant.species]}
            </p>
            <p className="text-2xl">
              <span className="font-medium">Wysokość:</span> {plant.heightCm} cm
            </p>
            <p className="text-2xl">
              <span className="font-medium">Kolory: </span>
              {plant.color.join(", ")}
            </p>
          </div>
        )}
      </section>

      {/* Zdjęcia */}
      <section>
        {!plant ? (
          <div className="skeleton sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 w-full sm:h-75 md:h-80 h-70 object-center object-cover"></div>
        ) : (
          <div data-aos="fade-up" className="carousel py-6 max-w-128">
            <img
              src={plant.imageUrl}
              alt={`Zdjęcie rośliny: ${plant.name}`}
              className="w-full object-center object-cover mx-auto"
              data-testid="plant-details-image"
            />
          </div>
        )}
      </section>

      <section
        data-aos="fade-up"
        className="p-4 sm:p-6 bg-base-200 rounded-xl border border-base-300 mt-6"
      >
        <h3 className="text-xl font-semibold mb-3">Jak dbać?</h3>
        <p
          className="w-full text-base leading-relaxed"
          data-testid="plant-details-care"
        >
          {plant.careTips}
        </p>
      </section>

      {/* Timeline */}
      <section>
        <ul
          className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-hidden my-20"
          data-testid="plant-details-timeline"
        >
          <li data-aos="fade-right">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22v-6m0 0c2.5-1.5 4-4.5 4-8V5l-2 2-2-3-2 3-2-2v3c0 3.5 1.5 6.5 4 8z"
                />
              </svg>
            </div>
            <div className="stat timeline-start mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8 md:right-8">
                Okres kwitnięcia
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className={getMonthClass(plant.floweringPeriod.start)}>
                    {monthMap[plant.floweringPeriod.start]}
                  </span>
                  -
                  <span className={getMonthClass(plant.floweringPeriod.end)}>
                    {monthMap[plant.floweringPeriod.end]}
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </li>

          <li data-aos="fade-left">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 20v-6m0 0a6 6 0 016-6h1a6 6 0 01-6 6H9a6 6 0 01-6-6h1a6 6 0 016 6zm0 0V8"
                />
              </svg>
            </div>
            <div className="stat timeline-end mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8">
                Okres sadzenia
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className={getMonthClass(plant.plantingPeriod.start)}>
                    {monthMap[plant.plantingPeriod.start]}
                  </span>
                  -
                  <span className={getMonthClass(plant.plantingPeriod.end)}>
                    {monthMap[plant.plantingPeriod.end]}
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </li>

          <li data-aos="fade-right">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4-8h8l4 8-4 4H8l-4-4z"
                />
              </svg>
            </div>
            <div className="stat timeline-start mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8 md:right-8">
                Typ gleby
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className="text-success whitespace-pre-wrap">
                    {plant.soil.map((s) => soilTypesMap[s]).join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </li>

          <li data-aos="fade-left">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3h6v2l-1 1v6.5l3.5 5.5a2 2 0 01-1.7 3H8.2a2 2 0 01-1.7-3L10 12.5V6L9 5V3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 14h6"
                />
              </svg>
            </div>
            <div className="stat timeline-end mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8">
                Ph gleby
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className="text-primary">Ph {plant.soilPh}</span>
                </div>
              </div>
            </div>
            <hr />
          </li>

          <li data-aos="fade-right">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a2 2 0 012 2v8.268a4 4 0 11-4 0V4a2 2 0 012-2z"
                />
              </svg>
            </div>
            <div className="stat timeline-start mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8 md:right-8">
                Temperatura
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className="text-info">{plant.temp.min}°C</span> /{" "}
                  <span className="text-error">{plant.temp.max}°C</span>
                </div>
              </div>
            </div>
            <hr />
          </li>

          <li data-aos="fade-left">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.95 6.95l1.414 1.414M4.636 4.636l1.414 1.414m0 12.728L4.636 19.364M19.364 4.636l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            </div>
            <div className="stat timeline-end mb-5 relative">
              <time className="font-mono italic text-2xl absolute left-8">
                Nasłonecznienie
              </time>
              <div className="stat place-items-center">
                <div className="stat-value">
                  <span className="text-warning">
                    {sunlightMap[plant.sunlight]}
                  </span>
                </div>
              </div>
            </div>
            <hr />
          </li>
        </ul>
      </section>

      {/* Statsy */}
      <section>
        <div
          className="grid sm:grid-cols-1 md:grid-cols-2 overflow-hidden mb-20 w-full"
          data-testid="plant-details-stats"
        >
          <div data-aos="fade-right" className="stat place-items-center w-full">
            <div className="stat-title">Podlewanie</div>
            <div className="stat-value">
              <span className="text-info">
                {plantWateringMap[plant.waterRequirement]}
              </span>
            </div>
            <div className="stat-desc whitespace-pre-wrap">
              {plant.wateringDesc}
            </div>
          </div>

          <div data-aos="fade-left" className="stat place-items-center w-full">
            <div className="stat-title">Toksyczność</div>
            <div className="stat-value">
              <span className="text-warning">
                {plant.toxicity ? "Toksyczna" : "Bezpieczna"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* <div>Kompatybilność do dodania</div> */}
    </div>
  );
}

export default PlantInfoPage;
