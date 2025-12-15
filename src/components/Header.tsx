import { Newspaper, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Section } from '../lib/database.types';

interface HeaderProps {
  sections: Section[];
  currentSection: string | null;
  onSectionChange: (slug: string | null) => void;
  onAdminClick: () => void;
}

export function Header({ sections, currentSection, onSectionChange, onAdminClick }: HeaderProps) {
  return (
    <header className="bg-white w-full">
      <div className="w-full mx-auto">
        <div className="relative w-full" style={{ backgroundColor: '#F2EBDD' }}>
          <button
            onClick={() => onSectionChange(null)}
            className="hover:opacity-95 transition-opacity w-full flex justify-center items-center mx-auto"
            style={{ backgroundColor: '#F2EBDD' }}
          >
            <img 
              src="/src/public/logo-el-comunicacion.png" 
              alt="El Comunicación Periódico" 
              className="h-16 w-auto filter sepia-[0.8] hue-rotate-[340deg] saturate-[1.5] brightness-[1.1] contrast-[1.2] bg-transparent"
            />
          </button>
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Link
              to="/admin"
              className="px-2 py-1 bg-blue-600 text-white text-2xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Panel
            </Link>
            <button
              onClick={onAdminClick}
              className="px-2 py-1 bg-gray-900 text-white text-2xs font-medium hover:bg-gray-800 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        <nav className="py-3 overflow-x-auto">
          <div className="flex justify-center">
            <ul className="flex items-center gap-6 text-sm font-medium whitespace-nowrap">
              <li>
                <button
                  onClick={() => onSectionChange(null)}
                  className={`hover:text-blue-900 transition-colors ${
                    currentSection === null ? 'text-blue-900 font-bold' : 'text-gray-700'
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
                      className={`hover:text-blue-900 transition-colors ${
                        currentSection === section.slug ? 'text-blue-900 font-bold' : 'text-gray-700'
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
