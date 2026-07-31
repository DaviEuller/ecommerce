import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { obterCatalogo, Produto } from '../models/dadosMockados';
import { BotaoPadrao } from '../componentes/botaoPadrao';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [destaques, setDestaques] = useState<Produto[]>([]);

  useEffect(() => {
    // Carrega os dados mockados
    const produtos = obterCatalogo();
    // Pega alguns produtos para destaque no carrossel
    setDestaques(produtos.slice(0, 3));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Banner Superior com Personagem */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center bg-illury-verde dark:bg-illury-verde-escuro p-8 rounded-xl shadow-lg mb-12 textura-borda-solida">
        <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-illury-marrom-escuro dark:text-illury-beje mb-4">
            Bem-vindo à Illury!
          </h1>
          <p className="text-xl text-illury-marrom dark:text-illury-beje mb-6 font-medium">
            Descubra os artefatos mágicos mais poderosos de todo o reino.
          </p>
          <Link to="/catalogo">
            <BotaoPadrao texto="Explorar o Catálogo" variante="primario" className="text-lg" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/luiz-db-survive.firebasestorage.app/o/acessorios%2Fpersongem-5.png?alt=media&token=ff508ca0-d058-4bd3-a4bc-7ffa7e83a370" 
            alt="Mago da Loja" 
            className="w-64 md:w-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Seção de Carrossel */}
      <section className="w-full max-w-4xl mt-8">
        <h2 className="text-3xl font-bold text-illury-marrom-escuro dark:text-illury-beje text-center mb-6">
          Artefatos em Destaque
        </h2>
        <div className="overflow-hidden rounded-xl textura-borda" ref={emblaRef}>
          <div className="flex">
            {destaques.map((item) => (
              <div key={item.id} className="flex-[0_0_100%] min-w-0 flex flex-col items-center p-6 bg-illury-beje dark:bg-illury-marrom-escuro">
                <img src={item.imagem} alt={item.nome} className="h-64 object-contain mb-4 drop-shadow-lg" />
                <h3 className="text-2xl font-bold text-illury-marrom-escuro dark:text-illury-dourado mb-2">{item.nome}</h3>
                <p className="text-lg font-semibold text-illury-marrom dark:text-illury-beje">💎 {item.preco} moedas</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
