import { useNavigate } from "react-router-dom";
import { Plant } from "../Types/plant";
import { soilTypesMap } from "../utils/mappings/plantSoilMap";
import { plantSpeciesMap } from "../utils/mappings/plantSpeciesMap";
import { monthMap } from "../utils/mappings/monthMap";
import { sunlightMap } from "../utils/mappings/sunlightMap";

function PlantCard({ plant }: { plant: Plant }) {
  // console.log(plant);

  const navigate = useNavigate();

  const moreHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate("/plant/" + plant._id);
  };

  return (
    <div
      key={plant._id}
      className="card bg-base-200 shadow-sm h-fit"
      data-testid="plant-card"
    >
      <div tabIndex={0} className="collapse">
        <div className="collapse-title p-0 xl:min-h-90">
          <figure className="p-3 rounded-xl">
            <img
              src={plant.imageUrl}
              alt={"Zdjęcie rośliny - " + plant.name}
              className="rounded-xl w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center py-2">
            <h2 data-testid="card-title" className="card-title">
              {plant.name}
            </h2>
            <h3>Gatunek: {plantSpeciesMap[plant.species]}</h3>
            <h3>Nasłonecznienie: {sunlightMap[plant.sunlight]}</h3>
          </div>
        </div>
        <div className="collapse-content text-sm">
          <h4 className="pb-2">
            Gleba: {plant.soil.map((s) => soilTypesMap[s]).join(", ")}
          </h4>
          <h4 className="pb-2">
            Okres sadzenia:
            <p>
              {monthMap[plant.plantingPeriod.start]}-
              {monthMap[plant.plantingPeriod.end]}{" "}
            </p>
          </h4>
          <h4 className="pb-2">
            Okres kwitnięcia:
            <p>
              {monthMap[plant.floweringPeriod.start]}-
              {monthMap[plant.floweringPeriod.end]}
            </p>
          </h4>
          <h4>Roślina {plant.toxicity ? "toksyczna" : "nietoksyczna"} </h4>
        </div>
        <button
          className="btn btn-active"
          onClick={moreHandler}
          data-testid="plant-details-button"
        >
          Szczegóły rośliny
        </button>
      </div>
    </div>
  );
}

export default PlantCard;
