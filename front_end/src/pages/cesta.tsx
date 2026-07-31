import { useNavigate } from 'react-router-dom';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { BotaoPadrao } from '../componentes/botaoPadrao';

export const Cesta = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();

  const total = state.cesta.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const handleFinalizarCompra = () => {
    if (!state.autenticado) {
      navigate('/login');
    } else {
      alert("Sucesso! Os seus itens mágicos já estão sendo despachados pelo nosso sistema IoT.");
      dispatch({ type: 'LOGOUT' }); // Limpa a cesta como demonstração de sucesso
      navigate('/');
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-illury-marrom-escuro dark:text-illury-beje mb-8">
        Sua Cesta Mágica
      </h1>

      {state.cesta.length === 0 ? (
        <p className="text-xl text-illury-marrom dark:text-illury-beje text-center my-16">
          Sua cesta está vazia. Explore o catálogo para encontrar itens lendários!
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de Itens */}
          <div className="flex-1 bg-illury-beje dark:bg-illury-marrom-escuro p-6 rounded-xl shadow-lg textura-borda">
            {state.cesta.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-illury-marrom dark:border-illury-marrom-escuro py-4 last:border-0">
                <div className="flex items-center space-x-4">
                  <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-contain bg-white dark:bg-gray-800 rounded-md p-1" />
                  <div>
                    <h3 className="font-bold text-illury-marrom-escuro dark:text-illury-dourado">{item.nome}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <button 
                        className="bg-illury-marrom bg-opacity-20 hover:bg-opacity-40 text-illury-marrom-escuro dark:text-illury-beje dark:bg-opacity-40 px-2 py-0.5 rounded font-bold transition-colors"
                        onClick={() => dispatch({ type: 'DIMINUIR_CESTA', payload: item.id })}
                        title="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-illury-marrom dark:text-illury-beje w-4 text-center">{item.quantidade}</span>
                      <button 
                        className="bg-illury-marrom bg-opacity-20 hover:bg-opacity-40 text-illury-marrom-escuro dark:text-illury-beje dark:bg-opacity-40 px-2 py-0.5 rounded font-bold transition-colors"
                        onClick={() => dispatch({ type: 'ADICIONAR_CESTA', payload: item })}
                        title="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-illury-marrom-escuro dark:text-illury-beje">{item.preco * item.quantidade} moedas</span>
                  <BotaoPadrao 
                    texto="Remover" 
                    variante="perigo" 
                    onClick={() => dispatch({ type: 'REMOVER_CESTA', payload: item.id })} 
                    className="text-xs px-2 py-1"
                  />
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-4 border-t-2 border-illury-marrom dark:border-illury-marrom-escuro flex justify-between items-center text-xl font-bold">
              <span className="text-illury-marrom-escuro dark:text-illury-beje">Total:</span>
              <span className="text-illury-dourado-escuro dark:text-illury-dourado">{total} moedas</span>
            </div>
            
            <BotaoPadrao 
              texto={state.autenticado ? "Finalizar Compra" : "Entrar para Finalizar Compra"} 
              onClick={handleFinalizarCompra}
              className="w-full mt-6" 
            />
          </div>

          {/* Espaço IoT Futuro */}
          <div className="w-full lg:w-1/3 bg-illury-pessego dark:bg-illury-pessego-escuro p-6 rounded-xl shadow-lg textura-borda-solida flex flex-col h-fit">
            <h2 className="text-xl font-bold text-illury-marrom-escuro dark:text-illury-beje mb-4 border-b border-illury-marrom pb-2">
              Status do Pedido (IoT)
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 text-illury-marrom-escuro dark:text-illury-beje opacity-50">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="font-semibold">Produto sendo empacotado</span>
              </div>
              <div className="flex items-center space-x-3 text-illury-marrom-escuro dark:text-illury-beje opacity-50">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="font-semibold">Produto em andamento (Viagem)</span>
              </div>
              <div className="flex items-center space-x-3 text-illury-marrom-escuro dark:text-illury-beje opacity-50">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="font-semibold">Produto entregue</span>
              </div>
            </div>
            <p className="text-sm mt-6 text-illury-marrom-escuro dark:text-illury-beje italic">
              * Sensores IoT serão conectados em breve para rastreamento mágico em tempo real.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
