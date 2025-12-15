import type { Article } from '../lib/database.types';
import { ArrowLeft, Clock, User } from 'lucide-react';

interface ArticleDetailProps {
  article: Article & { section_name?: string };
  relatedArticles: (Article & { section_name?: string })[];
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

export function ArticleDetail({ article, relatedArticles, onBack, onArticleClick }: ArticleDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a portada
      </button>

      <article className="mb-12">
        {article.section_name && (
          <div className="text-blue-900 font-semibold text-sm uppercase tracking-wider mb-3">
            {article.section_name}
          </div>
        )}

        <h1 className="font-serif text-5xl font-bold leading-tight mb-4">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-2xl text-gray-700 leading-relaxed mb-6 font-light">
            {article.subtitle}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <time>{formatDate(article.published_at)}</time>
          </div>
        </div>

        {article.image_url && (
          <figure className="mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <div className="prose prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t-2 border-gray-900 pt-8">
          <h2 className="font-serif text-3xl font-bold mb-6">Noticias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <article
                key={related.id}
                onClick={() => onArticleClick(related)}
                className="cursor-pointer group"
              >
                {related.image_url && (
                  <div className="mb-3 overflow-hidden">
                    <img
                      src={related.image_url}
                      alt={related.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-blue-900 transition-colors">
                  {related.title}
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
