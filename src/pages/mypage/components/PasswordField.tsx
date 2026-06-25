import type {ChangeEventHandler, ReactNode} from 'react';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isInvalid: boolean;
  className?: string;
  children?: ReactNode;
}

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  isInvalid,
  className,
  children,
}: PasswordFieldProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className='text-body1 mb-[10px] block text-[#222222]'>
        {label}
      </label>

      <input
        id={id}
        type='password'
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid}
        className={`text-body2 h-[55px] w-full rounded-[10px] border bg-white px-[14px] outline-none ${
          isInvalid
            ? 'border-[var(--color-red-600)]'
            : 'border-[var(--color-blue-100)]'
        }`}
      />

      {children}
    </div>
  );
};

export default PasswordField;
