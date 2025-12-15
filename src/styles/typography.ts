export const typography = {
  // Headlines
  headline: {
    main: 'text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight',
    secondary: 'text-2xl lg:text-3xl font-serif font-bold text-gray-900 leading-snug',
    tertiary: 'text-xl lg:text-2xl font-serif font-bold text-gray-900 leading-snug',
    section: 'text-lg lg:text-xl font-serif font-bold text-gray-900 leading-snug'
  },
  
  // Body Text
  body: {
    lead: 'text-lg text-gray-700 leading-relaxed',
    normal: 'text-base text-gray-700 leading-relaxed',
    small: 'text-sm text-gray-600 leading-relaxed'
  },
  
  // Navigation and UI
  navigation: {
    primary: 'text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors',
    secondary: 'text-xs font-medium text-gray-600 hover:text-blue-900 transition-colors',
    utility: 'text-xs text-gray-500 hover:text-blue-900 transition-colors'
  },
  
  // Labels and Captions
  label: {
    section: 'text-xs font-bold text-blue-600 uppercase tracking-wide',
    author: 'text-sm font-medium text-gray-600',
    date: 'text-xs text-gray-500',
    readingTime: 'text-xs text-gray-500'
  },
  
  // Advertising
  ad: {
    label: 'text-xs text-gray-400 font-medium uppercase tracking-wide',
    cta: 'text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors'
  }
};

export const layout = {
  // Container widths
  container: {
    narrow: 'max-w-3xl',
    normal: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-none'
  },
  
  // Grid systems
  grid: {
    main: 'grid grid-cols-1 lg:grid-cols-12 gap-8',
    content: 'lg:col-span-8',
    sidebar: 'lg:col-span-4',
    featured: 'grid grid-cols-1 md:grid-cols-2 gap-6'
  },
  
  // Spacing
  spacing: {
    section: 'mb-8',
    article: 'mb-6',
    component: 'mb-4'
  }
};

export const colors = {
  // Brand Colors
  brand: {
    primary: '#1e40af', // blue-800
    secondary: '#dc2626', // red-600
    accent: '#f59e0b' // amber-500
  },
  
  // Editorial Colors
  editorial: {
    breaking: '#dc2626', // red-600
    featured: '#1e40af', // blue-800
    opinion: '#059669', // emerald-600
    sports: '#ea580c' // orange-600
  },
  
  // Neutral Colors
  neutral: {
    background: '#f9fafb', // gray-50
    surface: '#ffffff',
    border: '#e5e7eb', // gray-200
    text: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
      muted: '#9ca3af' // gray-400
    }
  }
};

export const adSizes = {
  // Standard IAB sizes
  banner: {
    leaderboard: { width: 728, height: 90 },
    banner: { width: 468, height: 60 },
    halfBanner: { width: 234, height: 60 }
  },
  
  rectangle: {
    medium: { width: 300, height: 250 },
    large: { width: 336, height: 280 },
    small: { width: 180, height: 150 }
  },
  
  skyscraper: {
    wide: { width: 160, height: 600 },
    standard: { width: 120, height: 600 },
    half: { width: 300, height: 600 }
  },
  
  square: {
    large: { width: 250, height: 250 },
    small: { width: 200, height: 200 }
  }
};

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultrawide: '1536px'
};

// Style utilities
export const styles = {
  // Card styles
  card: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200',
    hover: 'hover:shadow-md hover:border-gray-300 transition-all duration-200',
    padded: 'p-6',
    compact: 'p-4'
  },
  
  // Button styles
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 transition-colors',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
  },
  
  // Typography utilities
  text: {
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3'
    },
    
    // Responsive text sizes
    responsive: {
      headline: 'text-2xl sm:text-3xl lg:text-4xl',
      subhead: 'text-lg sm:text-xl lg:text-2xl',
      body: 'text-sm sm:text-base'
    }
  }
};