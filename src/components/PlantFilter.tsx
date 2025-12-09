import { Filters } from "../types/filters";
import { SoilType } from "../types/plant";
type Props = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

function PlantFilter({ filters, onFilterChange }: Props) {
  function handleFloweringChange(season: string): void {
    const updatedFlowering = filters.floweringSeasons.includes(season)
      ? filters.floweringSeasons.filter((s) => s !== season)
      : [...filters.floweringSeasons, season];
    onFilterChange({ ...filters, floweringSeasons: updatedFlowering });
  }

  function handlePlantingChange(season: string): void {
    const updatedPlanting = filters.plantingSeasons.includes(season)
      ? filters.plantingSeasons.filter((s) => s !== season)
      : [...filters.plantingSeasons, season];
    onFilterChange({ ...filters, plantingSeasons: updatedPlanting });
  }

  function handleLifeLengthChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const lifeLength = Number(e.target.value);
    onFilterChange({ ...filters, lifeLength: lifeLength });
  }

  function handleSoilChange(soil: SoilType): void {
    const updatedType = filters.soil.includes(soil)
      ? filters.soil.filter((v) => v !== soil)
      : [...filters.soil, soil];
    onFilterChange({ ...filters, soil: updatedType });
  }

  function handleToxiticyChange(toxiticy: string): void {
    const updatedToxiticy = filters.toxiticy?.includes(toxiticy)
      ? filters.toxiticy.filter((t) => t !== toxiticy)
      : [...filters.toxiticy, toxiticy];
    onFilterChange({ ...filters, toxiticy: updatedToxiticy });
  }

  function handleSpeciesChange(species: string): void {
    const updatedSpecies = filters.species.includes(species)
      ? filters.species.filter((s) => s !== species)
      : [...filters.species, species];
    onFilterChange({ ...filters, species: updatedSpecies });
  }

  return (
    <div>
      <strong>Filtry</strong>

      <fieldset className="fieldset border p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny kwitnące</legend>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Zimą
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Wiosną
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Latem
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Jesienią
        </label>
      </fieldset>

      <fieldset className="fieldset border p-4">
        <legend className="fieldset-legend">Długość życia</legend>
        <input
          type="range"
          min={0}
          max="100"
          defaultValue="25"
          className="range pr-2"
          step="25"
        />
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5+</span>
        </div>
      </fieldset>

      <fieldset className="fieldset border p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny sadzone</legend>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Zimą
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Wiosną
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Latem
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Jesienią
        </label>
      </fieldset>

      <fieldset className="fieldset border p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny</legend>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Drzewa
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Krzewy
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Kwiaty
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Inne
        </label>
      </fieldset>

      <fieldset className="fieldset border p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny</legend>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Doniczkowe
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Szklarniowe
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Gruntowe
        </label>
        <label className="label">
          <input type="checkbox" className="checkbox" />
          Inne
        </label>
      </fieldset>
    </div>
  );
}

export default PlantFilter;
