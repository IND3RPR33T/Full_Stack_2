import React from 'react';

import { cn } from '../../../utils/cn';

const BuildingMarker = ({ building, isSelected, onClick, style, categoryColor }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center cursor-pointer transition-all duration-300",
        isSelected && "z-10"
      )}
    >
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm",
          categoryColor.replace('bg-', 'bg-') + '/20 border-' + categoryColor.replace('bg-', '') + '/40',
          isSelected
            ? "shadow-warm-lg scale-110 border-foreground"
            : "hover:shadow-warm-md hover:scale-105"
        )}
      >
        <div className="text-white font-bold text-lg mb-1 drop-shadow-lg">{building?.shortName}</div>
        <div className="text-white text-xs opacity-90 text-center px-2 line-clamp-2 drop-shadow-md">
          {building?.name}
        </div>
        {building?.currentEvents > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
            {building?.currentEvents}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingMarker;