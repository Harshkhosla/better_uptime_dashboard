import { Monitors } from "./Monitors";
import Sidebar from "./Sidebarcomponent";

export const Dashboard = () => {
  function handleNavigate(item: any) {
    console.log("Navigating to:", item.href);
    // Navigation logic goes here
  }

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-hidden"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      <div className="relative z-10 flex bg-gray-50">
        <Sidebar
          defaultCollapsed={false}
          onNavigate={handleNavigate}
          variant="default"
          className="relative"
        />
        <div className="flex-1">
          <Monitors />
        </div>
      </div>
    </div>
  );
};
