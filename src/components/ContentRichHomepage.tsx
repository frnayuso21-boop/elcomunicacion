import type { Article } from '../lib/database.types';
import { ContentContainer, GridSystem } from './NewspaperLayout';

interface ContentRichHomepageProps {
  featuredArticle: (Article & { section_name?: string }) | null;
  secondaryArticles: (Article & { section_name?: string })[];
  latestArticles: (Article & { section_name?: string })[];
  mostReadArticles: (Article & { section_name?: string })[];
  onArticleClick: (article: Article) => void;
}

export function ContentRichHomepage({
  featuredArticle,
  secondaryArticles,
  latestArticles,
  mostReadArticles,
  onArticleClick
}: ContentRichHomepageProps) {
  return (
    <div className="py-6">
      {/* Main Content Grid - Full Width */}
      <ContentContainer variant="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Primary Content Column - 9 columns (más ancho) */}
          <div className="lg:col-span-9">
            {/* Featured Article - Full Width */}
            {featuredArticle && (
              <div className="mb-8">
                <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {featuredArticle.image_url && (
                    <div className="relative aspect-video">
                      <img
                        src={featuredArticle.image_url}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
                          Destacado
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
                        {featuredArticle.section_name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <time className="text-xs text-gray-500">
                        {new Date(featuredArticle.published_at).toLocaleDateString('es-ES')}
                      </time>
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                      <button
                        onClick={() => onArticleClick(featuredArticle)}
                        className="hover:text-blue-900 transition-colors text-left"
                      >
                        {featuredArticle.title}
                      </button>
                    </h1>
                    
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {featuredArticle.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Por <span className="font-medium">{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{featuredArticle.reading_time} min lectura</span>
                        <span>{featuredArticle.views} vistas</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Secondary Articles - 3 Column Grid (más contenido) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {secondaryArticles.slice(0, 6).map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {article.image_url && (
                    <div className="aspect-video">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        {article.section_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 leading-snug">
                      <button
                        onClick={() => onArticleClick(article)}
                        className="hover:text-blue-900 transition-colors text-left"
                      >
                        {article.title}
                      </button>
                    </h2>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {article.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.reading_time} min</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Additional Articles - List Format (más artículos) */}
            <div className="space-y-4 mb-8">
              {secondaryArticles.slice(6, 12).map((article) => (
                <article key={article.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex gap-4">
                    {article.image_url && (
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          {article.section_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.published_at).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-serif font-bold text-gray-900 mb-1">
                        <button
                          onClick={() => onArticleClick(article)}
                          className="hover:text-blue-900 transition-colors text-left"
                        >
                          {article.title}
                        </button>
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Third Row - More Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryArticles.slice(12, 16).map((article) => (
                <article key={article.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        {article.section_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      <button
                        onClick={() => onArticleClick(article)}
                        className="hover:text-blue-900 transition-colors text-left"
                      >
                        {article.title}
                      </button>
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {article.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                      <span>{article.author}</span>
                      <span>{article.reading_time} min</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar Column - 3 columns (más contenido) */}
          <div className="lg:col-span-3">
            {/* Most Read Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Más Leído
              </h2>
              <div className="space-y-4">
                {mostReadArticles.slice(0, 8).map((article, index) => (
                  <article key={article.id} className="group">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center w-6 h-6 ${
                          index < 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                        } text-xs font-bold rounded-full`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1">
                          <button
                            onClick={() => onArticleClick(article)}
                            className="text-left"
                          >
                            {article.title}
                          </button>
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{article.section_name}</span>
                          <span>•</span>
                          <span>{article.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Latest News Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Últimas Noticias
              </h2>
              <div className="space-y-4">
                {latestArticles.slice(0, 8).map((article) => (
                  <article key={article.id} className="group">
                    <div className="flex gap-3">
                      {article.image_url && (
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-sm font-serif font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1">
                          <button
                            onClick={() => onArticleClick(article)}
                            className="text-left"
                          >
                            {article.title}
                          </button>
                        </h3>
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

            {/* Trending Topics */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Tendencias
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Política', 'Economía', 'Internacional', 'Tecnología', 'Deportes', 'Cultura'].map((topic) => (
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