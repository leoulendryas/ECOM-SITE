import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const filterOptions = {
  Category: ['Shirt', 'Pants', 'Hoodie', 'Sweatshirt'],
  Price: ['400-500', '500-900', '900-1500', '1500-2000'],
  Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Fit: ['Regular Fit', 'Slim Fit', 'Loose Fit'],
  Color: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Orange', 'Pink', 'Gray', 'Brown', 'Beige'],
};

const filters = Object.keys(filterOptions);

const FilterSection: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-md">
      {/* Filter Header */}
      <div className="flex justify-between items-center pb-2 mb-4">
        <h2 className="text-xl font-bold">Filter & Sort</h2>
        <button className="text-sm text-gray-500 font-semibold">Clear All</button>
      </div>

      <hr className="text-gray-200 mb-4 mt-4" />

      {/* Filter Categories with space-y */}
      <div className="space-y-4">
        {filters.map((filter, index) => (
          <div key={index}>
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFilter(filter)}
            >
              <span className="font-bold text-lg">{filter}</span>
              <FiChevronDown
                className={`transform transition-transform border rounded-full text-xl ${
                  activeFilters.includes(filter) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeFilters.includes(filter) && (
              <div className="mt-2 pl-4">
                {filterOptions[filter].map((option, idx) => (
                  <div key={idx} className="text-gray-700 text-sm mb-2">
                    <input className="" type="checkbox" id={`${filter}-${option}`} className="mr-2" />
                    <label className="text-darkGray text-md font-medium" htmlFor={`${filter}-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            <hr className="text-gray-200 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
