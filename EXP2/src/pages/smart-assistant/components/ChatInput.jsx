import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 bg-card border-t border-border p-4 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-2 md:space-x-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Attach file"
          >
            <Icon name="Paperclip" size={20} />
          </Button>

          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type your message or ask a question..."
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Voice input"
          >
            <Icon name="Mic" size={20} />
          </Button>

          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message?.trim() || disabled}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};

export { ChatInput };
