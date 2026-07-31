import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { InputPadrao } from '../componentes/inputPadrao';
import { BotaoPadrao } from '../componentes/botaoPadrao';
// Importação de usuários mockados removida (agora usando Node.js / MongoDB)

const API_URL = import.meta.env.VITE_SERVER || 'http://localhost:5000';

export const Login = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();
  
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [etapa, setEtapa] = useState<1 | 2>(state.codigo2FAGerado && !state.autenticado ? 2 : 1);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoInserido, setCodigoInserido] = useState('');
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const enviarEmail2FA = async (emailDestino: string) => {
    setCarregando(true);
    setErro(null);

    const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    dispatch({ type: 'GERAR_2FA', payload: codigoGerado });

    // Chaves de envio real do EmailJS da Illury
    const SERVICE_ID = 'service_ple8wy8';
    const TEMPLATE_ID = 'template_fl3ptsr';
    const PUBLIC_KEY = 'kFxVP4vncsZEdPiF_';

    const templateParams = {
      to_email: emailDestino,
      codigo_2fa: codigoGerado,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('E-mail enviado com sucesso via EmailJS!');
      setEtapa(2);
      } catch (error: any) {
        console.error('Falha ao enviar e-mail:', error);
        const mensagemErro = error?.text || error?.message || JSON.stringify(error);
        setErro(`Falha no envio (EmailJS): ${mensagemErro}. [Mapeamento: Codigo=${codigoGerado}]`);
        // Para não travar o desenvolvimento, mesmo dando erro, permitimos avançar
        setEtapa(2);
      } finally {
        setCarregando(false);
      }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) return;
    
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || 'Erro ao fazer login.');
        setCarregando(false);
        return;
      }
      
      // Login aprovado no Backend, prossegue com 2FA
      dispatch({ type: 'INICIAR_LOGIN', payload: email });
      await enviarEmail2FA(email);
    } catch (error) {
      console.error(error);
      setErro('Erro ao conectar com o servidor. O Backend está rodando?');
      setCarregando(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !senha) return;
    
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(`${API_URL}/api/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || 'Erro ao realizar cadastro.');
        setCarregando(false);
        return;
      }
      
      // Cadastro aprovado no Backend, prossegue com 2FA
      dispatch({ type: 'INICIAR_LOGIN', payload: email });
      await enviarEmail2FA(email);
    } catch (error) {
      console.error(error);
      setErro('Erro ao conectar com o servidor. O Backend está rodando?');
      setCarregando(false);
    }
  };

  const handleValidar2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoInserido === state.codigo2FAGerado) {
      dispatch({ type: 'CONFIRMAR_2FA' });
      navigate('/cesta');
    } else {
      setErro('Código 2FA inválido! Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md bg-illury-beje dark:bg-illury-marrom-escuro p-8 rounded-xl shadow-2xl textura-borda">
        
        {etapa === 1 && (
          <>
            <h2 className="text-3xl font-bold text-center text-illury-marrom-escuro dark:text-illury-dourado mb-6">
              {modo === 'login' ? 'Acesso ao Cofre' : 'Novo Cadastro'}
            </h2>
            
            {erro && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4 text-sm text-center">
                {erro}
              </div>
            )}

            {modo === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col">
                <InputPadrao 
                  label="E-mail" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="mago@illury.com"
                />
                <InputPadrao 
                  label="Palavra Mágica (Senha)" 
                  type="password" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                  required 
                  placeholder="********"
                />
                <BotaoPadrao 
                  texto={carregando ? "Autenticando..." : "Entrar"} 
                  type="submit" 
                  className="mt-4" 
                  disabled={carregando}
                />
                <p className="mt-4 text-center text-sm text-illury-marrom dark:text-illury-beje">
                  Ainda não tem a chave do cofre?{' '}
                  <button type="button" onClick={() => { setModo('cadastro'); setErro(null); }} className="font-bold text-illury-dourado-escuro dark:text-illury-dourado hover:underline">
                    Cadastre-se
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleCadastro} className="flex flex-col">
                <InputPadrao 
                  label="Seu Nome Mágico" 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required 
                  placeholder="Gandalf"
                />
                <InputPadrao 
                  label="E-mail" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="mago@illury.com"
                />
                <InputPadrao 
                  label="Palavra Mágica (Senha)" 
                  type="password" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                  required 
                  placeholder="********"
                />
                <BotaoPadrao 
                  texto={carregando ? "Forjando Chave..." : "Criar Cadastro"} 
                  type="submit" 
                  className="mt-4" 
                  disabled={carregando}
                />
                <p className="mt-4 text-center text-sm text-illury-marrom dark:text-illury-beje">
                  Já possui uma chave?{' '}
                  <button type="button" onClick={() => { setModo('login'); setErro(null); }} className="font-bold text-illury-dourado-escuro dark:text-illury-dourado hover:underline">
                    Entrar
                  </button>
                </p>
              </form>
            )}
          </>
        )}

        {etapa === 2 && (
          <form onSubmit={handleValidar2FA} className="flex flex-col">
            <h2 className="text-3xl font-bold text-center text-illury-marrom-escuro dark:text-illury-dourado mb-6">
              Autenticação 2FA
            </h2>
            <p className="mb-4 text-center text-illury-marrom dark:text-illury-beje">
              Um código mágico foi enviado ao seu grimório (e-mail). Insira-o abaixo.
            </p>
            {erro && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4 text-sm text-center">
                {erro}
              </div>
            )}

            <InputPadrao 
              label="Código de 6 Dígitos" 
              type="text" 
              maxLength={6}
              value={codigoInserido} 
              onChange={(e) => setCodigoInserido(e.target.value)} 
              required 
              className="text-center text-2xl tracking-widest"
              placeholder="000000"
            />
            <BotaoPadrao texto="Verificar Código" type="submit" className="mt-4" />
            <button 
              type="button" 
              onClick={() => {
                dispatch({ type: 'LOGOUT' }); // Limpa o estado 2FA
                setEtapa(1);
                setErro(null);
              }}
              className="mt-4 text-sm text-illury-marrom dark:text-illury-beje hover:underline"
            >
              Cancelar e voltar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
