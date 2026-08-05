const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

export function ChaletFilters({
  locations,
  amenities,
  current,
}: {
  locations: string[];
  amenities: string[];
  current: {
    location?: string;
    guests?: string;
    priceMin?: string;
    priceMax?: string;
    amenities: string[];
  };
}) {
  return (
    <form
      method="GET"
      className="grid gap-6 rounded-2xl border border-forest-900/10 bg-paper p-6 lg:sticky lg:top-24"
    >
      <div>
        <label
          htmlFor="filter-location"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-forest-700"
        >
          Локация
        </label>
        <select
          id="filter-location"
          name="location"
          defaultValue={current.location ?? ""}
          className="w-full rounded-lg border border-forest-900/15 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700"
        >
          <option value="">Любая</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="filter-guests"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-forest-700"
        >
          Вместимость, гостей от
        </label>
        <select
          id="filter-guests"
          name="guests"
          defaultValue={current.guests ?? ""}
          className="w-full rounded-lg border border-forest-900/15 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700"
        >
          <option value="">Не важно</option>
          {GUEST_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-forest-700">
          Цена за ночь, ₽
        </span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            name="priceMin"
            placeholder="От"
            min={0}
            defaultValue={current.priceMin ?? ""}
            className="w-full rounded-lg border border-forest-900/15 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700"
          />
          <span className="text-ink/30">—</span>
          <input
            type="number"
            name="priceMax"
            placeholder="До"
            min={0}
            defaultValue={current.priceMax ?? ""}
            className="w-full rounded-lg border border-forest-900/15 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-forest-700">
          Удобства
        </span>
        <div className="flex flex-col gap-2">
          {amenities.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2.5 text-sm text-ink/80"
            >
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                defaultChecked={current.amenities.includes(amenity)}
                className="size-4 rounded border-forest-900/30 text-forest-800 focus:ring-forest-700"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-full bg-forest-900 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-800"
        >
          Применить
        </button>
        <a
          href="/chalets"
          className="flex-1 rounded-full border border-forest-900/20 px-6 py-2.5 text-center text-sm font-medium text-forest-900 transition-colors hover:bg-forest-50"
        >
          Сбросить
        </a>
      </div>
    </form>
  );
}
