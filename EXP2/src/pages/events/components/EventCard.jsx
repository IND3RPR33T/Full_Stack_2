import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import ElectricBorder from '../../../components/ui/ElectricBorder';

const EventCard = ({ event, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      Academic: 'bg-primary text-primary-foreground',
      Social: 'bg-purple-500 text-white',
      Sports: 'bg-success text-success-foreground',
      Administrative: 'bg-warning text-warning-foreground'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  const getCategoryBorderColor = (category) => {
    const colors = {
      Academic: '#5227FF',
      Social: '#a855f7',
      Sports: '#10b981',
      Administrative: '#f59e0b'
    };
    return colors?.[category] || '#6b7280';
  };

  const handleAddToCalendar = (e) => {
    e?.stopPropagation();
    setShowToast('Added to calendar');
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    setShowToast('Link copied to clipboard');
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleGetDirections = (e) => {
    e?.stopPropagation();
    setShowToast('Opening directions');
    setTimeout(() => setShowToast(null), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <ElectricBorder
        color={getCategoryBorderColor(event?.category)}
        speed={1}
        chaos={0.12}
        borderRadius={16}
        style={{ borderRadius: 16 }}
      >
        <div
          className={cn(
            "bg-card rounded-xl shadow-warm-md overflow-hidden cursor-pointer transition-all duration-300",
            isHovered && "shadow-warm-lg transform -translate-y-1"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={event?.image}
              alt={event?.alt}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isHovered && "scale-110"
              )}
            />
            <div className="absolute top-3 right-3">
              <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", getCategoryColor(event?.category))}>
                {event?.category}
              </span>
            </div>
            {event?.isNew && (
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-error text-error-foreground flex items-center space-x-1">
                  <Icon name="Sparkles" size={12} />
                  <span>New</span>
                </span>
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2">
              {event?.title}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>{formatDate(event?.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{event?.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span className="line-clamp-1">{event?.location}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {event?.description}
            </p>

            {event?.maxAttendees > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{event?.attendees} attending</span>
                  <span>{event?.maxAttendees} capacity</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event?.attendees / event?.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddToCalendar}
                iconName="CalendarPlus"
                className="flex-1"
              >
                Calendar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                iconName="Share2"
                className="flex-1"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGetDirections}
                iconName="Navigation"
                className="flex-1"
              >
                Directions
              </Button>
            </div>
          </div>
        </div>
      </ElectricBorder>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-warm-lg flex items-center space-x-2 animate-fade-in">
          <Icon name="Check" size={20} />
          <span className="font-medium">{showToast}</span>
        </div>
      )}
    </>
  );
};

export default EventCard;