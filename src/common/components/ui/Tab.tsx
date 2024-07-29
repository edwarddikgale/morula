// components/Tabs.tsx
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className='d-flex '>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{ cursor: "pointer" }}
            className={`py-3 px-2 me-4 cu ${
              activeTab === tab.id ? "active-border text-primary" : " text-secondary "
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className='my-5'>
        {tabs.map((tab) => (
          <div key={tab.id} style={{ display: activeTab === tab.id ? "block" : "none" }}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
