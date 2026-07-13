"use client";

import { DIVISIONS, LOCATIONS, SECTORS, STATUSES } from "../data";
import FilterSelectDropDown from "../../common/FilterSelectDropDown";

export interface Filters {
  division: string | null;
  sector: string | null;
  location: string | null;
  status: string | null;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export const EMPTY_FILTERS: Filters = {
  division: null,
  sector: null,
  location: null,
  status: null,
};

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex justify-between bg-cream-background px-30  py-30 3xl:py-[26px] rounded-[10px]">
      <div className="grid flex-1 3xl:flex-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-[88%] 3xl:max-w-auto self-end pb-[7px]">
        <FilterSelectDropDown
          label="Division"
          options={DIVISIONS}
          value={filters.division}
          onChange={(division) => onChange({ ...filters, division })}
        />
        <FilterSelectDropDown
          label="Sector"
          options={SECTORS}
          value={filters.sector}
          onChange={(sector) => onChange({ ...filters, sector })}
        />
        <FilterSelectDropDown
          label="Location"
          options={LOCATIONS}
          value={filters.location}
          onChange={(location) => onChange({ ...filters, location })}
        />
        <FilterSelectDropDown
          label="Status"
          options={STATUSES}
          value={filters.status}
          onChange={(status) => onChange({ ...filters, status })}
        />
      </div>

      <button
        type="button"
        onClick={() => onChange(EMPTY_FILTERS)}
        className="shrink-0 bg-primary p-5 text-15 font-bold font-tasa rounded-[5px] leading-[1.3333333] uppercase text-white cursor-pointer group"
      >
        <p className="group-hover:scale-[1.06] transition-transform duration-400 ease-in-out">
          Reset
        </p>
      </button>
    </div>
  );
}
