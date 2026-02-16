import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationPreferences = ({ 
  preferences, 
  onPreferenceChange,
  notificationMethod,
  onMethodChange 
}) => {
  const notificationTypes = [
    {
      id: 'events',
      label: 'Campus Events',
      description: 'Get notified about upcoming events, workshops, and activities',
      icon: 'Calendar'
    },
    {
      id: 'assignments',
      label: 'Assignment Reminders',
      description: 'Receive reminders for upcoming assignment deadlines',
      icon: 'FileText'
    },
    {
      id: 'attendance',
      label: 'Attendance Alerts',
      description: 'Get alerts when your attendance falls below threshold',
      icon: 'UserCheck'
    },
    {
      id: 'grades',
      label: 'Grade Updates',
      description: 'Be notified when new grades are posted',
      icon: 'Award'
    },
    {
      id: 'announcements',
      label: 'Important Announcements',
      description: 'Receive critical updates from administration',
      icon: 'Megaphone'
    },
    {
      id: 'messages',
      label: 'Direct Messages',
      description: 'Get notified when you receive messages from faculty or peers',
      icon: 'MessageSquare'
    }
  ];

  const methodOptions = [
    { value: 'all', label: 'Email & Push Notifications', description: 'Receive notifications through both channels' },
    { value: 'email', label: 'Email Only', description: 'Only receive email notifications' },
    { value: 'push', label: 'Push Only', description: 'Only receive push notifications' },
    { value: 'none', label: 'None', description: 'Disable all notifications' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Notification Preferences
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Choose what notifications you want to receive and how
        </p>
      </div>
      <Select
        label="Notification Method"
        description="Select how you want to receive notifications"
        options={methodOptions}
        value={notificationMethod}
        onChange={onMethodChange}
      />
      <div className="space-y-3">
        {notificationTypes?.map((type) => (
          <div
            key={type?.id}
            className="p-4 md:p-6 bg-card rounded-xl border border-border hover:border-primary transition-smooth"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={type?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={type?.label}
                  description={type?.description}
                  checked={preferences?.[type?.id]}
                  onChange={(e) => onPreferenceChange(type?.id, e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 md:p-6 bg-muted rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Bell" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm md:text-base font-medium text-foreground">
              Notification Timing
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Notifications are sent during active hours (8:00 AM - 10:00 PM) to avoid disturbances. Critical alerts may be sent outside these hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;