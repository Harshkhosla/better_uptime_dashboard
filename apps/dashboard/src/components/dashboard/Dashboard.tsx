import Sidebar from "./Sidebarcomponent";

export const Dashboard = () => {
  function handleNavigate (item:any){
    console.log("eheheheheh",item.href)
    // Navigation()
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
      <div>
        <div className="relative z-10">
          <Sidebar
            defaultCollapsed={false}
            onNavigate={handleNavigate}
            variant="bordered"
            className="relative"
          />
        </div>
      </div>
    </div>
  );
};
