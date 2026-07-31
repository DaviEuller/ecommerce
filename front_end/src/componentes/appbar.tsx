import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, User, LogOut, LogIn, Sun, Moon } from 'lucide-react';
import { usarContextoGlobal } from '../models/contextoGlobal';

export const Appbar = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();

  const [temaClaro, setTemaClaro] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') ? false : true;
  });

  useEffect(() => {
    if (temaClaro) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [temaClaro]);

  const toggleTema = () => {
    setTemaClaro(!temaClaro);
  };

  const totalCesta = state.cesta.reduce((acc, item) => acc + item.quantidade, 0);

  const handleSair = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header className="bg-illury-pessego dark:bg-illury-pessego-escuro shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/luiz-db-survive.firebasestorage.app/o/acessorios%2Flogo.png?alt=media&token=12faab0c-3bea-4aa5-b87e-a4d5def5728e" 
            alt="Illury Logo" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Navegação Principal */}
        <nav className="hidden md:flex space-x-6 text-illury-marrom-escuro dark:text-illury-beje font-bold">
          <Link to="/" className="hover:text-illury-dourado transition-colors">Home</Link>
          <Link to="/catalogo" className="hover:text-illury-dourado transition-colors">Catálogo</Link>
        </nav>

        {/* Ações (Autenticação e Cesta) */}
        <div className="flex items-center space-x-4 text-illury-marrom-escuro dark:text-illury-beje">
          {state.autenticado ? (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline font-semibold">Olá, {state.usuario}</span>
              <button onClick={handleSair} className="hover:text-illury-dourado transition-colors" title="Sair">
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="hover:text-illury-dourado transition-colors flex items-center" title="Entrar">
                <LogIn size={24} />
                <span className="hidden sm:inline ml-1 font-semibold">Entrar</span>
              </Link>
            </div>
          )}

          {/* Cesta com badge */}
          <Link to="/cesta" className="relative hover:text-illury-dourado transition-colors mr-2" title="Cesta">
            <ShoppingBasket size={28} />
            {totalCesta > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCesta}
              </span>
            )}
          </Link>

          {/* Botão de Tema */}
          <button 
            onClick={toggleTema} 
            className="hover:text-illury-dourado transition-colors p-2 rounded-full bg-illury-marrom bg-opacity-20 dark:bg-opacity-40"
            title="Alternar Tema"
          >
            {temaClaro ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
