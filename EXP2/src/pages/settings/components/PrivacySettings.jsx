import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PrivacySettings = ({ 
  privacyOptions, 
  onPrivacyChange,
  onDataExport,
  onAccountDelete 
}) => {
  const privacyControls = [
    {
      id: 'profileVisibility',
      label: 'Public Profile',
      description: 'Allow other students to view your profile information',
      icon: 'Eye',
      warning: false
    },
    {
      id: 'locationSharing',
      label: 'Location Sharing',
      description: 'Share your campus location with friends for meetups',
      icon: 'MapPin',
      warning: false
    },
    {
      id: 'activityStatus',
      label: 'Activity Status',
      description: 'Show when you\'re online and active on the platform',
      icon: 'Activity',
      warning: false
    },
    {
      id: 'dataAnalytics',
      label: 'Usage Analytics',
      description: 'Help improve the app by sharing anonymous usage data',
      icon: 'BarChart3',
      warning: false
    },
    {
      id: 'thirdPartySharing',
      label: 'Third-Party Integration',
      description: 'Allow integration with external calendar and productivity apps',
      icon: 'Share2',
      warning: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Privacy & Data
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Control your data and privacy preferences
        </p>
      </div>
      <div className="space-y-3">
        {privacyControls?.map((control) => (
          <div
            key={control?.id}
            className="p-4 md:p-6 bg-card rounded-xl border border-border"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={control?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={control?.label}
                  description={control?.description}
                  checked={privacyOptions?.[control?.id]}
                  onChange={(e) => onPrivacyChange(control?.id, e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 md:p-6 bg-card rounded-xl border border-border space-y-4">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={24} className="text-primary" />
          <div>
            <h4 className="font-heading font-semibold text-foreground">
              Data Management
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Export or delete your personal data
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onDataExport}
          >
            Export My Data
          </Button>

          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={onAccountDelete}
          >
            Delete Account
          </Button>
        </div>
      </div>
      <div className="p-4 md:p-6 bg-accent bg-opacity-10 rounded-xl border border-accent">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm md:text-base font-medium text-foreground">
              Your Privacy is Protected
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              We use industry-standard encryption to protect your data. Your information is never sold to third parties and is only used to improve your campus experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;