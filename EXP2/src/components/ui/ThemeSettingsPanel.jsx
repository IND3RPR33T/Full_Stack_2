import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { Checkbox } from './Checkbox';
import Select from './Select';

const ThemeSettingsPanel = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('default');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'default';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setReducedMotion(savedReducedMotion);
    setHighContrast(savedHighContrast);

    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyReducedMotion(savedReducedMotion);
    applyHighContrast(savedHighContrast);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  const applyReducedMotion = (enabled) => {
    if (enabled) {
      document.documentElement?.classList?.add('reduce-motion');
    } else {
      document.documentElement?.classList?.remove('reduce-motion');
    }
  };

  const applyHighContrast = (enabled) => {
    if (enabled) {
      document.documentElement?.classList?.add('high-contrast');
    } else {
      document.documentElement?.classList?.remove('high-contrast');
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
    applyFontSize(newSize);
  };

  const handleReducedMotionChange = (e) => {
    const enabled = e?.target?.checked;
    setReducedMotion(enabled);
    localStorage.setItem('reducedMotion', enabled);
    applyReducedMotion(enabled);
  };

  const handleHighContrastChange = (e) => {
    const enabled = e?.target?.checked;
    setHighContrast(enabled);
    localStorage.setItem('highContrast', enabled);
    applyHighContrast(enabled);
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small (14px)' },
    { value: 'default', label: 'Default (16px)' },
    { value: 'large', label: 'Large (18px)' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background"
        onClick={onClose}
      />
      
      <div className="relative bg-card rounded-xl shadow-warm-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Theme & Accessibility Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close settings"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Appearance
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`
                  p-6 rounded-lg border-2 transition-smooth
                  ${theme === 'light' ?'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon name="Sun" size={32} color={theme === 'light' ? 'var(--color-primary)' : 'currentColor'} />
                  <span className="font-medium">Light Mode</span>
                </div>
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`
                  p-6 rounded-lg border-2 transition-smooth
                  ${theme === 'dark' ?'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon name="Moon" size={32} color={theme === 'dark' ? 'var(--color-primary)' : 'currentColor'} />
                  <span className="font-medium">Dark Mode</span>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Typography
            </h3>
            
            <Select
              label="Font Size"
              description="Adjust the base font size for better readability"
              options={fontSizeOptions}
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Accessibility
            </h3>
            
            <div className="space-y-4">
              <Checkbox
                label="Reduce Motion"
                description="Minimize animations and transitions for a calmer experience"
                checked={reducedMotion}
                onChange={handleReducedMotionChange}
              />

              <Checkbox
                label="High Contrast"
                description="Increase contrast between text and background for better visibility"
                checked={highContrast}
                onChange={handleHighContrastChange}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={onClose}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsPanel;