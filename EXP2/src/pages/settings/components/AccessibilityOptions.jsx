import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AccessibilityOptions = ({ 
  fontSize, 
  onFontSizeChange, 
  highContrast, 
  onHighContrastChange,
  reducedMotion,
  onReducedMotionChange,
  keyboardNav,
  onKeyboardNavChange,
  screenReader,
  onScreenReaderChange
}) => {
  const fontSizeOptions = [
    { value: 'small', label: 'Small (14px)', description: 'Compact text for more content' },
    { value: 'default', label: 'Default (16px)', description: 'Standard readable size' },
    { value: 'large', label: 'Large (18px)', description: 'Easier to read' },
    { value: 'xlarge', label: 'Extra Large (20px)', description: 'Maximum readability' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Accessibility Features
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Customize the interface to meet your accessibility needs
        </p>
      </div>
      <div className="space-y-6">
        <Select
          label="Font Size"
          description="Adjust text size for better readability"
          options={fontSizeOptions}
          value={fontSize}
          onChange={onFontSizeChange}
        />

        <div className="space-y-4 p-4 md:p-6 bg-card rounded-xl border border-border">
          <Checkbox
            label="High Contrast Mode"
            description="Increase contrast between text and background for better visibility and reduced eye strain"
            checked={highContrast}
            onChange={(e) => onHighContrastChange(e?.target?.checked)}
          />

          <Checkbox
            label="Reduce Motion"
            description="Minimize animations and transitions for a calmer, more focused experience"
            checked={reducedMotion}
            onChange={(e) => onReducedMotionChange(e?.target?.checked)}
          />

          <Checkbox
            label="Enhanced Keyboard Navigation"
            description="Improve keyboard shortcuts and focus indicators for navigation without a mouse"
            checked={keyboardNav}
            onChange={(e) => onKeyboardNavChange(e?.target?.checked)}
          />

          <Checkbox
            label="Screen Reader Optimization"
            description="Enhance compatibility with screen readers and assistive technologies"
            checked={screenReader}
            onChange={(e) => onScreenReaderChange(e?.target?.checked)}
          />
        </div>

        <div className="p-4 md:p-6 bg-accent bg-opacity-10 rounded-xl border border-accent">
          <div className="flex items-start space-x-3">
            <Icon name="Heart" size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm md:text-base font-medium text-foreground">
                Accessibility Matters
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                We're committed to making SmartCampusAssistant accessible to everyone. These features help ensure all students can navigate campus effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityOptions;