export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "red" | "blue" | "green" | "yellow";
  size?: "sm" | "md";
}> = ({ children, variant = "red", size = "sm" }) => {
  const variants = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  };

  const sizes = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
  };

  return (
    <span
      className={`${variants[variant]} ${sizes[size]} text-white rounded-full font-medium`}
    >
      {children}
    </span>
  );
};
