import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar multer para manejar archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB máximo (increased from 5MB)
  },
  fileFilter: (req, file, cb) => {
    // Accept all common image formats
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp',
      'image/jpg', 'image/svg+xml', 'image/tiff', 'image/x-icon'
    ];
    if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Formato de imagen no válido.'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Configurar Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

if (!supabaseUrl || !supabaseServiceKey || supabaseUrl === 'https://your-project.supabase.co') {
  console.error('❌ Falta configuración de Supabase en variables de entorno');
  console.log('Por favor configura:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_SERVICE_ROLE_KEY');
  console.log('Puedes obtenerlas desde el dashboard de Supabase');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Función para generar slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// POST /api/articles - Crear artículo desde n8n
app.post('/api/articles', async (req, res) => {
  try {
    const { title, summary, content, source, category, date, image } = req.body;

    // Validación de campos requeridos
    if (!title || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'Título y contenido son requeridos'
      });
    }

    // Generar slug único
    let slug = generateSlug(title);
    
    // Verificar si el slug ya existe
    const { data: existingArticles } = await supabase
      .from('articles')
      .select('slug')
      .like('slug', `${slug}%`);

    if (existingArticles && existingArticles.length > 0) {
      const existingSlugs = existingArticles.map(a => a.slug);
      let counter = 1;
      let newSlug = slug;
      
      while (existingSlugs.includes(newSlug)) {
        newSlug = `${slug}-${counter}`;
        counter++;
      }
      
      slug = newSlug;
    }

    // Preparar datos del artículo
    const articleData = {
      title: title.trim(),
      summary: summary?.trim() || '',
      content: content.trim(),
      source: source?.trim() || 'n8n-automation',
      slug: slug,
      section_id: category || 1, // Sección por defecto
      published_at: date ? new Date(date).toISOString() : new Date().toISOString(),
      views: 0,
      is_featured: false,
      image_url: image || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insertar en base de datos
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error al insertar artículo:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error al guardar el artículo',
        error: error.message
      });
    }

    console.log('✅ Artículo creado exitosamente:', data.id, data.slug);

    res.status(201).json({
      status: 'success',
      articleId: data.id,
      slug: data.slug,
      message: 'Artículo creado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error en POST /api/articles:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /api/articles - Obtener artículos (útil para n8n)
app.get('/api/articles', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }

    res.json({
      status: 'success',
      data: data,
      count: data.length
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/sections - Obtener secciones disponibles
app.get('/api/sections', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }

    res.json({
      status: 'success',
      data: data
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/articles/stats - Obtener estadísticas de artículos
app.get('/api/articles/stats', async (req, res) => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('views, created_at, section_id');

    if (error) throw error;

    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
    const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
    
    // Articles from last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentArticles = articles.filter(article => 
      new Date(article.created_at) >= lastWeek
    ).length;

    res.json({
      status: 'success',
      data: {
        totalArticles,
        totalViews,
        avgViews,
        recentArticles
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT /api/articles/:id - Actualizar artículo
app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, image_url, author, section_id, is_featured, published_at } = req.body;

    const updateData = {
      title,
      subtitle,
      content,
      image_url,
      author,
      section_id: section_id || null,
      is_featured,
      published_at: published_at ? new Date(published_at).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      status: 'success',
      data: data,
      message: 'Artículo actualizado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error al actualizar artículo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar el artículo',
      error: error.message
    });
  }
});

// DELETE /api/articles/:id - Eliminar artículo
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      status: 'success',
      message: 'Artículo eliminado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error al eliminar artículo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar el artículo',
      error: error.message
    });
  }
});

// POST /api/upload-image - Subir imagen a Supabase Storage
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No se proporcionó ninguna imagen'
      });
    }

    const { folder = 'articles' } = req.body;
    const file = req.file;
    
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('❌ Error al subir imagen a Supabase:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error al subir la imagen',
        error: error.message
      });
    }

    // Obtener URL pública de la imagen
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    console.log('✅ Imagen subida exitosamente:', publicUrl);

    res.json({
      status: 'success',
      url: publicUrl,
      fileName: fileName,
      size: file.size
    });

  } catch (error) {
    console.error('❌ Error en POST /api/upload-image:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend ejecutándose en:`);
  console.log(`   • Local: http://localhost:${PORT}`);
  console.log(`   • Red: http://0.0.0.0:${PORT}`);
  console.log(`📰 Endpoints disponibles:`);
  console.log(`   • POST /api/articles - Crear artículo desde n8n`);
  console.log(`   • GET  /api/articles - Obtener artículos`);
  console.log(`   • GET  /api/articles/stats - Estadísticas`);
  console.log(`   • PUT  /api/articles/:id - Actualizar artículo`);
  console.log(`   • DELETE /api/articles/:id - Eliminar artículo`);
  console.log(`   • GET  /api/sections - Obtener secciones`);
  console.log(`   • POST /api/upload-image - Subir imagen`);
  console.log(`   • GET  /api/health - Verificar estado`);
});

export default app;