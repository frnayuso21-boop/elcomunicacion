import React from 'react';
import { Newspaper } from 'lucide-react';

interface NewspaperLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function NewspaperLayout({ children, className = '' }: NewspaperLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Main Content Area - Full Width */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

interface ContentContainerProps {
  children: React.ReactNode;
  variant?: 'full' | 'narrow' | 'article';
}

export function ContentContainer({ children, variant = 'full' }: ContentContainerProps) {
  const widthClass = {
    full: 'max-w-7xl',
    narrow: 'max-w-6xl',
    article: 'max-w-4xl'
  }[variant];

  return (
    <div className={`${widthClass} mx-auto px-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
}

interface GridSystemProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
}

export function GridSystem({ children, columns = 2, gap = 'medium' }: GridSystemProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const gapClass = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8'
  }[gap];

  return (
    <div className={`grid ${gridClass} ${gapClass}`}>
      {children}
    </div>
  );
}

interface AdSlotProps {
  size: 'banner' | 'square' | 'rectangle' | 'skyscraper';
  position?: 'inline' | 'sidebar';
}

export function AdSlot({ size, position = 'inline' }: AdSlotProps) {
  const dimensions = {
    banner: { width: '728', height: '90', class: 'w-full h-24' },
    square: { width: '300', height: '250', class: 'w-72 h-60' },
    rectangle: { width: '336', height: '280', class: 'w-80 h-72' },
    skyscraper: { width: '160', height: '600', class: 'w-40 h-96' }
  }[size];

  const positionClass = position === 'sidebar' ? 'my-4' : 'my-8';

  return (
    <div className={`${positionClass} flex justify-center`}>
      <div className={`${dimensions.class} bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400`}>
        <div className="text-center">
          <Newspaper className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">Espacio Publicitario</div>
          <div className="text-xs">{dimensions.width} x {dimensions.height}px</div>
        </div>
      </div>
    </div>
  );
}