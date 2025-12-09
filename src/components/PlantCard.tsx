import { useNavigate } from "react-router-dom";
import { Plant } from "../types/plant";

function PlantCard({ plant }: { plant: PlantType }) {
  const navigate = useNavigate();

  const moreHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert("Strona w trakcie pracy");
    navigate("/");
  };

  return (
    <div key={plant.id} className="card bg-base-200 shadow-sm h-fit">
      <div tabIndex={0} className="collapse">
        <div className="collapse-title font-semibold p-0">
          <figure className="p-3 rounded-xl">
            <img
              src={plant.img}
              alt={plant.imgDesc}
              className="rounded-xl w-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{plant.name}</h2>
            <h3>{plant.desc}</h3>
            <h3>jakieś kolejne info</h3>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>
        <div className="collapse-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <h4>info</h4>
          <h4>jakieś kolejne info</h4>
        </div>
        <button className="btn btn-active" onClick={moreHandler}>
          Szczegóły rośliny
        </button>
      </div>
    </div>
  );
}

export default PlantCard;
