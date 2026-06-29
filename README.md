# Meal Finder

Aplicación web para buscar y explorar recetas de comidas utilizando la API pública de [TheMealDB](https://www.themealdb.com/).

## Tecnologías

- **React 18** — Librería para construir interfaces de usuario
- **TypeScript** — Tipado estático para JavaScript
- **Vite** — Bundler y entorno de desarrollo
- **Chakra UI v2** — Sistema de componentes y estilos
- **Axios** — Cliente HTTP para consumir APIs
- **React Hook Form** — Manejo de formularios
- **React Icons** — Íconos para la interfaz
- **Framer Motion** — Animaciones

## Funcionalidades

- Navegación lateral con categorías de comidas (Beef, Chicken, Dessert, etc.)
- Visualización de comidas por categoría en un grid de tarjetas
- Búsqueda de recetas por nombre, ingrediente, categoría o área
- Modal con detalle de la receta: ingredientes, medidas e instrucciones
- Estado de carga con skeletons
- **Cambio de idioma entre inglés y español** en toda la interfaz
- **Traducción automática** de nombres de recetas, ingredientes e instrucciones al cambiar de idioma

## Cambio de Idioma

La aplicación soporta **inglés** y **español**. El selector de idioma se encuentra en la barra superior.

### Cómo funciona

- El contexto `LanguageContext` (en `src/contexts/LanguageContext.tsx`) provee el estado del idioma, una función para cambiarlo y un helper `t()` para traducciones estáticas.
- Las traducciones de la interfaz (etiquetas, placeholders, botones) se manejan con el helper `t('key')` y un diccionario local.
- Los nombres de recetas, ingredientes e instrucciones se traducen dinámicamente usando `TranslationService` (`src/services/translationService.ts`), que combina un diccionario predefinido con la API de MyMemory para términos no encontrados.
- El término de búsqueda se traduce automáticamente a inglés si el usuario está en español, para mantener compatibilidad con la API de TheMealDB.

## API Consumida

[TheMealDB](https://www.themealdb.com/api.php) — API pública y gratuita de recetas.

| Endpoint | Descripción |
|---|---|
| `list.php?c=list` | Lista todas las categorías |
| `filter.php?c={category}` | Comidas filtradas por categoría |
| `search.php?s={name}` | Búsqueda por nombre |
| `filter.php?i={ingredient}` | Filtro por ingrediente |
| `filter.php?a={area}` | Filtro por área/origen |
| `lookup.php?i={id}` | Detalle de una comida por ID |

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.tsx                 — Barra superior con buscador y selector de idioma
│   ├── SideNav.tsx                — Navegación lateral de categorías
│   ├── MainContent.tsx            — Grid de tarjetas de comidas
│   ├── MealCard.tsx               — Tarjeta individual de comida
│   ├── RecipeModal.tsx            — Modal de detalle de receta
│   ├── RecipeModalContent.tsx     — Contenido del modal con datos traducidos
│   ├── RecipeModalSkeleton.tsx    — Skeleton del modal
│   ├── Categories.tsx             — Lista de categorías
│   └── SkeletonCard.tsx           — Skeleton de tarjeta
├── contexts/
│   └── LanguageContext.tsx         — Contexto de idioma y traducciones
├── hooks/
│   ├── UseHttpData.ts             — Hook para fetch con axios y cleanup
│   └── UseFetch.ts                — Hook para fetch imperativo
├── services/
│   └── translationService.ts      — Servicio de traducción (diccionario + API MyMemory)
├── types/
│   └── index.ts                   — Tipos compartidos (Category, Meal, MealDetails, SearchForm)
├── App.tsx                        — Componente principal
└── main.tsx                       — Punto de entrada
```

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```
