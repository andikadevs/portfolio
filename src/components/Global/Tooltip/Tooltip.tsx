import React from 'react';

interface TooltipProps {
  label: string;
  hasArrow?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ label, hasArrow = true, position = 'top', children }) => {
  const tooltipPosition = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2'
  };

  const arrowPosition = {
    top: 'bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-gray-800',
    right: 'left-[-5px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-gray-800',
    bottom: 'top-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[5px] border-b-gray-800',
    left: 'right-[-5px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[5px] border-l-gray-800'
  };

  return (
    <div className="relative inline-block tooltip-trigger">
      {children}
      <div
        className={`absolute ${tooltipPosition[position]} w-max max-w-xs px-2 py-1 text-white bg-gray-800 rounded-md shadow-lg text-sm hidden tooltip-trigger-hover:block`}
      >
        {hasArrow && (
          <div
            className={`absolute ${arrowPosition[position]}`}
          />
        )}
        {label}
      </div>
    </div>
  );
};
