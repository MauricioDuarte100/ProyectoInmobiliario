export const mockTranscript = 
  "Estoy buscando un terreno o una vivienda inicial con financiación. Me interesa que sea mediante una inmobiliaria confiable y, si existe, algún convenio con constructora o facilidad de crédito.";

export const mockIntent = {
  intent: "Acceso a vivienda",
  profile: "Comprador inicial",
  mainNeed: "Financiación",
  secondaryNeed: "Terreno o vivienda inicial",
  recommendedChannel: "Inmobiliaria adherida + convenio constructivo",
};

export const mockAgents = [
  {
    id: 1,
    name: "Agente de Oferta Inmobiliaria",
    description: "Busca propiedades, viviendas iniciales y oportunidades disponibles.",
    result: "3 oportunidades compatibles encontradas.",
  },
  {
    id: 2,
    name: "Agente de Crédito y Financiación",
    description: "Evalúa alternativas de financiación, cuotas y preventa.",
    result: "Financiación flexible detectada: anticipo + cuotas escalonadas.",
  },
  {
    id: 3,
    name: "Agente de Lotes Disponibles",
    description: "Identifica terrenos y zonas aptas para vivienda.",
    result: "2 zonas con potencial habitacional identificadas.",
  },
  {
    id: 4,
    name: "Agente de Inmobiliarias Adheridas",
    description: "Busca operadores inmobiliarios validados por la Cámara.",
    result: "2 inmobiliarias adheridas recomendadas.",
  },
  {
    id: 5,
    name: "Agente de Convenios Constructivos",
    description: "Analiza convenios con constructoras y desarrolladoras.",
    result: "Convenio constructivo aplicable encontrado.",
  },
  {
    id: 6,
    name: "Agente de Recomendación Final",
    description: "Unifica los resultados y genera una ruta habitacional.",
    result: "Ruta habitacional generada correctamente.",
  },
];
