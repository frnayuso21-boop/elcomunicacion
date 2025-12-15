import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Calendar, User, Image as ImageIcon, BarChart3, TrendingUp, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SimpleImageUpload } from './SimpleImageUpload';
import type { Article, Section } from '../lib/database.types';

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image_url: '',
    author: 'Redacción',
    section_id: '',
    is_featured: false,
    published_at: new Date().toISOString().slice(0, 16)
  });

  // Recommendation system
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [articlesData, sectionsData] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('sections').select('*').order('order', { ascending: true })
      ]);

      if (articlesData.data) setArticles(articlesData.data);
      if (sectionsData.data) setSections(sectionsData.data);

      // Generate recommendations and trending
      generateRecommendations(articlesData.data || []);
      generateTrending(articlesData.data || []);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (articles: Article[]) => {
    // Simple recommendation algorithm based on views and recency
    const recommendations = articles
      .filter(article => article.views > 0)
      .sort((a, b) => {
        const scoreA = (a.views || 0) + (new Date(a.created_at).getTime() / 1000000);
        const scoreB = (b.views || 0) + (new Date(b.created_at).getTime() / 1000000);
        return scoreB - scoreA;
      })
      .slice(0, 5);
    
    setRecommendations(recommendations);
  };

  const generateTrending = (articles: Article[]) => {
    // Trending based on recent views and creation date
    const trending = articles
      .filter(article => {
        const daysSinceCreated = (Date.now() - new Date(article.created_at).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceCreated < 7 && (article.views || 0) > 5;
      })
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
    
    setTrendingArticles(trending);
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const articleData = {
        ...formData,
        section_id: formData.section_id || null,
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : new Date().toISOString(),
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;

      setArticles([data, ...articles]);
      resetForm();
      alert('Artículo creado exitosamente');

    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error al crear el artículo');
    }
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingArticle) return;

    try {
      const articleData = {
        ...formData,
        section_id: formData.section_id || null,
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id)
        .select()
        .single();

      if (error) throw error;

      setArticles(articles.map(article => 
        article.id === editingArticle.id ? data : article
      ));
      resetForm();
      alert('Artículo actualizado exitosamente');

    } catch (error) {
      console.error('Error updating article:', error);
      alert('Error al actualizar el artículo');
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      setArticles(articles.filter(article => article.id !== articleId));
      alert('Artículo eliminado exitosamente');

    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error al eliminar el artículo');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      content: '',
      image_url: '',
      author: 'Redacción',
      section_id: '',
      is_featured: false,
      published_at: new Date().toISOString().slice(0, 16)
    });
    setShowCreateForm(false);
    setEditingArticle(null);
  };

  const startEdit = (article: Article) => {
    setFormData({
      title: article.title,
      subtitle: article.subtitle || '',
      content: article.content,
      image_url: article.image_url || '',
      author: article.author || 'Redacción',
      section_id: article.section_id || '',
      is_featured: article.is_featured || false,
      published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
    });
    setEditingArticle(article);
    setShowCreateForm(true);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = !selectedSection || article.section_id === selectedSection;
    return matchesSearch && matchesSection;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Gestión completa de artículos y análisis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Total artículos: <span className="font-semibold">{articles.length}</span>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Artículo
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Estadísticas y Recomendaciones
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{articles.length}</div>
                <div className="text-sm text-gray-600">Artículos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {articles.reduce((sum, article) => sum + (article.views || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Vistas totales</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{sections.length}</div>
                <div className="text-sm text-gray-600">Secciones</div>
              </div>
            </div>
            
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <h3 className="font-medium mb-3 text-gray-900">Artículos recomendados</h3>
                <div className="space-y-2">
                  {recommendations.map(article => (
                    <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{article.title}</div>
                        <div className="text-xs text-gray-500">{article.views || 0} vistas</div>
                      </div>
                      <button
                        onClick={() => startEdit(article)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trending */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              En Tendencia
            </h2>
            {trendingArticles.length > 0 ? (
              <div className="space-y-3">
                {trendingArticles.map(article => (
                  <div key={article.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="font-medium text-sm mb-1">{article.title}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{article.views || 0} vistas</span>
                      <span>•</span>
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay artículos en tendencia esta semana</p>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las secciones</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Artículos ({filteredArticles.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vistas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {article.image_url && (
                          <img src={article.image_url} alt="" className="w-10 h-10 object-cover rounded" />
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {article.title}
                          </div>
                          {article.subtitle && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {article.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sections.find(s => s.id === article.section_id)?.name || 'Sin sección'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.author || 'Anónimo'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.views || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.is_featured 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {article.is_featured ? 'Destacado' : 'Publicado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(article)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  {editingArticle ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Título *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Escribe el titular de la noticia"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Subtítulo</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Breve resumen o bajada"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Sección *</label>
                    <select
                      required
                      value={formData.section_id}
                      onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar sección</option>
                      {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Autor</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre del autor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Fecha de publicación</label>
                    <input
                      type="datetime-local"
                      value={formData.published_at}
                      onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-5 h-5 mr-2"
                    />
                    <label htmlFor="is_featured" className="text-sm font-semibold">
                      Destacar en portada
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Imagen del artículo</label>
                  <div className="space-y-3">
                    {formData.image_url ? (
                      <div className="relative">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image_url: '' })}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowImageUpload(true)}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2"
                      >
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Subir imagen</span>
                        <span className="text-xs text-gray-500">Cualquier formato • Máx 15MB</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Contenido del artículo *</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Escribe el contenido completo del artículo..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingArticle ? 'Actualizar Artículo' : 'Crear Artículo'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showImageUpload && (
          <SimpleImageUpload
            onImageUpload={(url) => {
              setFormData({ ...formData, image_url: url });
              setShowImageUpload(false);
            }}
            onClose={() => setShowImageUpload(false)}
          />
        )}
      </div>
    </div>
  );
}