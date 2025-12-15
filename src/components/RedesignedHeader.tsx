import { Newspaper, Settings, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Section } from '../lib/database.types';

interface RedesignedHeaderProps {
  sections: Section[];
  currentSection: string | null;
  onSectionChange: (slug: string | null) => void;
  onAdminClick: () => void;
}

export function RedesignedHeader({ sections, currentSection, onSectionChange, onAdminClick }: RedesignedHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Utility Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="font-medium">ES NOTICIA:</span>
              <div className="flex gap-3">
                <button className="hover:text-blue-900 transition-colors">Crisis política</button>
                <button className="hover:text-blue-900 transition-colors">Economía</button>
                <button className="hover:text-blue-900 transition-colors">Internacional</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hover:text-blue-900 transition-colors flex items-center gap-1">
                <Menu className="w-3 h-3" />
                Menú
              </button>
              <button className="hover:text-blue-900 transition-colors">
                <Search className="w-3 h-3" />
              </button>
              <button className="hover:text-blue-900 transition-colors flex items-center gap-1">
                <User className="w-3 h-3" />
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          {/* Logo Section - Centered */}
          <button
            onClick={() => onSectionChange(null)}
            className="hover:opacity-95 transition-opacity"
          >
            <img 
              src="/src/public/logo-el-comunicacion.png" 
              alt="El Comunicación Periódico" 
              className="h-12 w-auto filter sepia-[0.8] hue-rotate-[340deg] saturate-[1.5] brightness-[1.1] contrast-[1.2] bg-transparent"
            />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <ul className="flex items-center gap-8 text-sm font-medium whitespace-nowrap overflow-x-auto py-4">
              <li>
                <button
                  onClick={() => onSectionChange(null)}
                  className={`hover:text-blue-900 transition-colors pb-1 border-b-2 ${
                    currentSection === null 
                      ? 'text-blue-900 font-bold border-blue-900' 
                      : 'text-gray-700 border-transparent'
                  }`}
                >
                  Última Hora
                </button>
              </li>
              {sections
                .filter(section => section.name.toLowerCase() !== 'última hora' && section.name.toLowerCase() !== 'ultima hora')
                .map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => onSectionChange(section.slug)}
                      className={`hover:text-blue-900 transition-colors pb-1 border-b-2 ${
                        currentSection === section.slug 
                          ? 'text-blue-900 font-bold border-blue-900' 
                          : 'text-gray-700 border-transparent'
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}