import React, { InputHTMLAttributes } from 'react';

interface InputPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputPadrao: React.FC<InputPadraoProps> = ({ label, className, ...props }) => {
  return (
    <div className={`flex flex-col mb-4 ${className || ''}`}>
      {label && <label className="mb-1 font-semibold text-illury-marrom-escuro dark:text-illury-beje">{label}</label>}
      <input 
        className="px-3 py-2 border-2 border-illury-marrom rounded-md bg-illury-beje text-illury-marrom-escuro 
                   focus:outline-none focus:border-illury-dourado dark:bg-illury-marrom-escuro dark:text-illury-beje 
                   dark:border-illury-beje-escuro dark:focus:border-illury-dourado transition-colors"
        {...props} 
      />
    </div>
  );
};
