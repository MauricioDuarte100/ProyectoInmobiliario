# SimIA MVP Hackathon - Resumen Ejecutivo

## Objetivo

Construir un prototipo funcional y visualmente fuerte de **SimIA - Sistema Inteligente Misionero de Acceso a la Vivienda e Inversion Inmobiliaria**.

El objetivo de la primera version no es crear una plataforma financiera real, sino una demo convincente para hackathon que muestre como la IA puede:

- Precalificar familias que buscan vivienda.
- Explicar cuanto pueden pagar y por que.
- Recomendar rutas habitacionales alternativas.
- Matchear personas con propiedades compatibles.
- Dar informacion util a inmobiliarias, constructoras e inversores.

## Enfoque Del MVP

El MVP debe priorizar **puesta en escena, claridad comercial y funcionalidad visible**.

La demo debe sentirse como un producto casi listo para presentar ante una inmobiliaria, una camara, una constructora o un inversor. La logica puede estar hardcodeada, pero la experiencia debe parecer real.

Decision clave:

- El score se calcula con reglas locales.
- El matching se calcula con reglas locales.
- Los datos son ficticios pero realistas.
- Gemini solo se usa para explicar resultados y conversar.
- La app debe funcionar aunque Gemini falle o no este configurado.

## Producto A Presentar

Nombre del primer producto:

**SimIA Precalificador Habitacional**

Promesa:

> SimIA transforma datos dispersos en rutas concretas de acceso a la vivienda. Precalifica familias, conecta oferta inmobiliaria con demanda real y recomienda alternativas de financiamiento para Misiones.

## Alcance Funcional

El prototipo debe incluir:

- Home demo visual.
- Formulario de precalificacion habitacional.
- Resultado del Indice de Acceso Habitacional.
- Rutas habitacionales recomendadas.
- Propiedades compatibles.
- Panel para inmobiliarias.
- Panel para demanda e inversion.
- Asistente IA SimIA con Gemini o fallback local.

## Fuera De Alcance

No implementar en esta etapa:

- Crowdfunding real.
- Captacion de fondos.
- Integracion bancaria real.
- Consulta real a IPRODHA, Catastro, BCRA o Registro.
- Login obligatorio.
- Base de datos productiva.
- Tasacion legal.
- Aprobacion crediticia automatica.

## Criterio De Exito

La demo es exitosa si en menos de 5 minutos permite mostrar:

1. Una persona carga o elige un caso demo.
2. SimIA calcula score, cuota maxima y monto alcanzable.
3. SimIA explica por que califica, semicalifica o no califica.
4. SimIA recomienda rutas habitacionales.
5. SimIA muestra propiedades compatibles.
6. Una inmobiliaria ve leads calificados.
7. Un inversor o constructora ve demanda agregada por zona.

## Advertencia Sobre API Key

La clave compartida en la conversacion debe considerarse expuesta. Para ejecutar el MVP con Gemini:

- Rotar la clave antes de usarla.
- Guardar la nueva clave solo en `.env`.
- Usar la variable `GEMINI_API_KEY`.
- Nunca poner claves en Markdown, frontend, commits ni variables `VITE_*`.

