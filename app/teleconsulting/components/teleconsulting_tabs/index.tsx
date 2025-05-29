'use client';

import React from 'react';

export type TabKey = 'respondidas' | 'devolvidas' | 'enviadas' | 'rascunhos';

export interface TabDefinition {
  key: TabKey;
  label: string;
  status: string[];
}

interface TeleconsultingTabsProps {
  tabs: ReadonlyArray<TabDefinition>;
  activeTab: TabKey;
  tabCounts: { [K in TabKey]?: number };
  onTabChange: (tabKey: TabKey) => void;
}

export const TeleconsultingTabs: React.FC<TeleconsultingTabsProps> = ({
  tabs,
  activeTab,
  tabCounts,
  onTabChange
}) => {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-6 md:space-x-8 min-w-max px-4 md:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    ({tabCounts[tab.key] || 0})
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};