import type { Article } from '../lib/database.types';

interface ArticleCardProps {
  article: Article & { section_name?: string };
  featured?: boolean;
  onClick: () => void;
}

export function ArticleCard({ article, featured = false, onClick }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (featured) {
    return (
      <article
        onClick={onClick}
        className="cursor-pointer group mb-8 border-b-2 border-gray-900 pb-8"
      >
        {article.image_url && (
          <div className="mb-4 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {article.section_name && (
          <div className="text-blue-900 font-semibold text-xs uppercase tracking-wider mb-2">
            {article.section_name}
          </div>
        )}
        <h2 className="font-serif text-5xl font-bold leading-tight mb-3 group-hover:text-blue-900 transition-colors">
          {article.title}
        </h2>
        {article.subtitle && (
          <p className="text-xl text-gray-700 leading-relaxed mb-3">
            {article.subtitle}
          </p>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="font-medium">{article.author}</span>
          <span>•</span>
          <time>{formatDate(article.published_at)}</time>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className="cursor-pointer group"
    >
      {article.image_url && (
        <div className="mb-3 overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {article.section_name && (
        <div className="text-blue-900 font-semibold text-xs uppercase tracking-wider mb-2">
          {article.section_name}
        </div>
      )}
      <h3 className="font-serif text-2xl font-bold leading-tight mb-2 group-hover:text-blue-900 transition-colors">
        {article.title}
      </h3>
      {article.subtitle && (
        <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-2">
          {article.subtitle}
        </p>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span className="font-medium">{article.author}</span>
        <span>•</span>
        <time>{formatDate(article.published_at)}</time>
      </div>
    </article>
  );
}
