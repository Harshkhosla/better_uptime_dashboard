export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "ghost" | "terteary";
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type,
}) => {
  const variants = {
    primary:
      "bg-purple-600 hover:bg-purple-700 text-white hover:cursor-pointer",
    terteary:
      "bg-purple-600 hover:bg-purple-700 text-white hover:cursor-pointer px-4",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    ghost: "hover:bg-gray-800 text-gray-300 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${variants[variant]} ${sizes[size]} rounded-lg transition-colors font-medium ${className}`}
    >
      {children}
    </button>
  );
};
