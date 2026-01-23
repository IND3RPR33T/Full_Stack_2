import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AccountSection = ({ 
  profileData, 
  onProfileUpdate,
  onPasswordChange,
  onAvatarChange 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Account Information
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your personal details and account settings
        </p>
      </div>
      <div className="p-4 md:p-6 bg-card rounded-xl border border-border space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={profileData?.avatar}
                alt={profileData?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onAvatarChange}
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-warm-lg hover:scale-110 transition-smooth"
              aria-label="Change profile picture"
            >
              <Icon name="Camera" size={20} color="var(--color-primary-foreground)" />
            </button>
          </div>

          <div className="flex-1 w-full space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={profileData?.name}
              onChange={(e) => onProfileUpdate('name', e?.target?.value)}
              placeholder="Enter your full name"
            />

            <Input
              label="Student ID"
              type="text"
              value={profileData?.studentId}
              disabled
              description="Your student ID cannot be changed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => onProfileUpdate('email', e?.target?.value)}
            placeholder="your.email@university.edu"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => onProfileUpdate('phone', e?.target?.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Department"
            type="text"
            value={profileData?.department}
            onChange={(e) => onProfileUpdate('department', e?.target?.value)}
            placeholder="Computer Science"
          />

          <Input
            label="Year of Study"
            type="text"
            value={profileData?.year}
            onChange={(e) => onProfileUpdate('year', e?.target?.value)}
            placeholder="3rd Year"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={() => onProfileUpdate('save')}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="p-4 md:p-6 bg-card rounded-xl border border-border space-y-4">
        <div className="flex items-center space-x-3">
          <Icon name="Lock" size={24} className="text-primary" />
          <div>
            <h4 className="font-heading font-semibold text-foreground">
              Change Password
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Key"
          iconPosition="left"
          onClick={onPasswordChange}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default AccountSection;