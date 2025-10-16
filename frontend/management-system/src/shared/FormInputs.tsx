interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function FormInput({
  label,
  labelClassName,
  inputClassName,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col items-start">
      <label className={`font-semibold text-white text-[21px] font-urbanist ${labelClassName}`}>
        {label}
      </label>
      <input
        {...props}
        className={`border border-solid border-[#333440] w-full rounded-[10px] px-3.5 py-2 h-10 bg-[#141521] outline-none text-black-500 placeholder-black-500 font-inter text-[11px] font-medium ${inputClassName}`}
      />
    </div>
  );
}
