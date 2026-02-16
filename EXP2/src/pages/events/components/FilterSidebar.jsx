import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedDepartment,
  setSelectedDepartment,
  dateRange,
  setDateRange,
  onClearFilters,
  isMobileOpen,
  onMobileClose
}) => {
  const categoryOptions = [
    { value: 'Academic', label: 'Academic' },
    { value: 'Social', label: 'Social' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Administrative', label: 'Administrative' }
  ];

  const departmentOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Athletics', label: 'Athletics' },
    { value: 'Career Services', label: 'Career Services' },
    { value: 'Student Affairs', label: 'Student Affairs' },
    { value: 'International Students', label: 'International Students' },
    { value: 'Research Office', label: 'Research Office' },
    { value: 'Student Wellness', label: 'Student Wellness' },
    { value: 'Business', label: 'Business' },
    { value: 'Library Services', label: 'Library Services' },
    { value: 'Graduate Studies', label: 'Graduate Studies' },
    { value: 'Environmental Studies', label: 'Environmental Studies' },
    { value: 'Alumni Relations', label: 'Alumni Relations' },
    { value: 'Student Activities', label: 'Student Activities' }
  ];

  const hasActiveFilters = selectedCategory || selectedDepartment || dateRange?.start || dateRange?.end;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filters</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Category
        </label>
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="All Categories"
          clearable
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Department
        </label>
        <Select
          options={departmentOptions}
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          placeholder="All Departments"
          searchable
          clearable
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Date Range
        </label>
        <div className="space-y-3">
          <Input
            type="date"
            value={dateRange?.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e?.target?.value })}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={dateRange?.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e?.target?.value })}
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Filters</span>
            <span className="font-semibold text-foreground">
              {[selectedCategory, selectedDepartment, dateRange?.start, dateRange?.end]?.filter(Boolean)?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="bg-card rounded-xl shadow-warm-md p-6 sticky top-24">
          <FilterContent />
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-1100 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onMobileClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-warm-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Filter Events
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMobileClose}
                  iconName="X"
                />
              </div>
              <FilterContent />
              <div className="mt-6">
                <Button
                  variant="default"
                  size="lg"
                  onClick={onMobileClose}
                  fullWidth
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;