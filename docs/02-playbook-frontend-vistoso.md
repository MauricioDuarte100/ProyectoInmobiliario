# Playbook Frontend Vistoso

## Principio Principal

Este MVP se gana por puesta en escena. El frontend debe comunicar valor antes de que el jurado lea una explicacion.

La prioridad es que la app se vea:

- Moderna.
- Confiable.
- Inmobiliaria.
- Inteligente.
- Lista para vender una demo.

## Direccion Visual

Estilo recomendado:

- Dashboard premium, no landing vacia.
- Colores sobrios con acentos tecnologicos.
- Fondo claro con secciones limpias.
- Cards densas y bien organizadas.
- Mapas simulados y graficos visibles.
- Imagenes de propiedades con buena presencia.
- Iconos `lucide-react`.

Paleta sugerida:

- Fondo: `#F7F8FA`
- Texto principal: `#172033`
- Verde confianza: `#1F8A5B`
- Azul tecnologia: `#2563EB`
- Naranja oportunidad: `#F59E0B`
- Rojo alerta: `#DC2626`
- Bordes: `#E5E7EB`

Evitar:

- Gradientes exagerados.
- Landing generica de marketing.
- Formularios largos sin feedback visual.
- Texto explicativo excesivo.
- Pantallas vacias.
- UI monocromatica.

## Componentes Visuales Obligatorios

### Score Ring

Un componente circular o semicircular para mostrar el Indice de Acceso Habitacional.

Estados:

- 0 a 39: rojo, "No apto actual".
- 40 a 69: naranja, "Semiapto".
- 70 a 100: verde, "Apto potencial".

### Metric Cards

Cards compactas con:

- Numero grande.
- Label corto.
- Icono.
- Cambio o comentario.

Ejemplos:

- "128 familias precalificadas".
- "34 propiedades compatibles".
- "6 rutas habitacionales".
- "3 zonas calientes".

### Property Cards

Cada propiedad debe parecer real:

- Imagen.
- Ubicacion.
- Precio.
- Tipo.
- Entrega.
- Cuota estimada.
- Compatibilidad.
- Badge de ruta: "lote financiado", "credito", "alquiler con opcion".

### Route Cards

Cards para rutas habitacionales:

- Icono.
- Nombre.
- Compatibilidad.
- Beneficio.
- Proximo paso.
- Riesgo.

### Simulated Map

No hace falta mapa real en el MVP. Crear un panel visual con barrios o zonas:

- Posadas Centro.
- Itaembe Guazu.
- Garupa.
- Candelaria.
- Miguel Lanus.

Mostrar puntos, heat zones o barras por demanda.

### AI Explanation Panel

Panel tipo asistente:

- Titulo: "Analisis de SimIA".
- Texto generado por Gemini o fallback.
- Lista de motivos.
- Lista de recomendaciones.
- Disclaimer corto.

## Layout Recomendado

### Desktop

- Header compacto.
- Navegacion por tabs o secciones.
- Grid de 12 columnas.
- Panel izquierdo para acciones.
- Panel derecho para resultados.
- Cards con altura estable.

### Mobile

- Navegacion por pasos.
- Una columna.
- Botones grandes.
- Score visible antes del detalle.
- Cards apiladas.

## Microcopy

Usar textos breves y comerciales:

- "Tu capacidad habitacional estimada".
- "Ruta mas conveniente".
- "Propiedades dentro de tu rango".
- "Que falta para acceder".
- "Lead listo para inmobiliaria".
- "Demanda real por zona".

Evitar:

- "Modelo predictivo avanzado".
- "Algoritmo complejo".
- "Garantizado".
- "Aprobado por banco".

## Checklist Visual

Antes de presentar, verificar:

- La primera pantalla impacta en 5 segundos.
- El score es visible y entendible.
- Los numeros principales estan destacados.
- Las cards de propiedades parecen reales.
- No hay textos desbordados.
- No hay secciones vacias.
- Mobile funciona.
- La demo se puede recorrer sin explicar cada boton.

