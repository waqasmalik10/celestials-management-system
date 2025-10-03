interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonClasses?: string;
}

export default function Button({
  children,
  buttonClasses,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${buttonClasses} text-center text-base font-semibold outline-none cursor-pointer`}
    >
      {children}
    </button>
  );
}
