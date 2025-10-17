interface ModalsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    labelClassName?: string;
    inputClassName?: string;
  }
  
  export default function ModalsInput({
    label,
    labelClassName,
    inputClassName,
    ...props
  }: ModalsInputProps) {
    return (
      <div className="flex flex-col gap-2.5 items-start">
        <label className={`font-semibold text-white text-[21px] font-urbanist leading-[180%] ${labelClassName}`}>
          {label}
        </label>
        <input
          {...props}
          className={`w-full px-6 py-4 h-[65px] bg-[#a0a1a8] outline-none text-[#747681] placeholder-[#747681] font-urbanist text-lg font-medium ${inputClassName}`}
        />
      </div>
    );
  }
  