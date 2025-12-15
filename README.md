# El Comunicación Periódico

Periódico digital español con diseño profesional inspirado en medios como EL PAÍS y EL ESPAÑOL.

## 🚀 Deploy en Vercel

### Opción 1: Desde la web de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa tu repositorio: `https://github.com/frnayuso21-boop/elcomunicacion.git`
5. Vercel detectará automáticamente que es un proyecto Vite/React
6. Configura las variables de entorno si las necesitas
7. Haz clic en "Deploy"

### Opción 2: Desde la terminal

```bash
# Instala la CLI de Vercel
npm i -g vercel

# Autentícate con tu cuenta
vercel login

# Despliega el proyecto
vercel --prod
```

## 📋 Características

- ✅ Diseño profesional de periódico
- ✅ Logo personalizado con tono salmón
- ✅ Responsive y optimizado para móviles
- ✅ Sistema de secciones (Política, Economía, Deportes, etc.)
- ✅ Gestión de artículos con Supabase
- ✅ Optimizado para SEO

## 🛠️ Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Backend)
- Vercel (Hosting)

## 📁 Estructura

```
src/
├── components/          # Componentes React
├── pages/              # Páginas principales
├── lib/                 # Utilidades y configuración
└── styles/              # Estilos CSS
```

## 🔧 Scripts

```bash
npm run dev      # Desarrollo local
npm run build    # Build para producción
npm run preview  # Vista previa de producción
```

## 🎨 Personalización

El logo personalizado está ubicado en: `src/public/logo-el-comunicacion.png`

El diseño incluye:
- Header centrado con logo
- Sistema de columnas tipo periódico
- Colores y tipografía profesional
- Sin publicidad (espacio para contenido)

## 📞 Soporte

Para problemas con el deploy o configuración, revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de React](https://react.dev/)