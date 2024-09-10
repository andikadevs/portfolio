'use client'

import React, { useState } from 'react';

interface TabItem {
  name: string;
  icon: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  contentRenderer?: (activeTab: string) => React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, contentRenderer }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="flex justify-even">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`p-2 font-normal text-sm flex-1 flex items-center justify-center gap-2 border border-accent 
              transition duration-300 ease-in-out px-0 md:px-2
              hover:bg-accent hover:text-secondary 
              ${activeTab === tab.name ? 'bg-accent text-main' : 'bg-transparent text-text'}`}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.icon} {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[300px] px-3">
        {contentRenderer ? contentRenderer(activeTab) : <p>No content renderer provided.</p>}
      </div>
    </div>
  );
};
