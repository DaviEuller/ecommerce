import { useEffect } from 'react';
import { Appbar } from './componentes/appbar';
import { AppRoutes } from './routes';
import { inicializarMockData } from './models/dadosMockados';

function App() {
  useEffect(() => {
    // Inicializa o localStorage com os dados do catálogo se estiver vazio
    inicializarMockData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Appbar />
      <main className="flex-grow flex flex-col">
        <AppRoutes />
      </main>
      
      {/* Rodapé Simples */}
      <footer className="bg-illury-marrom dark:bg-illury-marrom-escuro text-white text-center p-4 mt-8">
        <p>© 2026 Illury - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
