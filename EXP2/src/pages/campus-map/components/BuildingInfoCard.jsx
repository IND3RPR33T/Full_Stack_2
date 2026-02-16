import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BuildingInfoCard = ({ building, onClose, onGetDirections, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-card rounded-xl shadow-warm-lg overflow-hidden animate-fade-in">
      <div className="relative h-32">
        <img
          src={building?.image}
          alt={building?.alt}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-smooth"
        >
          <Icon name="X" size={16} />
        </button>
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 left-2 w-8 h-8 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-smooth"
        >
          <Icon 
            name={isFavorite ? 'Star' : 'StarOff'} 
            size={16} 
            color={isFavorite ? 'var(--color-warning)' : 'currentColor'}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-heading font-bold text-foreground mb-1">
          {building?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{building?.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2 text-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
            <span className="text-muted-foreground">{building?.hours}</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <Icon name="Accessibility" size={16} className="text-muted-foreground mt-0.5" />
            <span className="text-muted-foreground">{building?.accessibility}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-1.5">
            {building?.facilities?.map((facility, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={onGetDirections}
            iconName="Navigation"
            className="flex-1"
          >
            Directions
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            className="flex-1"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildingInfoCard;