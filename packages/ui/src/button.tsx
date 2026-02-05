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
      "bg-black hover:bg-yellow-600 text-white hover:cursor-pointer transition-all duration-200",
    terteary:
      "bg-black hover:bg-yellow-600 text-white hover:cursor-pointer px-4 transition-all duration-200",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
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
