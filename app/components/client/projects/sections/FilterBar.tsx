// "use client";

// import { DIVISIONS, LOCATIONS, SECTORS, STATUSES } from "../data";
// import FilterSelectDropDown from "../../common/FilterSelectDropDown";

// export interface Filters {
//   division: string | null;
//   sector: string | null;
//   location: string | null;
//   status: string | null;
// }

// interface FilterBarProps {
//   filters: Filters;
//   onChange: (filters: Filters) => void;
// }

// export const EMPTY_FILTERS: Filters = {
//   division: null,
//   sector: null,
//   location: null,
//   status: null,
// };

// export default function FilterBar({ filters, onChange }: FilterBarProps) {
//   return (
//     <div className="flex flex-wrap xl:flex-nowrap items-end gap-y-20 bg-cream-background px-30 py-30 3xl:py-[26px] rounded-[10px] gap-50">
//       <div className="grid w-full xl:w-auto xl:flex-1 min-[1900px]:flex-none grid-cols-2 xl:grid-cols-4 gap-6 self-end pb-[7px]">
//         <FilterSelectDropDown
//           label="Division"
//           options={DIVISIONS}
//           value={filters.division}
//           onChange={(division) => onChange({ ...filters, division })}
//           className="3xl:max-w-[340px]"
//         />
//         <FilterSelectDropDown
//           label="Sector"
//           options={SECTORS}
//           value={filters.sector}
//           onChange={(sector) => onChange({ ...filters, sector })}
//           className="3xl:max-w-[340px]"
//         />
//         <FilterSelectDropDown
//           label="Location"
//           options={LOCATIONS}
//           value={filters.location}
//           onChange={(location) => onChange({ ...filters, location })}
//           className="3xl:max-w-[340px]"
//         />
//         <FilterSelectDropDown
//           label="Status"
//           options={STATUSES}
//           value={filters.status}
//           onChange={(status) => onChange({ ...filters, status })}
//           className="3xl:max-w-[340px]"
//         />
//       </div>

//       <button
//         type="button"
//         onClick={() => onChange(EMPTY_FILTERS)}
//         className="shrink-0 ml-auto self-end bg-primary px-5 py-2.5 xl:p-5 text-15 font-bold font-tasa rounded-[5px] leading-[1.3333333] uppercase text-white cursor-pointer group"
//       >
//         <p className="group-hover:scale-[1.06] transition-transform duration-400 ease-in-out">
//           Reset
//         </p>
//       </button>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-cream-background px-5 sm:px-30 py-[15px] sm:py-30 3xl:py-[26px] rounded-[10px]">
      {/* MOBILE — below sm */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between text-subtitle uppercase cursor-pointer"
        >
          Filter
          <motion.div
            animate={{ rotate: mobileOpen ? 45 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Image
              src="/assets/icons/plus.svg"
              alt="toggle filters"
              width={20}
              height={20}
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="flex flex-col gap-20 pt-50">
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

                <button
                  type="button"
                  onClick={() => onChange(EMPTY_FILTERS)}
                  className="self-end shrink-0 bg-primary px-5 py-3 text-15 font-bold font-tasa rounded-[5px] leading-[1.3333333] uppercase text-white cursor-pointer group"
                >
                  <p className="group-hover:scale-[1.06] transition-transform duration-400 ease-in-out">
                    Reset
                  </p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP — sm and up (unchanged) */}
      <div className="hidden sm:flex flex-wrap xl:flex-nowrap items-end gap-y-20">
        <div className="grid w-full xl:w-auto xl:flex-1 grid-cols-2 xl:grid-cols-4 gap-6 self-end pb-[7px]">
          <FilterSelectDropDown
            label="Division"
            options={DIVISIONS}
            value={filters.division}
            onChange={(division) => onChange({ ...filters, division })}
            className="3xl:max-w-[340px]"
          />
          <FilterSelectDropDown
            label="Sector"
            options={SECTORS}
            value={filters.sector}
            onChange={(sector) => onChange({ ...filters, sector })}
            className="3xl:max-w-[340px]"
          />
          <FilterSelectDropDown
            label="Location"
            options={LOCATIONS}
            value={filters.location}
            onChange={(location) => onChange({ ...filters, location })}
            className="3xl:max-w-[340px]"
          />
          <FilterSelectDropDown
            label="Status"
            options={STATUSES}
            value={filters.status}
            onChange={(status) => onChange({ ...filters, status })}
            className="3xl:max-w-[340px]"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange(EMPTY_FILTERS)}
          className="shrink-0 ml-auto self-end bg-primary px-5 py-3 xl:p-5 text-15 font-bold font-tasa rounded-[5px] leading-[1.3333333] uppercase text-white cursor-pointer group"
        >
          <p className="group-hover:scale-[1.06] transition-transform duration-400 ease-in-out">
            Reset
          </p>
        </button>
      </div>
    </div>
  );
}