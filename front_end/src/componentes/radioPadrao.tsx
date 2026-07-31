import React, { InputHTMLAttributes } from 'react';

interface RadioPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioPadrao: React.FC<RadioPadraoProps> = ({ label, className, ...props }) => {
  return (
    <label className={`flex items-center space-x-2 cursor-pointer mb-2 text-illury-marrom-escuro dark:text-illury-beje ${className || ''}`}>
      <input 
        type="radio" 
        className="form-radio text-illury-dourado focus:ring-illury-dourado bg-illury-beje dark:bg-illury-marrom dark:border-illury-beje-escuro transition duration-150 ease-in-out" 
        {...props} 
      />
      <span>{label}</span>
    </label>
  );
};
