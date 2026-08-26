interface NewsFiltersProps {
    searchQuery: string;
    selectedRegion: string;
    selectedProvince: string;

    regions: string[];
    provinces: string[];

    onSearchChange: (
        value: string
    ) => void;

    onRegionChange: (
        value: string
    ) => void;

    onProvinceChange: (
        value: string
    ) => void;
}

export default function NewsFilters({
    searchQuery,
    selectedRegion,
    selectedProvince,
    regions,
    provinces,
    onSearchChange,
    onRegionChange,
    onProvinceChange,
}: NewsFiltersProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-3 mb-10">
            {/* Search */}
            <div className="relative flex-1">
                <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search news and updates"
                    className="
            w-full
            h-12
            pl-12
            pr-5
            rounded-full
            border
            border-slate-200
            bg-white
            font-dmsans
            text-sm
            text-slate-700
            outline-none
            transition
            focus:border-sky-400
            focus:ring-2
            focus:ring-sky-100
          "
                />
            </div>

            <FilterSelect
                value={selectedRegion}
                onChange={onRegionChange}
                defaultLabel="All Regions"
                options={regions}
            />

            <FilterSelect
                value={selectedProvince}
                onChange={onProvinceChange}
                defaultLabel="All Provinces"
                options={provinces}
            />
        </div>
    );
}

interface FilterSelectProps {
    value: string;
    defaultLabel: string;
    options: string[];
    onChange: (
        value: string
    ) => void;
}

function FilterSelect({
    value,
    defaultLabel,
    options,
    onChange,
}: FilterSelectProps) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
          h-12
          pl-5
          pr-10
          rounded-full
          border
          border-slate-200
          bg-white
          font-dmsans
          text-sm
          text-slate-700
          outline-none
          cursor-pointer
          appearance-none
          focus:border-sky-400
        "
            >
                <option value="all">
                    {defaultLabel}
                </option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </div>
    );
}