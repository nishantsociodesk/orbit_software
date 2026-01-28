'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchStorefrontProducts } from '@/lib/storefrontApi';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

interface ProductsDropdownProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function ProductsDropdown({ onFilterChange }: ProductsDropdownProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFilter = (categoryId: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[categoryId] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [categoryId]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  useEffect(() => {
    onFilterChange(selectedFilters);
    window.dispatchEvent(new CustomEvent('filterChange', { detail: selectedFilters }));
  }, [selectedFilters, onFilterChange]);

  useEffect(() => {
    let isMounted = true;
    const loadFilters = async () => {
      setIsLoading(true);
      try {
        const products = await fetchStorefrontProducts();
        if (!isMounted) return;
        const uniqueCategories = Array.from(
          new Set(products.map((product) => product.category).filter(Boolean))
        ).sort();
        const uniqueBrands = Array.from(
          new Set(products.map((product) => product.brand).filter(Boolean))
        ).sort();
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        if (!isMounted) return;
        setCategories([]);
        setBrands([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFilters();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterCategories: FilterOption[] = useMemo(
    () => [
      {
        id: 'category',
        label: 'Category',
        options: categories
      },
      {
        id: 'price',
        label: 'Price Range',
        options: ['₹0 - ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+']
      },
      {
        id: 'brand',
        label: 'Brand',
        options: brands
      },
      {
        id: 'rating',
        label: 'Rating',
        options: ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars']
      }
    ],
    [brands, categories]
  );

  return (
    <div className="shadow-xl rounded-lg border p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Filter Products</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear All
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading filter options...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterCategories.map((category) => (
            <div key={category.id}>
              <h4 className="font-semibold mb-3 pb-2 border-b text-sm" style={{ color: 'var(--text)', borderColor: 'var(--card-border)' }}>
                {category.label}
              </h4>
              <div className="space-y-2">
                {category.options.length === 0 ? (
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    No options available
                  </span>
                ) : (
                  category.options.map((option) => {
                    const isSelected = (selectedFilters[category.id]?.includes(option) ?? false);
                    return (
                      <label
                        key={option}
                        htmlFor={`filter-${category.id}-${option}`}
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          id={`filter-${category.id}-${option}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleFilter(category.id, option);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="w-4 h-4 rounded cursor-pointer relative z-10"
                          style={{ accentColor: 'var(--header-text)' }}
                        />
                        <span
                          className="text-sm transition-colors"
                          style={{
                            color: isSelected ? 'var(--header-text)' : 'var(--text-muted)'
                          }}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: 'var(--card-border)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Active Filters:</span>
          {Object.entries(selectedFilters).map(([categoryId, options]) =>
            options.map((option) => (
              <button
                key={`${categoryId}-${option}`}
                onClick={() => toggleFilter(categoryId, option)}
                className="px-3 py-1 text-sm rounded-full flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--header-text)',
                  color: 'var(--header-bg)'
                }}
              >
                {option}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
