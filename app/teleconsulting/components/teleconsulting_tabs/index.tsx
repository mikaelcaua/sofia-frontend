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
    <div>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                ({tabCounts[tab.key] || 0})
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
