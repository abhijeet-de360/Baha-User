'use client';

import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ageOptions = [
  '0–6 Months',
  '6–12 Months',
  '1–2 Years',
  '2–4 Years',
  '4–6 Years',
  '6–8 Years',
];

const genderOptions = ['Boy', 'Girl'];
const sizeOptions = ['Newborn', '0–3M', '3–6M', '6–12M', '1–2Y', '2–4Y', '4–6Y', '6–8Y'];
const colorOptions = ['Yellow', 'Pink', 'Blue', 'Green', 'White', 'Multicolor'];
const priceOptions = ['Under ₹499', '₹499–₹999', '₹999–₹1,499', 'Over ₹1,499'];
const discountOptions = ['10% and above', '20% and above', '30% and above', '50% and above'];

type FilterKey = 'age' | 'gender' | 'size' | 'color' | 'price' | 'discount';
type FilterState = Record<FilterKey, string[]>;

const initialFilters: FilterState = {
  age: [],
  gender: [],
  size: [],
  color: [],
  price: [],
  discount: [],
};

interface FilterGroupProps {
  title: string;
  options: string[];
  filterKey: FilterKey;
  selected: string[];
  onToggle: (filterKey: FilterKey, option: string) => void;
}

function FilterGroup({ title, options, filterKey, selected, onToggle }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="border-b border-[#EFECE6] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-bold text-text-main">{title}</span>
        <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${isOpen ? '' : '-rotate-90'}`} />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2.5">
          {options.map((option) => {
            const inputId = `${filterKey}-${option}`;

            return (
              <label key={option} htmlFor={inputId} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-muted hover:text-brand-purple">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(filterKey, option)}
                  className="h-4 w-4 rounded border-[#D9D2C8] accent-brand-purple"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}

const ProductFilterSection = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const toggleFilter = (filterKey: FilterKey, option: string) => {
    setFilters((current) => {
      const selected = current[filterKey];
      const nextSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];

      return { ...current, [filterKey]: nextSelected };
    });
  };

  const resetFilters = () => setFilters(initialFilters);

  return (
    <aside className="h-fit rounded-2xl border border-[#EFECE6] bg-white p-4 shadow-xs lg:sticky lg:top-24">
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-brand-purple" />
          <h2 className="font-heading text-base font-bold text-text-main">Filter Products</h2>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2 text-xs text-text-muted">
          Clear all
        </Button>
      </div>

      <FilterGroup title="Age" filterKey="age" options={ageOptions} selected={filters.age} onToggle={toggleFilter} />
      <FilterGroup title="Gender" filterKey="gender" options={genderOptions} selected={filters.gender} onToggle={toggleFilter} />
      <FilterGroup title="Size" filterKey="size" options={sizeOptions} selected={filters.size} onToggle={toggleFilter} />
      <FilterGroup title="Color" filterKey="color" options={colorOptions} selected={filters.color} onToggle={toggleFilter} />
      <FilterGroup title="Price" filterKey="price" options={priceOptions} selected={filters.price} onToggle={toggleFilter} />
      <FilterGroup title="Discount" filterKey="discount" options={discountOptions} selected={filters.discount} onToggle={toggleFilter} />
    </aside>
  );
};

export default ProductFilterSection;