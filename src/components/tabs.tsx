import { TabType } from "@/types/tabs";
import { useState } from "react";

// export function Tabs() {
//   const [activeTab, setActiveTab] = useState(0);
//   return (
//     <div>
//       <div>
//         <button onClick={() => setActiveTab(0)}>Tab 1</button>
//         <button onClick={() => setActiveTab(1)}>Tab 2</button>
//         <button onClick={() => setActiveTab(2)}>Tab 3</button>
//       </div>
//       {activeTab === 0 && <div>Tab 1</div>}
//       {activeTab === 1 && <div>Tab 2</div>}
//       {activeTab === 2 && <div>Tab 3</div>}
//     </div>
//   );
// }

export function Tabs({
  tabs,
  renderTab,
}: {
  tabs: TabType[];
  renderTab: (tab: TabType, isActive: boolean) => React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      {tabs.map((tab, index) => (
        <button key={tab.title} onClick={() => setActiveTab(index)}>
          {tab.title}
        </button>
      ))}
      {tabs.map((tab, index) => renderTab(tab, index === activeTab))}
    </div>
  );
}

export function Tab({
  content,
  isActive,
}: {
  content: string;
  isActive: boolean;
}) {
  return isActive ? (
    <div className="border border-gray-300 rounded-md p-4">{content}</div>
  ) : null;
}
