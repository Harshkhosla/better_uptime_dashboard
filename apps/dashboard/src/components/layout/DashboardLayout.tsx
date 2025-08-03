import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebarcomponent";

export const DashboardLayout = () => {
  const navigate = useNavigate();

  function handleNavigate(item: any) {
    if (item?.href) navigate(item.href);
  }

  return (
    <div
      className="min-h-screen bg-dark-950 text-white font-sans relative overflow-hidden"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="relative z-10 flex">
        <Sidebar
          defaultCollapsed={false}
          onNavigate={handleNavigate}
          variant="bordered"
          className="relative"
        />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
