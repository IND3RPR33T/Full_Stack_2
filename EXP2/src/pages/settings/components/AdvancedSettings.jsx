import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const AdvancedSettings = ({ 
  language, 
  onLanguageChange,
  timezone,
  onTimezoneChange,
  calendarSync,
  onCalendarSyncChange,
  autoBackup,
  onAutoBackupChange,
  onClearCache,
  onResetSettings 
}) => {
  const languageOptions = [
    { value: 'en', label: 'English', description: 'United States' },
    { value: 'es', label: 'Español', description: 'Spanish' },
    { value: 'fr', label: 'Français', description: 'French' },
    { value: 'de', label: 'Deutsch', description: 'German' },
    { value: 'zh', label: '中文', description: 'Chinese' },
    { value: 'ja', label: '日本語', description: 'Japanese' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)', description: 'UTC-5' },
    { value: 'America/Chicago', label: 'Central Time (CT)', description: 'UTC-6' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', description: 'UTC-7' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', description: 'UTC-8' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', description: 'UTC+0' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', description: 'UTC+9' }
  ];

  const calendarOptions = [
    { value: 'none', label: 'No Integration', description: 'Keep calendars separate' },
    { value: 'google', label: 'Google Calendar', description: 'Sync with Google Calendar' },
    { value: 'outlook', label: 'Microsoft Outlook', description: 'Sync with Outlook Calendar' },
    { value: 'apple', label: 'Apple Calendar', description: 'Sync with iCloud Calendar' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Advanced Settings
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Configure language, timezone, and integration preferences
        </p>
      </div>
      <div className="space-y-6">
        <Select
          label="Language"
          description="Choose your preferred language for the interface"
          options={languageOptions}
          value={language}
          onChange={onLanguageChange}
        />

        <Select
          label="Timezone"
          description="Set your local timezone for accurate event scheduling"
          options={timezoneOptions}
          value={timezone}
          onChange={onTimezoneChange}
        />

        <Select
          label="Calendar Integration"
          description="Sync your campus events with external calendar applications"
          options={calendarOptions}
          value={calendarSync}
          onChange={onCalendarSyncChange}
        />

        <div className="p-4 md:p-6 bg-card rounded-xl border border-border">
          <Checkbox
            label="Automatic Backup"
            description="Automatically backup your preferences and data to the cloud"
            checked={autoBackup}
            onChange={(e) => onAutoBackupChange(e?.target?.checked)}
          />
        </div>
      </div>
      <div className="p-4 md:p-6 bg-card rounded-xl border border-border space-y-4">
        <div className="flex items-center space-x-3">
          <Icon name="Settings2" size={24} className="text-primary" />
          <div>
            <h4 className="font-heading font-semibold text-foreground">
              System Maintenance
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Clear cache or reset all settings to defaults
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onClearCache}
          >
            Clear Cache
          </Button>

          <Button
            variant="destructive"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onResetSettings}
          >
            Reset All Settings
          </Button>
        </div>
      </div>
      <div className="p-4 md:p-6 bg-muted rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm md:text-base font-medium text-foreground">
              About Calendar Sync
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              When you enable calendar integration, your campus events, class schedules, and assignment deadlines will automatically appear in your chosen calendar app. You can disconnect at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;