export const Input = ({
  className,
  children,
  onChange,
  value,
  id,
  type,
  placeholder,
  required
}: {
  className?: string;
  children?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id:string;
  type:string;
  placeholder:string,
  required:boolean
}) => {
  return (
    <>
      <input
      id={id}
      required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        type={type}
        children={children}
        value={value}
      />
    </>
  );
};
