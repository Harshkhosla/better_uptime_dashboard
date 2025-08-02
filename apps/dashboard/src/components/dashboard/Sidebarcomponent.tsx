import React, { useState } from "react";
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
    href: "/",
  },
  navigation: [
    { id: "Monitors", label: "Monitors", icon: Home, href: "/", badge: null },
    { id: "users", label: "Users", icon: Users, href: "/users", badge: "12" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      badge: null,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      href: "/documents",
      badge: null,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
      badge: "3",
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      href: "/search",
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
  const [activeItem, setActiveItem] = useState<string>("home");

  const handleItemClick = (item: NavigationItem): void => {
    setActiveItem(item.id);
    onNavigate(item);
  };

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
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
        {config.navigation.map((item) => (
          <div key={item.id} className="relative">
            <SidebarItem
              item={item}
              isActive={activeItem === item.id}
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
                isActive={activeItem === item.id}
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
