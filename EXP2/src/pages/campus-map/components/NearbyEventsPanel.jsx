import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NearbyEventsPanel = ({ events, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-heading font-bold text-foreground flex items-center space-x-2">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <span>Nearby Events</span>
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-muted rounded-lg flex items-center justify-center transition-smooth"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {events?.length > 0 ? (
          events?.map(event => (
            <div
              key={event?.id}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:shadow-warm-md transition-all duration-300 cursor-pointer hover:border-primary"
              onClick={() => navigate('/event-details')}
            >
              <h3 className="font-semibold text-foreground mb-2 text-sm">{event?.title}</h3>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Navigation" size={14} />
                  <span>{event?.distance} away</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{event?.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={14} />
                  <span>{event?.attendees} attending</span>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    navigate('/event-details');
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="CalendarX" size={48} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No nearby events</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Calendar"
          onClick={() => navigate('/events-notices')}
        >
          View All Events
        </Button>
      </div>
    </div>
  );
};

export default NearbyEventsPanel;