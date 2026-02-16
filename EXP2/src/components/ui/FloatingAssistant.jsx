import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const FloatingAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your Smart Campus Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message?.trim()) return;

    const userMessage = {
      id: chatHistory?.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatHistory([...chatHistory, userMessage]);
    setMessage('');

    setTimeout(() => {
      const assistantResponse = {
        id: chatHistory?.length + 2,
        type: 'assistant',
        content: 'I understand your question. Let me help you with that...',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {!isExpanded && (
        <button
          onClick={toggleExpanded}
          className="fixed bottom-6 right-6 z-1200 w-16 h-16 bg-primary rounded-full shadow-warm-xl hover:shadow-warm-2xl transition-smooth hover:scale-105 flex items-center justify-center"
          aria-label="Open Smart Assistant"
        >
          <Icon name="MessageCircle" size={28} color="var(--color-primary-foreground)" />
        </button>
      )}
      {isExpanded && (
        <div className="fixed bottom-6 right-6 z-1200 w-full max-w-md bg-card rounded-xl shadow-warm-2xl overflow-hidden lg:w-96">
          <div className="bg-primary px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <Icon name="Bot" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-primary-foreground">
                  Smart Assistant
                </h3>
                <p className="text-xs text-primary-foreground opacity-90">
                  Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={toggleExpanded}
              className="p-2 hover:bg-primary-foreground hover:bg-opacity-20 rounded-md transition-smooth"
              aria-label="Close assistant"
            >
              <Icon name="X" size={20} color="var(--color-primary-foreground)" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-background">
            {chatHistory?.map((chat) => (
              <div
                key={chat?.id}
                className={`flex ${chat?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 rounded-lg
                    ${chat?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-card text-card-foreground shadow-warm'
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed">{chat?.content}</p>
                  <p className={`text-xs mt-1 ${chat?.type === 'user' ? 'text-primary-foreground opacity-75' : 'text-muted-foreground'}`}>
                    {formatTime(chat?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-card border-t border-border">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={!message?.trim()}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;