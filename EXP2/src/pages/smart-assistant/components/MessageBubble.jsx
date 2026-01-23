import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 md:mb-6`}>
      <div className={`flex items-start space-x-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="var(--color-primary-foreground)" />
          </div>
        )}
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`
              px-4 py-3 md:px-5 md:py-4 rounded-xl transition-smooth
              ${isUser
                ? 'bg-primary text-primary-foreground rounded-tr-none'
                : 'bg-card text-card-foreground shadow-warm rounded-tl-none'
              }
            `}
          >
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
              {message?.content}
            </p>
            
            {message?.richContent && (
              <div className="mt-3 md:mt-4 space-y-3">
                {message?.richContent?.type === 'map' && (
                  <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title={message?.richContent?.title}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${message?.richContent?.lat},${message?.richContent?.lng}&z=16&output=embed`}
                      className="border-0"
                    />
                  </div>
                )}
                
                {message?.richContent?.type === 'schedule' && (
                  <div className="bg-muted rounded-lg p-3 md:p-4 space-y-2">
                    {message?.richContent?.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs md:text-sm">
                        <span className="font-medium">{item?.time}</span>
                        <span className="text-muted-foreground">{item?.subject}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {message?.richContent?.type === 'image' && (
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={message?.richContent?.src}
                      alt={message?.richContent?.alt}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            )}
            
            {message?.actions && message?.actions?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
                {message?.actions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={action?.onClick}
                    className={`
                      px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium
                      transition-smooth flex items-center space-x-1.5
                      ${isUser
                        ? 'bg-primary-foreground text-primary hover:bg-opacity-90'
                        : 'bg-primary text-primary-foreground hover:bg-opacity-90'
                      }
                    `}
                  >
                    {action?.icon && <Icon name={action?.icon} size={16} />}
                    <span>{action?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <span className={`text-xs text-muted-foreground mt-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
            {formatTime(message?.timestamp)}
          </span>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-secondary-foreground)" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;