export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    ghost: "hover:bg-gray-800 text-gray-300 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} rounded-lg transition-colors font-medium ${className}`}
    >
      {children}
    </button>
  );
};
