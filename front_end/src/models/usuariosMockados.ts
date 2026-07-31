export interface Usuario {
  nome: string;
  email: string;
  senhaHash: string;
}

// TODO: Todas essas funções foram aposentadas (agora usamos o MongoDB no Backend!)
// const CHAVE_STORAGE = 'illury_usuarios';
// export const obterUsuarios = (): Usuario[] => { ... }
// export const usuarioExiste = (email: string): boolean => { ... }
// export const cadastrarUsuario = (usuario: Usuario): void => { ... }
// export const validarCredenciais = (email: string, senhaTentativa: string): boolean => { ... }

