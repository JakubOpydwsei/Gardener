function PlantFilter() {
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
                <input type="range" min={0} max="100" defaultValue="25" className="range pr-2" step="25" />
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