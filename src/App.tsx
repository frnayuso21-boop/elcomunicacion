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
    
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      // Use mock data if Supabase is not configured
      console.log('Supabase not configured, using mock data');
      setSections([
        { id: '1', name: 'Última Hora', slug: 'ultima-hora', description: 'Noticias de última hora', order: 1 },
        { id: '2', name: 'Política', slug: 'politica', description: 'Noticias políticas', order: 2 },
        { id: '3', name: 'Economía', slug: 'economia', description: 'Noticias económicas', order: 3 },
        { id: '4', name: 'Internacional', slug: 'internacional', description: 'Noticias internacionales', order: 4 },
        { id: '5', name: 'Sociedad', slug: 'sociedad', description: 'Noticias de sociedad', order: 5 },
        { id: '6', name: 'Deportes', slug: 'deportes', description: 'Noticias deportivas', order: 6 },
        { id: '7', name: 'Cultura', slug: 'cultura', description: 'Noticias culturales', order: 7 }
      ]);
      
      setArticles([
        {
          id: '1',
          title: 'El Congreso aprueba la reforma laboral con amplio apoyo',
          slug: 'congreso-aprueba-reforma-laboral',
          excerpt: 'La reforma laboral ha sido aprobada esta mañana en el Congreso de los Diputados con el apoyo de los principales partidos políticos.',
          content: 'El Congreso de los Diputados ha aprobado hoy la reforma laboral con 245 votos a favor, 75 en contra y 23 abstenciones. Esta reforma representa un cambio significativo en la legislación laboral española.',
          featured_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Spanish%20Congress%20building%20with%20politicians%20voting%2C%20professional%20news%20photography%20style&image_size=landscape_16_9',
          section_id: '2',
          section_name: 'Política',
          published_at: '2024-12-15T10:00:00Z',
          views: 1250,
          is_featured: true,
          created_at: '2024-12-15T10:00:00Z',
          updated_at: '2024-12-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'La bolsa española cierra con subidas del 2.3%',
          slug: 'bolsa-espanola-subidas',
          excerpt: 'El IBEX 35 ha cerrado la jornada con una subida del 2.3% impulsado por el sector bancario.',
          content: 'La bolsa española ha experimentado una jornada positiva con el IBEX 35 subiendo un 2.3%, liderado por el sector bancario y energético.',
          featured_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Stock%20market%20trading%20floor%2C%20bull%20market%20trend%2C%20Spanish%20financial%20district&image_size=landscape_16_9',
          section_id: '3',
          section_name: 'Economía',
          published_at: '2024-12-15T09:30:00Z',
          views: 890,
          is_featured: false,
          created_at: '2024-12-15T09:30:00Z',
          updated_at: '2024-12-15T09:30:00Z'
        }
      ]);
      
      setLoading(false);
      return;
    }
    
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
