import React from 'react';
import Icon from '../../../components/AppIcon';


const ThemeSection = ({ theme, onThemeChange }) => {
  const themeOptions = [
    {
      value: 'light',
      label: 'Light Mode',
      icon: 'Sun',
      description: 'Clean and bright interface for daytime use'
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      icon: 'Moon',
      description: 'Easy on the eyes for low-light environments'
    },
    {
      value: 'auto',
      label: 'Auto',
      icon: 'Laptop',
      description: 'Follows your system preferences'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Theme Appearance
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Choose how SmartCampusAssistant looks to you
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themeOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => onThemeChange(option?.value)}
            className={`
              p-6 rounded-xl border-2 transition-smooth
              ${theme === option?.value
                ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-muted'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center
                ${theme === option?.value ? 'bg-primary' : 'bg-muted'}
              `}>
                <Icon 
                  name={option?.icon} 
                  size={32} 
                  color={theme === option?.value ? 'var(--color-primary-foreground)' : 'currentColor'} 
                />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground mb-1">
                  {option?.label}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {option?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSection;