import React, { useEffect, useState } from 'react';
import { obterCatalogo, Produto } from '../models/dadosMockados';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { BotaoPadrao } from '../componentes/botaoPadrao';

export const Catalogo = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { dispatch } = usarContextoGlobal();

  useEffect(() => {
    setProdutos(obterCatalogo());
  }, []);

  const handleAdicionar = (produto: Produto) => {
    dispatch({ type: 'ADICIONAR_CESTA', payload: produto });
    alert(`${produto.nome} foi adicionado à sua cesta!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-illury-marrom-escuro dark:text-illury-beje mb-8 text-center">
        Catálogo de Artefatos Mágicos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="flex flex-col bg-illury-beje dark:bg-illury-marrom-escuro p-4 rounded-xl shadow-lg textura-borda transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex-1 flex justify-center items-center h-48 mb-4 overflow-hidden">
              <img 
                src={produto.imagem} 
                alt={produto.nome} 
                className="max-h-full object-contain drop-shadow-md"
              />
            </div>
            
            <h2 className="text-xl font-bold text-illury-marrom-escuro dark:text-illury-dourado mb-2">
              {produto.nome}
            </h2>
            
            <div className="text-sm text-illury-marrom dark:text-illury-beje mb-4 flex-1">
              <p><span className="font-semibold">Poder:</span> {produto.poderMagico}</p>
              <p><span className="font-semibold">Elemento:</span> {produto.elemento}</p>
              <p><span className="font-semibold">Raridade:</span> {produto.raridade}</p>
            </div>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg font-bold text-illury-marrom-escuro dark:text-illury-beje">
                {produto.preco} moedas
              </span>
              <BotaoPadrao 
                texto="Comprar" 
                onClick={() => handleAdicionar(produto)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
