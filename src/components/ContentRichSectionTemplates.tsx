import React from 'react';
import { ContentContainer, GridSystem } from './NewspaperLayout';
import { typography, layout, styles } from '../styles/typography';
import type { Article } from '../lib/database.types';

interface ContentRichSectionTemplateProps {
  title: string;
  subtitle?: string;
  articles: Article[];
  onArticleClick: (article: Article) => void;
  variant?: 'news' | 'opinion' | 'sports' | 'culture';
}

export function ContentRichSectionTemplate({ 
  title, 
  subtitle, 
  articles, 
  onArticleClick, 
  variant = 'news' 
}: ContentRichSectionTemplateProps) {
  const sectionColors = {
    news: 'border-blue-600',
    opinion: 'border-green-600',
    sports: 'border-orange-600',
    culture: 'border-purple-600'
  };

  const titleColors = {
    news: 'text-blue-900',
    opinion: 'text-green-900',
    sports: 'text-orange-900',
    culture: 'text-purple-900'
  };

  return (
    <div className="py-6">
      {/* Section Header */}
      <ContentContainer variant="narrow">
        <div className={`border-l-4 ${sectionColors[variant]} pl-6 mb-8`}>
          <h1 className={`${typography.headline.main} ${titleColors[variant]} mb-2`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`${typography.body.lead} text-gray-600`}>
              {subtitle}
            </p>
          )}
        </div>
      </ContentContainer>

      {/* Main Content Grid - Full Width */}
      <ContentContainer variant="full">
        <div className={layout.grid.main}>
          {/* Primary Content - 9 columns (más ancho sin publicidad) */}
          <div className="lg:col-span-9">
            {/* Featured Article */}
            {articles[0] && (
              <article className={`${styles.card.base} ${styles.card.padded} ${layout.spacing.article}`}>
                {articles[0].image_url && (
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <img
                      src={articles[0].image_url}
                      alt={articles[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`${typography.label.section} ${titleColors[variant]}`}>
                      {articles[0].section_name}
                    </span>
                    <time className={typography.label.date}>
                      {new Date(articles[0].published_at).toLocaleDateString('es-ES')}
                    </time>
                  </div>
                  
                  <h2 className={`${typography.headline.secondary} ${titleColors[variant]} hover:text-blue-900 transition-colors`}>
                    <button onClick={() => onArticleClick(articles[0])} className="text-left">
                      {articles[0].title}
                    </button>
                  </h2>
                  
                  <p className={typography.body.lead}>
                    {articles[0].subtitle}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                    <span className={typography.label.author}>
                      Por {articles[0].author}
                    </span>
                    <span className={typography.label.readingTime}>
                      {articles[0].reading_time} min lectura
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Secondary Articles Grid - 3 columns (más contenido) */}
            <GridSystem columns={3} gap="medium">
              {articles.slice(1, 7).map((article) => (
                <article key={article.id} className={`${styles.card.base} ${styles.card.padded} ${styles.card.hover}`}>
                  {article.image_url && (
                    <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`${typography.label.section} ${titleColors[variant]}`}>
                        {article.section_name}
                      </span>
                      <span className={typography.label.date}>
                        {new Date(article.published_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    
                    <h3 className={`${typography.headline.tertiary} ${titleColors[variant]} hover:text-blue-900 transition-colors`}>
                      <button onClick={() => onArticleClick(article)} className="text-left">
                        {article.title}
                      </button>
                    </h3>
                    
                    <p className={`${typography.body.small} ${styles.text.clamp[2]}`}>
                      {article.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </GridSystem>

            {/* Additional Articles List - More content */}
            <div className="space-y-4 mt-8">
              {articles.slice(7, 15).map((article) => (
                <article key={article.id} className={`${styles.card.base} ${styles.card.compact} ${styles.card.hover}`}>
                  <div className="flex gap-4">
                    {article.image_url && (
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`${typography.label.section} ${titleColors[variant]}`}>
                          {article.section_name}
                        </span>
                        <span className={typography.label.date}>
                          {new Date(article.published_at).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      
                      <h4 className={`${typography.headline.section} ${titleColors[variant]} hover:text-blue-900 transition-colors`}>
                        <button onClick={() => onArticleClick(article)} className="text-left">
                          {article.title}
                        </button>
                      </h4>
                      
                      <p className={`${typography.body.small} ${styles.text.clamp[2]}`}>
                        {article.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar - 3 columns (más contenido sin publicidad) */}
          <div className="lg:col-span-3">
            {/* Most Read - Extended */}
            <div className={`${styles.card.base} ${styles.card.padded} ${layout.spacing.section}`}>
              <h3 className={`${typography.headline.tertiary} ${titleColors[variant]} mb-4 border-b border-gray-200 pb-2`}>
                Más Leído
              </h3>
              <div className="space-y-3">
                {articles.slice(0, 10).map((article, index) => (
                  <div key={article.id} className="group">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center w-6 h-6 ${
                          index < 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                        } text-xs font-bold rounded-full`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1 ${styles.text.clamp[2]}`}>
                          <button onClick={() => onArticleClick(article)} className="text-left">
                            {article.title}
                          </button>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{article.section_name}</span>
                          <span>•</span>
                          <span>{article.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest News - Extended */}
            <div className={`${styles.card.base} ${styles.card.padded} ${layout.spacing.section}`}>
              <h3 className={`${typography.headline.tertiary} ${titleColors[variant]} mb-4 border-b border-gray-200 pb-2`}>
                Últimas Noticias
              </h3>
              <div className="space-y-3">
                {articles.slice(0, 8).map((article) => (
                  <article key={article.id} className="group">
                    <div className="flex gap-3">
                      {article.image_url && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className={`text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1 ${styles.text.clamp[2]}`}>
                          <button onClick={() => onArticleClick(article)} className="text-left">
                            {article.title}
                          </button>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="text-blue-600 font-medium">{article.section_name}</span>
                          <span>•</span>
                          <time>{new Date(article.published_at).toLocaleDateString('es-ES')}</time>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Related Topics */}
            <div className={`${styles.card.base} ${styles.card.padded}`}>
              <h3 className={`${typography.headline.tertiary} ${titleColors[variant]} mb-4 border-b border-gray-200 pb-2`}>
                Temas Relacionados
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Política', 'Economía', 'Internacional', 'Sociedad', 'Tecnología', 'Salud', 'Educación', 'Medio Ambiente'].map((topic) => (
                  <button
                    key={topic}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

// Specialized section templates without advertising
export function ContentRichOpinionSection({ articles, onArticleClick }: { articles: Article[]; onArticleClick: (article: Article) => void; }) {
  return (
    <ContentRichSectionTemplate
      title="Opinión"
      subtitle="Análisis, editoriales y columnas de opinión de nuestros expertos"
      articles={articles}
      onArticleClick={onArticleClick}
      variant="opinion"
    />
  );
}

export function ContentRichSportsSection({ articles, onArticleClick }: { articles: Article[]; onArticleClick: (article: Article) => void; }) {
  return (
    <ContentRichSectionTemplate
      title="Deportes"
      subtitle="Toda la actualidad deportiva y los resultados en tiempo real"
      articles={articles}
      onArticleClick={onArticleClick}
      variant="sports"
    />
  );
}

export function ContentRichCultureSection({ articles, onArticleClick }: { articles: Article[]; onArticleClick: (article: Article) => void; }) {
  return (
    <ContentRichSectionTemplate
      title="Cultura"
      subtitle="Arte, literatura, cine y espectáculos"
      articles={articles}
      onArticleClick={onArticleClick}
      variant="culture"
    />
  );
}