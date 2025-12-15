import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Article, Section } from './lib/database.types';
import { RedesignedMainApp } from './components/RedesignedMainApp';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingScreen } from './components/LoadingScreen';

type ArticleWithSection = Article & { section_name?: string };

function MainApp() {
  const [sections, setSections] = useState<Section[]>([]);
  const [articles, setArticles] = useState<ArticleWithSection[]>([]);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleWithSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadSections(), loadArticles()]);
    setLoading(false);
  };

  const loadSections = async () => {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order');

    if (error) {
      console.error('Error loading sections:', error);
      return;
    }

    if (data) setSections(data);
  };

  const loadArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        section:sections(name)
      `)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error loading articles:', error);
      return;
    }

    if (data) {
      const articlesWithSection = data.map((article) => ({
        ...article,
        section_name: article.section?.name
      }));
      setArticles(articlesWithSection);
    }
  };

  const handleArticleClick = async (article: Article) => {
    await supabase
      .from('articles')
      .update({ views: article.views + 1 })
      .eq('id', article.id);

    setSelectedArticle(article as ArticleWithSection);
    window.scrollTo(0, 0);
  };

  const handleSectionChange = (slug: string | null) => {
    setCurrentSection(slug);
    setSelectedArticle(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <RedesignedMainApp
      sections={sections}
      articles={articles}
      currentSection={currentSection}
      selectedArticle={selectedArticle}
      onSectionChange={handleSectionChange}
      onArticleClick={handleArticleClick}
      onBack={() => setSelectedArticle(null)}
      onAdminClick={() => {}}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
