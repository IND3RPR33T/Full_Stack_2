import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4 md:mb-6">
      <div className="flex items-start space-x-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
        </div>
        
        <div className="bg-card text-card-foreground shadow-warm px-4 py-3 md:px-5 md:py-4 rounded-xl rounded-tl-none">
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;