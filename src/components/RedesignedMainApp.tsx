import React from 'react';
import { NewspaperLayout } from './NewspaperLayout';
import { RedesignedHeader } from './RedesignedHeader';
import { ContentRichHomepage } from './ContentRichHomepage';
import { RedesignedArticleDetail } from './RedesignedArticleDetail';
import { ContentRichSectionTemplate, ContentRichOpinionSection, ContentRichSportsSection, ContentRichCultureSection } from './ContentRichSectionTemplates';
import type { Article, Section } from '../lib/database.types';

interface RedesignedMainAppProps {
  sections: Section[];
  articles: (Article & { section_name?: string })[];
  currentSection: string | null;
  selectedArticle: (Article & { section_name?: string }) | null;
  onSectionChange: (slug: string | null) => void;
  onArticleClick: (article: Article) => void;
  onBack: () => void;
  onAdminClick: () => void;
}

export function RedesignedMainApp({
  sections,
  articles,
  currentSection,
  selectedArticle,
  onSectionChange,
  onArticleClick,
  onBack,
  onAdminClick
}: RedesignedMainAppProps) {
  // Filter articles by current section
  const filteredArticles = currentSection
    ? articles.filter((article) => {
        const section = sections.find((s) => s.id === article.section_id);
        return section?.slug === currentSection;
      })
    : articles;

  // Get featured article
  const featuredArticle = filteredArticles.find((a) => a.is_featured) || filteredArticles[0] || null;
  
  // Get secondary articles
  const secondaryArticles = filteredArticles
    .filter((a) => a.id !== featuredArticle?.id)
    .slice(0, 8);

  // Get latest and most read articles
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 10);

  const mostReadArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Get related articles for detail view
  const relatedArticles = selectedArticle
    ? articles
        .filter((a) => a.section_id === selectedArticle.section_id && a.id !== selectedArticle.id)
        .slice(0, 3)
    : [];

  // Render appropriate section based on current section
  const renderSectionContent = () => {
    if (currentSection === 'opinion') {
      return (
        <ContentRichOpinionSection
          articles={filteredArticles}
          onArticleClick={onArticleClick}
        />
      );
    } else if (currentSection === 'sports' || currentSection === 'deportes') {
      return (
        <ContentRichSportsSection
          articles={filteredArticles}
          onArticleClick={onArticleClick}
        />
      );
    } else if (currentSection === 'culture' || currentSection === 'cultura') {
      return (
        <ContentRichCultureSection
          articles={filteredArticles}
          onArticleClick={onArticleClick}
        />
      );
    } else if (currentSection) {
      // Generic section template for other sections
      const section = sections.find(s => s.slug === currentSection);
      return (
        <ContentRichSectionTemplate
          title={section?.name || 'Sección'}
          subtitle={section?.description}
          articles={filteredArticles}
          onArticleClick={onArticleClick}
          variant="news"
        />
      );
    } else {
      // Homepage
      return (
        <ContentRichHomepage
          featuredArticle={featuredArticle}
          secondaryArticles={secondaryArticles}
          latestArticles={latestArticles}
          mostReadArticles={mostReadArticles}
          onArticleClick={onArticleClick}
        />
      );
    }
  };

  return (
    <NewspaperLayout>
      <RedesignedHeader
        sections={sections}
        currentSection={currentSection}
        onSectionChange={onSectionChange}
        onAdminClick={onAdminClick}
      />

      <main className="flex-1">
        {selectedArticle ? (
          <ContentRichArticleDetail
            article={selectedArticle}
            relatedArticles={relatedArticles}
            onBack={onBack}
            onArticleClick={onArticleClick}
          />
        ) : (
          renderSectionContent()
        )}
      </main>
    </NewspaperLayout>
  );
}