import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebarcomponent";

export const DashboardLayout = () => {
  const navigate = useNavigate();

  function handleNavigate(item: any) {
    if (item?.href) navigate(item.href);
  }

  return (
    <div
      className="min-h-screen bg-white text-gray-900 font-sans relative"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      <div className="flex">
        <Sidebar
          defaultCollapsed={false}
          onNavigate={handleNavigate}
          variant="default"
          className="sticky top-0 h-screen"
        />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
