import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationPanel = ({ destination, currentLocation, onClose }) => {
  const [routeType, setRouteType] = useState('walking');

  const directions = [
    { step: 1, instruction: 'Head north on Main Campus Road', distance: '50m', duration: '1 min' },
    { step: 2, instruction: 'Turn right at Science Plaza', distance: '120m', duration: '2 min' },
    { step: 3, instruction: 'Continue straight past the fountain', distance: '80m', duration: '1 min' },
    { step: 4, instruction: `Arrive at ${destination?.name}`, distance: '0m', duration: '0 min' }
  ];

  const totalDistance = '250m';
  const totalDuration = '4 min';

  return (
    <div className="fixed inset-0 z-1200 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-heading font-bold">Navigation</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={20} />
            </div>
            <div>
              <p className="text-sm opacity-90">Destination</p>
              <p className="font-semibold">{destination?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Navigation" size={18} />
              <span className="font-semibold">{totalDistance}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={18} />
              <span className="font-semibold">{totalDuration}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-6">
            <Button
              variant={routeType === 'walking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRouteType('walking')}
              iconName="PersonStanding"
            >
              Walking
            </Button>
            <Button
              variant={routeType === 'accessible' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRouteType('accessible')}
              iconName="Accessibility"
            >
              Accessible
            </Button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {directions?.map((direction) => (
              <div key={direction?.step} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {direction?.step}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium mb-1">{direction?.instruction}</p>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <span>{direction?.distance}</span>
                    <span>•</span>
                    <span>{direction?.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Route Information</p>
                <p className="text-xs text-muted-foreground">
                  This route is wheelchair accessible and includes ramps and elevators. Estimated time may vary based on walking speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;