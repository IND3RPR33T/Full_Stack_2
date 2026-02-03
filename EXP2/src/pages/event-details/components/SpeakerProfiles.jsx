import React from 'react';
import Icon from '../../../components/AppIcon';

const SpeakerProfiles = ({ speakers }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Speakers</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {speakers?.map((speaker, index) => (
          <div
            key={index}
            className="bg-muted bg-opacity-50 rounded-lg p-6 transition-smooth hover:bg-opacity-100"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={32} color="var(--color-primary-foreground)" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                  {speaker?.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {speaker?.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {speaker?.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerProfiles;