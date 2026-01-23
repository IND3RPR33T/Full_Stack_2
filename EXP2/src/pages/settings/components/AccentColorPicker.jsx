import React from 'react';
import Icon from '../../../components/AppIcon';

const AccentColorPicker = ({ selectedColor, onColorChange }) => {
  const accentColors = [
    { name: 'Ocean Blue', value: '#0F4C75', preview: 'bg-[#0F4C75]' },
    { name: 'Forest Green', value: '#2D6A4F', preview: 'bg-[#2D6A4F]' },
    { name: 'Royal Purple', value: '#6B46C1', preview: 'bg-[#6B46C1]' },
    { name: 'Sunset Orange', value: '#DD6B20', preview: 'bg-[#DD6B20]' },
    { name: 'Ruby Red', value: '#C53030', preview: 'bg-[#C53030]' },
    { name: 'Midnight Blue', value: '#1E3A8A', preview: 'bg-[#1E3A8A]' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Accent Color
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Personalize your interface with your favorite color
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {accentColors?.map((color) => (
          <button
            key={color?.value}
            onClick={() => onColorChange(color?.value)}
            className={`
              group relative p-4 rounded-xl border-2 transition-smooth
              ${selectedColor === color?.value
                ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`
                w-12 h-12 md:w-16 md:h-16 rounded-full ${color?.preview}
                flex items-center justify-center transition-smooth
                group-hover:scale-110
              `}>
                {selectedColor === color?.value && (
                  <Icon name="Check" size={24} color="white" />
                )}
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground text-center">
                {color?.name}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 md:p-6 bg-muted rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Your selected accent color will be applied to buttons, links, and interactive elements throughout the application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccentColorPicker;