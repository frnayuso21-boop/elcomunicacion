import type { Article, Section } from '../lib/database.types';
import { ArticleCard } from './ArticleCard';
import { Sidebar } from './Sidebar';

interface HomepageProps {
  featuredArticle: (Article & { section_name?: string }) | null;
  secondaryArticles: (Article & { section_name?: string })[];
  latestArticles: (Article & { section_name?: string })[];
  mostReadArticles: (Article & { section_name?: string })[];
  onArticleClick: (article: Article) => void;
}

export function Homepage({
  featuredArticle,
  secondaryArticles,
  latestArticles,
  mostReadArticles,
  onArticleClick
}: HomepageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {featuredArticle && (
            <ArticleCard
              article={featuredArticle}
              featured
              onClick={() => onArticleClick(featuredArticle)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => onArticleClick(article)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Sidebar
            latestArticles={latestArticles}
            mostReadArticles={mostReadArticles}
            onArticleClick={onArticleClick}
          />
        </div>
      </div>
    </div>
  );
}
