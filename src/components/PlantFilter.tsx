import { Filters } from "../Types/filters";
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

  function handleSoilChange(soil: string): void {
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

      <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny kwitnące</legend>
        {["winter", "spring", "summer", "autumn"].map((season, i) => (
          <label key={season} className="label">
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => handleFloweringChange(season)}
            />
            {["Zimą", "Wiosną", "Latem", "Jesienią"][i]}
          </label>
        ))}
      </fieldset>

      <fieldset className="fieldset border p-4">
        <legend className="fieldset-legend">Długość życia</legend>
        <input
          type="range"
          min={0}
          max="3"
          defaultValue="0"
          className="range w-4/5 m-auto"
          step="1"
          onChange={handleLifeLengthChange}
        />
        <div className="grid grid-cols-4 mt-2 text-xs ">
          <span>Wszystkie</span>
          <span>1 rok</span>
          <span>2 lata</span>
          <span>Wieloroczne</span>
        </div>
      </fieldset>

      <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny sadzone</legend>
        {["winter", "spring", "summer", "autumn"].map((season, i) => (
          <label key={season} className="label">
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => handlePlantingChange(season)}
            />
            {["Zimą", "Wiosną", "Latem", "Jesienią"][i]}
          </label>
        ))}
      </fieldset>

      <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Typ gleby</legend>
        {["sandy", "clay", "loamy", "peaty", "chalky", "silty"].map(
          (soil, i) => (
            <label key={soil} className="label">
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => handleSoilChange(soil)}
              />
              {
                [
                  "Piaszczysta",
                  "Gliniasta",
                  "Uniwersalna",
                  "Torfowa",
                  "Wapienna",
                  "Lessowa",
                ][i]
              }
            </label>
          )
        )}
      </fieldset>

      <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Toksyczność</legend>
        <label className="label lg:col-span-1">
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => handleToxiticyChange("save")}
          />
          Bezpieczne
        </label>
        <label className="label lg:col-span-1">
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => handleToxiticyChange("toxic")}
          />
          Toksyczne
        </label>
      </fieldset>

      <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
        <legend className="fieldset-legend">Rośliny</legend>
        {["tree", "shrub", "herb", "flower", "vegetable", "fruit"].map(
          (species, i) => (
            <label key={species} className="label">
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => handleSpeciesChange(species)}
              />
              {["Drzewa", "Krzewy", "Zioła", "Kwiaty", "Warzywa", "Owoce"][i]}
            </label>
          )
        )}
      </fieldset>

      {/* <fieldset className="fieldset border pl-6 p-4 grid grid-cols-2">
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
      </fieldset> */}
    </div>
  );
}

export default PlantFilter;
