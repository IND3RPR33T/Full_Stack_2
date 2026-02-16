import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const EventAgenda = ({ agenda }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Event Agenda</h2>
      <div className="space-y-3">
        {agenda?.map((item, index) => (
          <div
            key={index}
            className="bg-muted bg-opacity-50 rounded-lg overflow-hidden transition-smooth hover:bg-opacity-100"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item?.title}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-muted-foreground">{item?.time}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item?.duration}</span>
                  </div>
                </div>
              </div>
              <Icon
                name="ChevronDown"
                size={20}
                className={cn(
                  "transition-transform text-muted-foreground",
                  expandedIndex === index && "rotate-180"
                )}
              />
            </button>
            {expandedIndex === index && item?.description && (
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground pl-14">
                  {item?.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAgenda;