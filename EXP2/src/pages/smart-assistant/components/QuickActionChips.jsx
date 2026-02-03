import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionChips = ({ onActionClick }) => {
  const quickActions = [
    { id: 1, label: "Find Building", icon: "MapPin", query: "Help me find the Engineering Building" },
    { id: 2, label: "Check Schedule", icon: "Calendar", query: "Show me my schedule for today" },
    { id: 3, label: "Campus Events", icon: "PartyPopper", query: "What events are happening this week?" },
    { id: 4, label: "Library Hours", icon: "BookOpen", query: "What are the library hours?" },
    { id: 5, label: "Dining Options", icon: "UtensilsCrossed", query: "Where can I eat on campus?" },
    { id: 6, label: "Transportation", icon: "Bus", query: "Tell me about campus shuttle services" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
      {quickActions?.map((action) => (
        <button
          key={action?.id}
          onClick={() => onActionClick(action?.query)}
          className="
            flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2.5
            bg-card text-card-foreground rounded-full
            border border-border hover:border-primary
            transition-smooth hover:shadow-warm
            text-xs md:text-sm font-medium
          "
        >
          <Icon name={action?.icon} size={16} />
          <span>{action?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActionChips;