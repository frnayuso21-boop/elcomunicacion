# Guía de Estilo - El Comunicación Periódico

## 1. Sistema de Diseño

### Estructura de Columnas
El nuevo diseño adopta un formato estrecho con márgenes laterales amplios para publicidad:

- **Margen Izquierdo Publicitario**: 15% del ancho total (fijo)
- **Contenido Principal**: 70% del ancho disponible
- **Margen Derecho Opcional**: 10% del ancho total (fijo)
- **Columnas de Contenido**: 
  - Primaria: 8 columnas (66.67%)
  - Sidebar: 4 columnas (33.33%)

### Sistema de Rejilla
- **Desktop**: 12 columnas con gap de 24px
- **Tablet**: 8 columnas con gap de 16px
- **Mobile**: 4 columnas con gap de 12px

## 2. Tipografía

### Jerarquía Tipográfica

#### Titulares
```css
/* Titular Principal */
font-size: 3rem (48px) lg: 3.5rem (56px)
font-weight: 700 (bold)
font-family: serif
line-height: 1.1

/* Titular Secundario */
font-size: 1.5rem (24px) lg: 2rem (32px)
font-weight: 700 (bold)
font-family: serif
line-height: 1.2

/* Titular Terciario */
font-size: 1.25rem (20px) lg: 1.5rem (24px)
font-weight: 700 (bold)
font-family: serif
line-height: 1.3
```

#### Cuerpo de Texto
```css
/* Entradilla */
font-size: 1.125rem (18px)
font-weight: 400 (normal)
line-height: 1.6

/* Texto Normal */
font-size: 1rem (16px)
font-weight: 400 (normal)
line-height: 1.6

/* Texto Pequeño */
font-size: 0.875rem (14px)
font-weight: 400 (normal)
line-height: 1.5
```

### Etiquetas y Metadatos
- **Secciones**: Mayúsculas, tracking-wide, font-bold
- **Autores**: Font-medium, text-gray-600
- **Fechas**: Text-xs, text-gray-500
- **Tiempo de Lectura**: Text-xs, text-gray-500

## 3. Colores

### Paleta de Marca
```css
/* Primario */
--color-primary: #1e40af; /* Azul oscuro */
--color-secondary: #dc2626; /* Rojo */
--color-accent: #f59e0b; /* Ámbar */

/* Editorial */
--color-breaking: #dc2626; /* Noticias de última hora */
--color-featured: #1e40af; /* Destacados */
--color-opinion: #059669; /* Opinión */
--color-sports: #ea580c; /* Deportes */

/* Neutrales */
--color-background: #f9fafb;
--color-surface: #ffffff;
--color-border: #e5e7eb;
--color-text-primary: #111827;
--color-text-secondary: #6b7280;
--color-text-muted: #9ca3af;
```

## 4. Espacios Publicitarios

### Formatos Estándar IAB

#### Banners Horizontales
- **Leaderboard**: 728x90px (Header/Footer)
- **Banner**: 468x60px (Inline)
- **Half Banner**: 234x60px (Mobile)

#### Rectángulos
- **Medium Rectangle**: 300x250px (Sidebar)
- **Large Rectangle**: 336x280px (Inline)
- **Small Rectangle**: 180x150px (Sidebar)

#### Skyscrapers
- **Wide Skyscraper**: 160x600px (Left Sidebar)
- **Standard Skyscraper**: 120x600px (Right Sidebar)
- **Half Page**: 300x600px (Left Sidebar)

#### Cuadrados
- **Large Square**: 250x250px (Sidebar)
- **Small Square**: 200x200px (Sidebar)

### Posicionamiento

#### Sidebar Izquierdo (Fijo)
1. **Top**: 300x600px (Skyscraper)
2. **Middle**: 250x250px (Square)
3. **Bottom**: 200x200px (Square)

#### Contenido Principal
1. **Header**: 728x90px (Leaderboard)
2. **Inline Top**: 728x90px (Leaderboard)
3. **Inline Middle**: 336x280px (Large Rectangle)
4. **Inline Bottom**: 728x90px (Leaderboard)

#### Sidebar Derecho (Opcional)
1. **Top**: 160x600px (Wide Skyscraper)
2. **Bottom**: 300x250px (Medium Rectangle)

## 5. Componentes

### Tarjetas de Artículo
```css
/* Base */
background: white;
border-radius: 0.5rem;
border: 1px solid #e5e7eb;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Hover */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-color: #d1d5db;
transition: all 0.2s;
```

### Botones
```css
/* Primario */
background: #1e40af;
color: white;
border-radius: 0.375rem;
padding: 0.5rem 1rem;

/* Hover */
background: #1e3a8a;
```

### Navegación
- **Estado Activo**: Border-bottom azul, font-bold
- **Estado Hover**: Color azul, transition-colors
- **Estado Normal**: Color gris

## 6. Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 640px) {
  /* Single column layout */
  /* Hidden sidebars */
  /* Stacked content */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Two column layout */
  /* Reduced sidebar */
  /* Adjusted typography */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Full layout with sidebars */
  /* Multi-column grid */
  /* Full advertising spaces */
}
```

### Adaptaciones Mobile
- Sidebar publicitario oculto
- Contenido full-width
- Tipografía reducida
- Espaciado compacto
- Menú hamburger

## 7. Accesibilidad

### Contraste
- Ratio mínimo: 4.5:1 para texto normal
- Ratio mínimo: 3:1 para texto grande
- Ratio mínimo: 4.5:1 para elementos interactivos

### Navegación por Teclado
- Todos los elementos interactivos accesibles
- Focus indicators visibles
- Orden lógico de tabulación

### Screen Readers
- Alt text para todas las imágenes
- ARIA labels apropiados
- Semántica HTML correcta

## 8. Performance

### Optimización de Imágenes
- Lazy loading implementado
- Múltiples tamaños de imagen
- Formatos modernos (WebP, AVIF)
- Compresión optimizada

### Carga de Anuncios
- Carga asíncrona de anuncios
- Timeouts configurados
- Fallback para bloqueadores
- Métricas de rendimiento

## 9. Implementación

### Estructura de Archivos
```
src/
├── components/
│   ├── NewspaperLayout.tsx
│   ├── RedesignedHeader.tsx
│   ├── RedesignedHomepage.tsx
│   ├── RedesignedArticleDetail.tsx
│   ├── SectionTemplates.tsx
│   └── AdvertisingSystem.tsx
├── styles/
│   └── typography.ts
└── App.tsx
```

### Uso de Componentes
```tsx
// Layout principal
<NewspaperLayout>
  <RedesignedHeader />
  <RedesignedMainApp />
</NewspaperLayout>

// Espacios publicitarios
<AdSlot size="banner" position="inline" />
<AdSlot size="square" position="sidebar" />
```

### Personalización
- Colores de sección configurables
- Tamaños de anuncio ajustables
- Posiciones de elementos flexibles
- Temas de color personalizables

## 10. Métricas y Analytics

### Publicidad
- Impresiones por anuncio
- Clics y CTR
- Revenue por posición
- Viewability rates

### Contenido
- Tiempo de lectura
- Scroll depth
- Engagement rate
- Social shares

### Performance
- Page load time
- Time to first byte
- Core Web Vitals
- Ad load time