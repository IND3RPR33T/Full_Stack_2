import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedEvents = ({ events, onEventClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Related Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {events?.map((event) => (
          <div
            key={event?.id}
            className="bg-card rounded-xl shadow-warm-md overflow-hidden cursor-pointer transition-smooth hover:shadow-warm-lg hover:transform hover:-translate-y-1"
            onClick={() => onEventClick(event?.id)}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={event?.image}
                alt={event?.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {event?.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                {event?.title}
              </h3>
              <div className="space-y-1 mb-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(event?.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span className="line-clamp-1">{event?.location}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedEvents;