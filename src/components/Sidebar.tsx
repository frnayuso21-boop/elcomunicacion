import type { Article } from '../lib/database.types';
import { Clock, TrendingUp, MessageSquare } from 'lucide-react';

interface SidebarProps {
  latestArticles: (Article & { section_name?: string })[];
  mostReadArticles: (Article & { section_name?: string })[];
  onArticleClick: (article: Article) => void;
}

export function Sidebar({ latestArticles, mostReadArticles, onArticleClick }: SidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <aside className="space-y-8">
      <section className="bg-red-50 border-l-4 border-red-600 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-red-600" />
          <h3 className="font-serif text-xl font-bold">Última Hora</h3>
        </div>
        <ul className="space-y-4">
          {latestArticles.slice(0, 5).map((article) => (
            <li key={article.id}>
              <button
                onClick={() => onArticleClick(article)}
                className="text-left group w-full"
              >
                <time className="text-xs font-semibold text-red-600">
                  {formatDate(article.published_at)}
                </time>
                <h4 className="font-semibold text-sm leading-tight mt-1 group-hover:text-blue-900 transition-colors">
                  {article.title}
                </h4>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-gray-300 p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-900">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold">Más Leídas</h3>
        </div>
        <ol className="space-y-4">
          {mostReadArticles.slice(0, 5).map((article, index) => (
            <li key={article.id} className="flex gap-3">
              <span className="font-serif text-3xl font-bold text-gray-300 leading-none">
                {index + 1}
              </span>
              <button
                onClick={() => onArticleClick(article)}
                className="text-left group flex-1"
              >
                <h4 className="font-semibold text-sm leading-tight group-hover:text-blue-900 transition-colors">
                  {article.title}
                </h4>
                {article.section_name && (
                  <span className="text-xs text-gray-600 mt-1 inline-block">
                    {article.section_name}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold">Opinión del Día</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm italic leading-relaxed text-gray-700">
            "El periodismo es el primer borrador de la historia. En tiempos de incertidumbre,
            la información veraz y contrastada es más necesaria que nunca."
          </p>
          <p className="text-sm font-semibold">— Redacción de EL COMUNICACIÓN</p>
        </div>
      </section>
    </aside>
  );
}
