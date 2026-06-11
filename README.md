# 🏡 Cimia — Sistema Inteligente Misionero de Acceso a la Vivienda

> **Precalificador Habitacional con IA + Mapas Interactivos + Simulación Financiera**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)](https://gsap.com)

---

## ✨ Características

- **🧠 Precalificación con IA** — Scoring habitacional inteligente basado en ingresos, ahorros, edad y ubicación
- **🗺️ Mapa de Demanda Interactivo** — Visualización geográfica con Leaflet de zonas de acceso habitacional
- **📊 Panel de Inversiones** — Proyecciones financieras, tablas de financiamiento comparativas
- **🏠 Catálogo de Propiedades** — Matching inteligente con propiedades disponibles según perfil del usuario
- **🤖 Asistente IA Flotante** — Chat contextual con insights personalizados
- **🎨 Animaciones Premium** — Transiciones fluídas con Framer Motion, GSAP ScrollTrigger, React Spring

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **React 19** | UI declarativa con componentes reutilizables |
| **TypeScript 6** | Tipado estático robusto |
| **Vite 8** | Build ultra-rápido |
| **Tailwind CSS 4** | Estilos utilitarios modernos |
| **Framer Motion 12** | Transiciones de página y animaciones por scroll |
| **GSAP 3** | ScrollTrigger, DrawSVG y animaciones parallax |
| **React Spring** | Contadores animados y físicas spring |
| **@use-gesture/react** | Interacciones magnéticas y hover |
| **Leaflet** | Mapas interactivos |
| **Lucide React** | Iconografía consistente |

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MauricioDuarte100/ProyectoInmobiliario.git
cd ProyectoInmobiliario

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔐 Configuración de Gemini

La integración con Gemini ahora corre desde una función serverless en `api/ai.js`.

- Nunca guardes la clave en `src/` ni en archivos versionados.
- Usá una clave rotada en `GEMINI_API_KEY`.
- Si la clave no está configurada, Cimia sigue respondiendo con fallback local.

Ejemplo local:

```bash
cp .env.example .env
```

Luego cargá en `.env`:

```bash
GEMINI_API_KEY=tu-clave-rotada
```

Para desarrollo local con funciones de Vercel conviene usar:

```bash
vercel dev
```

## 🎯 Flujo de Uso

1. **Home** → Vista principal con métricas, mapa de demanda y programas de financiamiento
2. **Precalificación** → Formulario inteligente para calcular el score habitacional
3. **Resultados** → Score detallado, propiedades matching y rutas recomendadas
4. **Panel Inmobiliario** → Exploración de propiedades con filtros
5. **Panel de Inversiones** → Proyecciones financieras y comparativas

## 🌐 Deploy

El proyecto está preparado para deploy en **Vercel** con zero configuración:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Antes de publicar Gemini real en Vercel:

1. Configurá `GEMINI_API_KEY` en Project Settings > Environment Variables.
2. Hacé el deploy.
3. Verificá que `/api/ai` responda desde el dominio publicado.

## 🧑‍💻 Desarrollo

```bash
# Type checking
npx tsc --noEmit

# Preview del build
npm run preview
```

## 📄 Licencia

MIT
