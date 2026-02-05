import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Type definitions
interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number | null;
}

interface LogoConfig {
  text: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarConfig {
  logo: LogoConfig;
  navigation: NavigationItem[];
  footer?: NavigationItem[];
}

interface SidebarProps {
  config?: SidebarConfig;
  defaultCollapsed?: boolean;
  onNavigate?: (item: NavigationItem) => void;
  className?: string;
  variant?: "default" | "floating" | "bordered";
}

interface SidebarItemProps {
  item: NavigationItem;
  isActive: boolean;
  isCollapsed: boolean;
  onItemClick: (item: NavigationItem) => void;
}

const defaultSidebarConfig: SidebarConfig = {
  logo: {
    text: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  navigation: [
    {
      id: "monitors",
      label: "Monitors",
      icon: Home,
      href: "/dashboard/monitors",
      badge: null,
    },
    { id: "users", label: "Users", icon: Users, href: "/dashboard/users", badge: "12" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      badge: null,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      badge: null,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
      badge: "3",
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      href: "/dashboard/search",
      badge: null,
    },
  ],
  footer: [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/settings",
      badge: null,
    },
  ],
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  isCollapsed,
  onItemClick,
}) => {
  const IconComponent = item.icon;

  return (
    <button
      onClick={() => onItemClick(item)}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative
        ${
          isActive
            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }
        ${isCollapsed ? "justify-center" : "justify-start"}
      `}
      title={isCollapsed ? item.label : undefined}
      type="button"
    >
      <IconComponent size={20} className="flex-shrink-0" />
      {!isCollapsed && (
        <>
          <span className="font-medium">{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-red-500 text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && item.badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 py-0.5 rounded-full min-w-[16px] text-center text-white">
          {item.badge}
        </span>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  config = defaultSidebarConfig,
  defaultCollapsed = false,
  onNavigate = (item: NavigationItem) => console.log("Navigate to:", item),
  className = "",
  variant = "default",
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch notification count
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/v1/notifications/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNotificationCount(data.count || 0);
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
      }
    };

    fetchNotificationCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update notification badge
  const navigationWithCount = config.navigation.map((item) => {
    if (item.id === "notifications") {
      return { ...item, badge: notificationCount > 0 ? notificationCount : null };
    }
    return item;
  });

  const handleItemClick = (item: NavigationItem): void => {
    navigate(item.href);
    onNavigate(item);
  };

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  // Get active item based on current path
  const getActiveId = () => {
    if (location.pathname.includes("/dashboard/notifications")) return "notifications";
    if (location.pathname.includes("/dashboard/monitor")) return "monitors";
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/monitors") return "monitors";
    return "monitors";
  };

  const sidebarVariants: Record<string, string> = {
    default: "bg-gray-900 border-r border-gray-800",
    floating:
      "bg-gray-900/95 backdrop-blur-sm rounded-r-2xl border border-gray-800/50 shadow-2xl",
    bordered: "bg-gray-900 border-2 border-purple-500/20 rounded-r-xl",
  };

  const LogoIcon = config.logo.icon;

  return (
    <div
      className={`
        ${isCollapsed ? "w-16" : "w-64"} 
        h-screen flex flex-col transition-all duration-300 ease-in-out
        ${sidebarVariants[variant]}
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <LogoIcon size={24} className="text-purple-500" />
              <h1 className="font-bold text-lg">{config.logo.text}</h1>
            </div>
          )}
          {isCollapsed && (
            <LogoIcon size={24} className="text-purple-500 mx-auto" />
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-800 transition-colors"
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigationWithCount.map((item) => (
          <div key={item.id} className="relative">
            <SidebarItem
              item={item}
              isActive={getActiveId() === item.id}
              isCollapsed={isCollapsed}
              onItemClick={handleItemClick}
            />
          </div>
        ))}
      </nav>

      {/* Footer */}
      {config.footer && config.footer.length > 0 && (
        <div className="p-3 border-t border-gray-800 space-y-1">
          {config.footer.map((item) => (
            <div key={item.id} className="relative">
              <SidebarItem
                item={item}
                isActive={getActiveId() === item.id}
                isCollapsed={isCollapsed}
                onItemClick={handleItemClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
