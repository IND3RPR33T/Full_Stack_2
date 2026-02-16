import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TiltedCard from './TiltedCard';


const FeaturedCarousel = ({ events, onEventClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events?.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events?.length - 1 ? 0 : prev + 1));
  };

  const currentEvent = events?.[currentIndex];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Star" size={24} color="var(--color-primary)" />
          <span>Featured Events</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            iconName="ChevronLeft"
          />
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {events?.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            iconName="ChevronRight"
          />
        </div>
      </div>

      <div
        className="relative bg-card rounded-xl shadow-warm-lg overflow-hidden cursor-pointer group"
        onClick={() => onEventClick(currentEvent?.id)}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={currentEvent?.image}
              alt={currentEvent?.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                {currentEvent?.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                {currentEvent?.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentEvent?.description}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-semibold text-foreground">{formatDate(currentEvent?.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-semibold text-foreground">{currentEvent?.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">{currentEvent?.location}</p>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={(e) => {
                e?.stopPropagation();
                onEventClick(currentEvent?.id);
              }}
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full md:w-auto"
            >
              View Event Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;