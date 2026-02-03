import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onToggleHistory, showHistory }) => {
  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleHistory}
            className="lg:hidden"
          >
            <Icon name={showHistory ? 'X' : 'Menu'} size={24} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={24} color="var(--color-primary-foreground)" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                Smart Campus Assistant
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Online & Ready to Help
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            title="Clear conversation"
          >
            <Icon name="Trash2" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Settings"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;