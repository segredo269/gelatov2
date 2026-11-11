export interface Product {
  id: string;
  name: string;
  category: 'picoles-agua' | 'picoles-cremosos' | 'paletas' | 'sorvetes' | 'acai' | 'potes-atacado' | 'sobremesas';
  categoryLabel: string;
  price: number;
  description: string;
  volumeOrWeight: string;
  badge?: string;
  ingredients: string[];
  allergens?: string;
  image: string;
  flavorColor: string;
  temperature: string;
}

export const PRODUCTS: Product[] = [
  // PALETAS MEXICANAS RECHEADAS
  {
    id: 'paleta-morango-leite-condensado',
    name: 'Paleta de Morango com Leite Condensado',
    category: 'paletas',
    categoryLabel: 'Paletas Recheadas',
    price: 12.00,
    description: 'Polpa pura de morangos selecionados com recheio cremoso e generoso de leite condensado Moça.',
    volumeOrWeight: '120g',
    badge: 'Mais Vendida',
    ingredients: ['Morangos in natura', 'Leite condensado', 'Açúcar cristal orgânico', 'Água mineral'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#e11d48',
    temperature: '-18°C'
  },
  {
    id: 'paleta-ninho-trufado',
    name: 'Paleta Ninho com Trufa de Chocolate',
    category: 'paletas',
    categoryLabel: 'Paletas Recheadas',
    price: 12.00,
    description: 'Massa aveludada de Leite Ninho puro com coração macio de ganache artesanal de chocolate meio amargo.',
    volumeOrWeight: '120g',
    badge: 'Favorito do Mestre',
    ingredients: ['Leite Ninho integral', 'Creme de leite fresco', 'Chocolate nobre 54%', 'Cacau'],
    allergens: 'Contém leite e derivados.',
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#fef08a',
    temperature: '-18°C'
  },
  {
    id: 'paleta-kinder-hazelnut',
    name: 'Paleta Kinder Bueno & Creme de Avelã',
    category: 'paletas',
    categoryLabel: 'Paletas Recheadas',
    price: 13.50,
    description: 'Casca crocante de chocolate ao leite com pedaços de avelã tostada e recheio cremoso de creme de avelã e cacau.',
    volumeOrWeight: '125g',
    badge: 'Edição Especial',
    ingredients: ['Chocolate ao leite nobre', 'Pasta pura de avelã italiana', 'Wafers crocantes', 'Leite integral'],
    allergens: 'Contém avelãs, glúten e leite.',
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#78350f',
    temperature: '-18°C'
  },

  // PICOLÉS CREMOSOS
  {
    id: 'picole-queijo-doce-de-leite',
    name: 'Picolé de Queijo Minas & Doce de Leite',
    category: 'picoles-cremosos',
    categoryLabel: 'Picolés Cremosos',
    price: 6.00,
    description: 'Homenagem às nossas raízes mineiras: queijo meia cura artesanal da Canastra com fita espessa de doce de leite de tacho.',
    volumeOrWeight: '75g',
    badge: 'Receita Mineira',
    ingredients: ['Queijo Canastra curado', 'Doce de leite mineiro', 'Leite fresco pasteurizado', 'Creme de leite'],
    allergens: 'Contém leite.',
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#d97706',
    temperature: '-16°C'
  },
  {
    id: 'picole-amendoim-torrado',
    name: 'Picolé de Paçoca Cremosa',
    category: 'picoles-cremosos',
    categoryLabel: 'Picolés Cremosos',
    price: 6.00,
    description: 'Feito com amendoim selecionado torrado artesanalmente em nossa fábrica, batido com leite integral fresco.',
    volumeOrWeight: '75g',
    ingredients: ['Amendoim torrado moído', 'Leite pasteurizado', 'Açúcar demerara', 'Sal marinho'],
    allergens: 'Contém amendoim e leite.',
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#b45309',
    temperature: '-16°C'
  },
  {
    id: 'picole-chocolate-flocos',
    name: 'Picolé Flocos Tradicional Mestre',
    category: 'picoles-cremosos',
    categoryLabel: 'Picolés Cremosos',
    price: 6.00,
    description: 'Base suave de creme de baunilha com lascas crocantes de chocolate meio amargo 50% cacau que derretem na boca.',
    volumeOrWeight: '75g',
    ingredients: ['Creme de baunilha artesanal', 'Chocolate meio amargo nobre em raspas', 'Leite integral'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#451a03',
    temperature: '-16°C'
  },

  // PICOLÉS DE ÁGUA / FRUTAS NATURAIS
  {
    id: 'picole-limao-suico',
    name: 'Picolé de Limão Suíço',
    category: 'picoles-agua',
    categoryLabel: 'Frutas Naturais (Água)',
    price: 4.50,
    description: 'Suco extraído a frio de limões taiti frescos com raspas da casca. Refrescância pura sem conservantes químicos.',
    volumeOrWeight: '70g',
    badge: '100% Vegano',
    ingredients: ['Suco de limão taiti prensado', 'Água mineral', 'Raspas cítricas', 'Açúcar cristal'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#65a30d',
    temperature: '-18°C'
  },
  {
    id: 'picole-abacaxi-hortela',
    name: 'Picolé de Abacaxi com Hortelã Fresca',
    category: 'picoles-agua',
    categoryLabel: 'Frutas Naturais (Água)',
    price: 4.50,
    description: 'Pedaços reais de abacaxi pérola infusionados com folhas frescas de hortelã orgânica.',
    volumeOrWeight: '70g',
    badge: 'Refrescante',
    ingredients: ['Abacaxi pérola in natura', 'Hortelã fresca moída', 'Água mineral leve'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#eab308',
    temperature: '-18°C'
  },
  {
    id: 'picole-uva-vitoria',
    name: 'Picolé de Uva Vitória Integral',
    category: 'picoles-agua',
    categoryLabel: 'Frutas Naturais (Água)',
    price: 4.50,
    description: 'Feito com o mais puro suco integral de uvas tintas sem caroço, preservando antioxidantes naturais.',
    volumeOrWeight: '70g',
    ingredients: ['Suco integral de uva', 'Açúcar demerara', 'Água mineral'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#7e22ce',
    temperature: '-18°C'
  },

  // SORVETES ARTESANAIS DE MASSA
  {
    id: 'gelato-pistache-siciliano',
    name: 'Gelato Pistache Puro di Bronte',
    category: 'sorvetes',
    categoryLabel: 'Gelato & Sorvetes de Massa',
    price: 18.00,
    description: 'Feito com pasta 100% pura de pistache tostado, textura ultrassedosa com pedaços crocantes de pistache salgado.',
    volumeOrWeight: 'Bola 120g / Cascão',
    badge: 'O Ícone da Casa',
    ingredients: ['Pasta pura de pistache', 'Leite pasteurizado de fazenda', 'Creme de leite 35%', 'Pistache tostado'],
    allergens: 'Contém pistache e derivados de leite.',
    image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg',
    flavorColor: '#84cc16',
    temperature: '-12°C'
  },
  {
    id: 'gelato-chocolate-belga-70',
    name: 'Gelato Chocolate Belga Intenso 70%',
    category: 'sorvetes',
    categoryLabel: 'Gelato & Sorvetes de Massa',
    price: 16.50,
    description: 'Cacau belga nobre de origem sustentável, textura aveludada com notas amendoadas e calda morna de chocolate.',
    volumeOrWeight: 'Bola 120g / Cascão',
    badge: 'Chocolate Nobre',
    ingredients: ['Massa de cacau belga 70%', 'Manteiga de cacau', 'Leite integral', 'Açúcar de cana'],
    image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg',
    flavorColor: '#3b1c0b',
    temperature: '-12°C'
  },
  {
    id: 'gelato-doce-de-leite-queijo',
    name: 'Gelato Doce de Leite com Queijo da Serra',
    category: 'sorvetes',
    categoryLabel: 'Gelato & Sorvetes de Massa',
    price: 16.50,
    description: 'Equilíbrio primoroso entre a doçura do caramelo mineiro e a leve acidez e salinidade do queijo artesanal.',
    volumeOrWeight: 'Bola 120g / Cascão',
    badge: 'Tradição de Minas',
    ingredients: ['Doce de leite cozido lentamente', 'Queijo artesanal meia cura', 'Creme fresco'],
    image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg',
    flavorColor: '#c2410c',
    temperature: '-12°C'
  },
  {
    id: 'gelato-frutas-vermelhas-zero',
    name: 'Sorvete Frutas Vermelhas (Zero Açúcar)',
    category: 'sorvetes',
    categoryLabel: 'Gelato & Sorvetes de Massa',
    price: 17.00,
    description: 'Framboesas, amoras e morangos naturais com xilitol e estévia. Zero açúcar adicionado, cremoso e leve.',
    volumeOrWeight: 'Bola 120g / Cascão',
    badge: 'Zero Adição de Açúcar',
    ingredients: ['Amora', 'Framboesa silvestre', 'Morango', 'Adoçante natural (Xilitol e Estévia)'],
    image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg',
    flavorColor: '#9f1239',
    temperature: '-12°C'
  },

  // AÇAÍ ARTESANAL
  {
    id: 'acai-puro-artesanal',
    name: 'Açaí Cremoso Especial do Mestre',
    category: 'acai',
    categoryLabel: 'Açaí Especial',
    price: 24.00,
    description: 'Polpa de açaí médio/grosso batida lentamente com xarope de guaraná suave ou versão pura sem açúcar.',
    volumeOrWeight: 'Tigela 400ml',
    badge: 'Sem Cristais de Gelo',
    ingredients: ['Polpa pura de açaí paraense', 'Xarope de guaraná artesanal', 'Extrato natural'],
    image: '/src/assets/images/acai_bowl_gourmet_1794356725128.jpg',
    flavorColor: '#4c1d95',
    temperature: '-10°C'
  },
  {
    id: 'acai-turbo-belo-horizonte',
    name: 'Açaí Supremo com Morango e Leite Ninho',
    category: 'acai',
    categoryLabel: 'Açaí Especial',
    price: 29.90,
    description: 'Tigela generosa de açaí cremoso com camadas de Ninho em pó, morangos frescos fatiados, banana ouro e granola caseira.',
    volumeOrWeight: 'Tigela 550ml',
    badge: 'Completo',
    ingredients: ['Açaí cremoso', 'Leite Ninho', 'Morangos frescos', 'Banana fatiada', 'Granola artesanal'],
    image: '/src/assets/images/acai_bowl_gourmet_1794356725128.jpg',
    flavorColor: '#581c87',
    temperature: '-10°C'
  },

  // POTES FAMÍLIA & ATACADO / REVENDA
  {
    id: 'pote-2-litros-familia',
    name: 'Pote Família 2 Litros (Sabores Variados)',
    category: 'potes-atacado',
    categoryLabel: 'Potes Família & Atacado',
    price: 58.00,
    description: 'Pote térmico hermético de 2 Litros. Escolha entre Ninho Trufado, Flocos, Chocolate Belga, Coco da Bahia ou Napolitano.',
    volumeOrWeight: '2000ml / ~1.2kg',
    badge: 'Econômico',
    ingredients: ['Creme artesanal balanceado', 'Frutas e cacau selecionados'],
    image: '/src/assets/images/sorveteria_factory_store_1794356725438.jpg',
    flavorColor: '#0284c7',
    temperature: '-18°C'
  },
  {
    id: 'balde-atacado-10l',
    name: 'Balde Industrial 10 Litros para Sorveterias & Eventos',
    category: 'potes-atacado',
    categoryLabel: 'Potes Família & Atacado',
    price: 180.00,
    description: 'Ideal para buffets, restaurantes, padarias e pontos de revenda. Alto rendimento com mais de 70 bolas perfeitas.',
    volumeOrWeight: '10 Litros / ~6kg',
    badge: 'Preço Direto da Fábrica',
    ingredients: ['Fórmula exclusiva Mestre Sorveteiro com overrun controlado de 40%'],
    image: '/src/assets/images/sorveteria_factory_store_1794356725438.jpg',
    flavorColor: '#0369a1',
    temperature: '-18°C'
  },
  {
    id: 'caixa-atacado-picoles-48',
    name: 'Caixa Revendedor 48 Picolés Sortidos',
    category: 'potes-atacado',
    categoryLabel: 'Potes Família & Atacado',
    price: 168.00,
    description: 'Mix campeão com 24 picolés de fruta e 24 cremosos. Margem de lucro de até 70% na revenda.',
    volumeOrWeight: '48 unidades',
    badge: 'Alta Lucratividade',
    ingredients: ['Sortimento dos sabores mais vendidos na Grande BH'],
    image: '/src/assets/images/paletas_artesanais_showcase_1794356724069.jpg',
    flavorColor: '#0d9488',
    temperature: '-18°C'
  },

  // SOBREMESAS ESPECIAIS
  {
    id: 'sobremesa-petit-gateau',
    name: 'Petit Gâteau Quente com Gelato de Baunilha',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas Especiais',
    price: 26.00,
    description: 'Bolo quente de chocolate meio amargo com centro líquido vulcânico, acompanhado de gelato de fava de baunilha e calda de cacau.',
    volumeOrWeight: 'Porção individual 240g',
    badge: 'Sobremesa Quente & Fria',
    ingredients: ['Chocolate 70%', 'Manteiga sem sal', 'Ovos frescos', 'Gelato de baunilha'],
    image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg',
    flavorColor: '#831843',
    temperature: 'Quente com Gelato a -12°C'
  }
];

export interface Flavor3D {
  id: string;
  name: string;
  category: string;
  hex: string;
  roughness: number;
  metalness: number;
  specular: string;
  notes: string;
  fatPercent: string;
  sugarPercent: string;
}

export const FLAVORS_3D: Flavor3D[] = [
  {
    id: 'pistache',
    name: 'Pistache di Bronte',
    category: 'Gelato Italiano Clássico',
    hex: '#8cb86d',
    roughness: 0.68,
    metalness: 0.05,
    specular: '#b8df9a',
    notes: 'Pistache siciliano tostado a lenha com toque suave de flor de sal.',
    fatPercent: '9.2%',
    sugarPercent: '18.5%'
  },
  {
    id: 'chocolate-70',
    name: 'Chocolate Belga 70%',
    category: 'Origem Única Cacau',
    hex: '#311710',
    roughness: 0.45,
    metalness: 0.12,
    specular: '#633526',
    notes: 'Amargor aveludado, notas de frutas secas e manteiga de cacau virgem.',
    fatPercent: '10.8%',
    sugarPercent: '16.0%'
  },
  {
    id: 'doce-de-leite',
    name: 'Doce de Leite & Queijo Canastra',
    category: 'Especialidade Mineira',
    hex: '#c06b29',
    roughness: 0.58,
    metalness: 0.08,
    specular: '#e89e5c',
    notes: 'Cozimento de 6 horas em tacho de cobre com queijo maturado da serra.',
    fatPercent: '8.8%',
    sugarPercent: '21.0%'
  },
  {
    id: 'frutas-vermelhas',
    name: 'Amora & Framboesa Silvestre',
    category: 'Sorbet Fruta Pura',
    hex: '#b31e45',
    roughness: 0.75,
    metalness: 0.02,
    specular: '#e04f75',
    notes: 'Acidez refrescante de frutas colhidas no ponto certo com textura suave.',
    fatPercent: '0.4%',
    sugarPercent: '22.0%'
  },
  {
    id: 'acai-especial',
    name: 'Açaí Grosso Especial BH',
    category: 'Fruto Amazônico',
    hex: '#47164d',
    roughness: 0.62,
    metalness: 0.04,
    specular: '#73337a',
    notes: 'Batimento a frio que preserva a textura grossa original sem cristais de gelo.',
    fatPercent: '4.5%',
    sugarPercent: '14.0%'
  }
];

export const TOPPING_OPTIONS = [
  { id: 'fudge', name: 'Calda Quente de Chocolate', extra: 3.00, color: '#2b1109' },
  { id: 'caramel', name: 'Calda de Caramelo Salgado', extra: 3.00, color: '#d97706' },
  { id: 'pistachio-crunch', name: 'Castanhas e Pistache Crocante', extra: 3.50, color: '#a3e635' },
  { id: 'strawberry-fresh', name: 'Morangos Frescos Fatiados', extra: 4.00, color: '#f43f5e' },
  { id: 'wafer-straw', name: 'Canudo de Waffle Artesanal', extra: 2.00, color: '#ca8a04' }
];

export const BASES_OPTIONS = [
  { id: 'cascao', name: 'Cascão Artesanal Feito na Hora', price: 4.50, desc: 'Crocante com aroma de baunilha fresca' },
  { id: 'copo-duplo', name: 'Copinho Térmico 2 Bolas (240g)', price: 3.00, desc: 'Perfeito para saborear com colher' },
  { id: 'cestinha', name: 'Cestinha Waffle com Borda de Chocolate', price: 6.00, desc: 'Borda mergulhada em chocolate meio amargo' },
  { id: 'taca-vidro', name: 'Taça Mestre Supremo (Self-Service)', price: 8.00, desc: 'Apresentação nobre para consumo no local' }
];
