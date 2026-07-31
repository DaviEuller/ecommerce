import { ENDPOINTS_IMAGENS } from '../constantes/endpoints';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  poderMagico: string;
  raridade: string;
  elemento: string;
}

export const ARTEFATOS_INICIAIS: Produto[] = [
  {
    id: 1,
    nome: "Espada do Amanhecer",
    preco: 1500,
    imagem: ENDPOINTS_IMAGENS.ESPADA_AMANHECER,
    poderMagico: "Corte Luminoso",
    raridade: "Épica",
    elemento: "Luz"
  },
  {
    id: 2,
    nome: "Cetro da Sabedoria",
    preco: 2200,
    imagem: ENDPOINTS_IMAGENS.CETRO_SABEDORIA,
    poderMagico: "Manipulação Arcana",
    raridade: "Lendária",
    elemento: "Arcano"
  },
  {
    id: 3,
    nome: "Escudo do Guardião",
    preco: 1800,
    imagem: ENDPOINTS_IMAGENS.ESCUDO_GUARDIAO,
    poderMagico: "Barreira Impenetrável",
    raridade: "Rara",
    elemento: "Terra"
  },
  {
    id: 4,
    nome: "Armadura Dracônica",
    preco: 3500,
    imagem: ENDPOINTS_IMAGENS.ARMADURA_DRACONICA,
    poderMagico: "Imunidade a Fogo",
    raridade: "Lendária",
    elemento: "Fogo"
  },
  {
    id: 5,
    nome: "Arco dos Ventos",
    preco: 1200,
    imagem: ENDPOINTS_IMAGENS.ARCO_VENTOS,
    poderMagico: "Tiro Penetrante",
    raridade: "Rara",
    elemento: "Ar"
  }
];

export const inicializarMockData = () => {
  const data = localStorage.getItem("illury_catalogo");
  if (!data) {
    localStorage.setItem("illury_catalogo", JSON.stringify(ARTEFATOS_INICIAIS));
  }
};

export const obterCatalogo = (): Produto[] => {
  const data = localStorage.getItem("illury_catalogo");
  return data ? JSON.parse(data) : [];
};
