import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchPanel = ({ searchQuery, setSearchQuery, categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search buildings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories?.map(category => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`
              flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth
              ${selectedCategory === category?.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;