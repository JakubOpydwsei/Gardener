import { useEffect, useState } from "react";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";
import { useParams } from "react-router-dom";

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
  console.log(plant);

  if (!plant) {
    return <h1 className="text-6xl">Pobieranie danych rośliny</h1>;
  }

  return (
    <div className="flex flex-col items-center">
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
          <h1 className="text-5xl font-semibold text-base-content">
            {plant.name}
          </h1>
          <h4 className="text-md italic text-base-content/70 my-2">
            {plant.latinName}
          </h4>

          <p className="text-2xl">
            <span className="font-medium">Gatunek:</span> {plant.species}
          </p>
          <p className="text-2xl">
            <span className="font-medium">Wysokość:</span> {plant.heightCm} cm
          </p>
          <p className="text-2xl">
            <span className="font-medium">Kolory:</span>
            {plant.color.map((_, e) => " " + plant.color[e])}
          </p>
        </div>
      )}

      {/* Zdjęcia */}
      {!plant ? (
        <div className="skeleton sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 w-full sm:h-75 md:h-80 h-70 object-center object-cover"></div>
      ) : (
        <div data-aos="fade-up" className="carousel max-w-128">
          <img
            src={plant.imageUrl}
            className="w-full object-center object-cover mx-auto"
          />
        </div>
      )}
      {/* Timeline */}
      {/* zamienić to na komponent przyjmójący tablice */}
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical overflow-hidden my-40">
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
          <div className="stat timeline-start mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  right-8">
              Okres kwitnięcia
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="">Czerwiec</span>-
                <span className="">Wrzesień</span>
              </div>
              <div className="stat-desc">Wypuszcza kwiaty w 2-3 seriach</div>
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
          <div className="stat timeline-end mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  left-8">
              Okres sadzenia
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="">Marzec</span> - <span className="">Maj</span>
              </div>
              <div className="stat-desc">
                Sadzone w gruncie należy unikać przymrozków!
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
          <div className="stat timeline-start mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  right-8">
              Typ gleby
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="text-success">Lessowa, Piach</span>
              </div>
              <div className="stat-desc">
                Roślina preferuje piaszczyste podłoże
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6" />
            </svg>
          </div>
          <div className="stat timeline-end mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  left-8">
              Ph gleby
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="text-warning-content">Ph 8</span>
              </div>
              <div className="stat-desc">Preferowana lekko zasadowa ziemia</div>
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
          <div className="stat timeline-start mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  right-8">
              Temperatura
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="text-info">15°C</span> /{" "}
                <span className="text-error">28°C</span>
              </div>
              <div className="stat-desc">Roślina podatna na przymrozki!</div>
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
          <div className="stat timeline-end mb-5 text-end relative">
            <time className="font-mono italic text-2xl absolute  left-8">
              Nasłonecznienie
            </time>
            <div className="stat place-items-center">
              <div className="stat-value">
                <span className="text-warning">Pełne słońce</span>
              </div>
              <div className="stat-desc">Najlepiej 6-8h dziennie</div>
            </div>
          </div>
          <hr />
        </li>
      </ul>
      {/* Statsy 1 */}
      {/* zamienić to na komponent przyjmójący tablice */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 overflow-hidden mb-20 w-full">
        <div data-aos="fade-right" className="stat place-items-center w-full">
          <div className="stat-title">Woda</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-left" className="stat place-items-center w-full">
          <div className="stat-title">Toksyczność</div>
          <div className="stat-value">
            <span className="text-warning">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-right" className="stat place-items-center w-full">
          <div className="stat-title">Okres podlewania</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-left" className="stat place-items-center w-full">
          <div className="stat-title">Prędkość wzrostu</div>
          <div className="stat-value">
            <span className="text-accent">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>
      </div>
      <div className="sm:w-6/12 w-full px-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        veniam minus quo, ut praesentium laborum similique deleniti explicabo
        labore adipisci consequatur nisi, perferendis recusandae ad. Repellat
        quos ab tempore commodi?
      </div>
      {/* Statsy 2 */}
      {/* zamienić to na komponent przyjmójący tablice */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 overflow-hidden my-40 w-full">
        <div data-aos="fade-right" className="stat place-items-center w-full">
          <div className="stat-title">Opis podlewania</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-left" className="stat place-items-center w-full">
          <div className="stat-title">Sezony</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-right" className="stat place-items-center w-full">
          <div className="stat-title">Nawożenie</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>

        <div data-aos="fade-left" className="stat place-items-center w-full">
          <div className="stat-title">Odległość pomiedzy innymi roślinami</div>
          <div className="stat-value">
            <span className="text-info">XXX</span>
          </div>
          <div className="stat-desc">XXX XXX XXX</div>
        </div>
      </div>
      <div>Kompatybilność do dodania</div>
    </div>
  );
}

export default PlantInfoPage;
