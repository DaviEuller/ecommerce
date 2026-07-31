import React, { ButtonHTMLAttributes } from 'react';

interface BotaoPadraoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'perigo';
  texto: string;
}

export const BotaoPadrao: React.FC<BotaoPadraoProps> = ({ variante = 'primario', texto, className, ...props }) => {
  const baseStyle = "px-4 py-2 font-bold rounded shadow-md transition-transform transform hover:scale-105 active:scale-95";
  
  const variantes = {
    primario: "bg-illury-dourado text-illury-marrom-escuro hover:bg-illury-dourado-escuro dark:bg-illury-dourado-escuro dark:text-illury-beje dark:hover:bg-illury-dourado",
    secundario: "bg-illury-verde text-illury-marrom-escuro hover:bg-illury-verde-escuro dark:bg-illury-verde-escuro dark:text-illury-beje dark:hover:bg-illury-verde",
    perigo: "bg-red-400 text-white hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600"
  };

  return (
    <button 
      className={`${baseStyle} ${variantes[variante]} ${className || ''}`}
      {...props}
    >
      {texto}
    </button>
  );
};
