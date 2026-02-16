import React from 'react';

import Button from '../../../components/ui/Button';

const ConversationHistory = ({ conversations, activeConversationId, onSelectConversation, onNewConversation }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-full lg:w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 md:p-6 border-b border-border">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={onNewConversation}
        >
          New Conversation
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Recent Conversations
        </h3>
        
        {conversations?.map((conversation) => (
          <button
            key={conversation?.id}
            onClick={() => onSelectConversation(conversation?.id)}
            className={`
              w-full text-left p-3 md:p-4 rounded-lg transition-smooth
              ${activeConversationId === conversation?.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm md:text-base line-clamp-1">
                {conversation?.title}
              </h4>
              <span className={`text-xs ${activeConversationId === conversation?.id ? 'text-primary-foreground opacity-75' : 'text-muted-foreground'}`}>
                {formatDate(conversation?.timestamp)}
              </span>
            </div>
            <p className={`text-xs md:text-sm line-clamp-2 ${activeConversationId === conversation?.id ? 'text-primary-foreground opacity-90' : 'text-muted-foreground'}`}>
              {conversation?.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationHistory;