import { useState, useEffect } from 'react';
import { X, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SimpleImageUpload } from './SimpleImageUpload';
import type { Section } from '../lib/database.types';

interface AdminPanelProps {
  onClose: () => void;
  onArticleCreated: () => void;
}

export function AdminPanel({ onClose, onArticleCreated }: AdminPanelProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image_url: '',
    author: 'Redacción',
    section_id: '',
    is_featured: false
  });

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    const { data } = await supabase
      .from('sections')
      .select('*')
      .order('order');
    if (data) setSections(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('articles').insert([
        {
          ...formData,
          section_id: formData.section_id || null,
          published_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      setFormData({
        title: '',
        subtitle: '',
        content: '',
        image_url: '',
        author: 'Redacción',
        section_id: '',
        is_featured: false
      });

      onArticleCreated();
      alert('Artículo publicado correctamente');
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error al publicar el artículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-300">
            <h2 className="font-serif text-3xl font-bold">Panel de Administración</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 focus:border-blue-900 focus:outline-none text-lg"
                placeholder="Escribe el titular de la noticia"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 focus:border-blue-900 focus:outline-none"
                placeholder="Breve resumen o bajada"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Sección *
                </label>
                <select
                  required
                  value={formData.section_id}
                  onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-900 focus:outline-none"
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
                <label className="block text-sm font-semibold mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-900 focus:outline-none"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Imagen del artículo
              </label>
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
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Subir imagen</span>
                    <span className="text-xs text-gray-500">Cualquier formato • Máx 15MB</span>
                  </button>
                )}
                
                {formData.image_url && (
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:border-blue-900 focus:outline-none text-sm"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Contenido del artículo *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 focus:border-blue-900 focus:outline-none font-sans"
                placeholder="Escribe el contenido completo del artículo. Separa párrafos con líneas en blanco."
              />
              <p className="text-xs text-gray-600 mt-1">
                Separa cada párrafo con una línea en blanco para mejor formato
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="is_featured" className="text-sm font-semibold">
                Destacar en portada principal
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {isSubmitting ? 'Publicando...' : 'Publicar Artículo'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

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
  );
}
