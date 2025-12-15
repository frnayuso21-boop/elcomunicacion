import React from 'react';
import { ArrowLeft, Share2, Bookmark, Eye, Clock, User, Calendar, Tag } from 'lucide-react';
import { ContentContainer } from './NewspaperLayout';
import { typography, layout } from '../styles/typography';
import type { Article } from '../lib/database.types';

interface ContentRichArticleDetailProps {
  article: Article & { section_name?: string };
  relatedArticles: (Article & { section_name?: string })[];
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

export function ContentRichArticleDetail({ 
  article, 
  relatedArticles, 
  onBack, 
  onArticleClick 
}: ContentRichArticleDetailProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="py-6">
      {/* Article Header - Full Width */}
      <ContentContainer variant="article">
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
            <span>•</span>
            <span className="font-medium text-blue-600">{article.section_name}</span>
          </div>

          {/* Article Meta */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Por {article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.reading_time} min lectura</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.views} vistas</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className={`${typography.headline.main} mb-4`}>
            {article.title}
          </h1>

          {/* Article Subtitle */}
          <p className={`${typography.body.lead} text-gray-700 mb-6`}>
            {article.subtitle}
          </p>

          {/* Share Actions */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </div>
      </ContentContainer>

      {/* Main Content Grid - Full Width (sin publicidad) */}
      <ContentContainer variant="full">
        <div className={layout.grid.main}>
          {/* Article Content - 9 columns (más ancho) */}
          <div className="lg:col-span-9">
            {/* Hero Image */}
            {article.image_url && (
              <div className="mb-8">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {article.image_caption && (
                  <p className="text-sm text-gray-600 mt-3 italic">
                    {article.image_caption}
                  </p>
                )}
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ 
                  __html: article.content || article.subtitle || '' 
                }}
              />
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{article.author}</h3>
                  <p className="text-sm text-gray-600">
                    Periodista especializado en {article.section_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Temas relacionados</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 3 columns (más contenido sin publicidad) */}
          <div className="lg:col-span-3">
            {/* Related Articles - Extended */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Artículos relacionados
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <article key={relatedArticle.id} className="group">
                      {relatedArticle.image_url && (
                        <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                          <img
                            src={relatedArticle.image_url}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-2">
                        <button
                          onClick={() => onArticleClick(relatedArticle)}
                          className="text-left"
                        >
                          {relatedArticle.title}
                        </button>
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {relatedArticle.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        <span>{relatedArticle.section_name}</span>
                        <span>•</span>
                        <span>{new Date(relatedArticle.published_at).toLocaleDateString('es-ES')}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Most Read - Extended */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Más leído
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div key={index} className="group">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full">
                          {index}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1">
                          <button className="text-left">
                            Título del artículo más leído #{index}
                          </button>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Sección</span>
                          <span>•</span>
                          <span>1.2k vistas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}