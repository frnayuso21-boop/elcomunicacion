/*
  # Create Articles Schema for EL COMUNICACIÓN

  ## Overview
  This migration creates the necessary database structure for a digital newspaper,
  including articles, sections, and related functionality.

  ## New Tables
  
  ### `sections`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, unique) - Section name (e.g., "Política", "Economía")
  - `slug` (text, unique) - URL-friendly version (e.g., "politica", "economia")
  - `order` (integer) - Display order in navigation
  - `created_at` (timestamptz) - Creation timestamp

  ### `articles`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article headline
  - `subtitle` (text) - Article subheadline/summary
  - `content` (text) - Full article body
  - `image_url` (text) - Featured image URL
  - `author` (text) - Author name
  - `section_id` (uuid, foreign key) - Reference to sections table
  - `is_featured` (boolean) - Whether article appears in main position
  - `views` (integer) - View count for "most read" functionality
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for published articles
  - No authentication required for this public newspaper site
*/

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text DEFAULT '',
  content text NOT NULL,
  image_url text DEFAULT '',
  author text DEFAULT 'Redacción',
  section_id uuid REFERENCES sections(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  views integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view sections"
  ON sections
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view articles"
  ON articles
  FOR SELECT
  USING (true);

-- For demo purposes, allow public insert (in production, you'd restrict this)
CREATE POLICY "Anyone can insert articles"
  ON articles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update articles"
  ON articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Insert default sections
INSERT INTO sections (name, slug, "order") VALUES
  ('Política', 'politica', 1),
  ('Economía', 'economia', 2),
  ('Internacional', 'internacional', 3),
  ('Sociedad', 'sociedad', 4),
  ('Tecnología', 'tecnologia', 5),
  ('Deportes', 'deportes', 6),
  ('Cultura', 'cultura', 7),
  ('Opinión', 'opinion', 8),
  ('Última Hora', 'ultima-hora', 9)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, subtitle, content, image_url, author, section_id, is_featured, published_at) 
SELECT 
  'El futuro de la economía digital en España',
  'Expertos analizan el impacto de las nuevas tecnologías en el crecimiento económico nacional',
  'La economía digital española está experimentando una transformación sin precedentes. Los últimos datos del sector tecnológico revelan un crecimiento sostenido que promete cambiar el panorama empresarial del país en los próximos años.

Según el informe presentado por el Ministerio de Economía, la digitalización de las empresas ha aumentado un 34% en el último año, consolidando a España como uno de los países líderes en transformación digital dentro de la Unión Europea.

Los expertos señalan que este crecimiento se debe principalmente a la inversión en infraestructuras tecnológicas y a la formación de profesionales especializados en nuevas tecnologías. Las pequeñas y medianas empresas han sido las principales beneficiarias de estas políticas, logrando expandir sus mercados más allá de las fronteras nacionales.

El sector fintech ha experimentado un auge particular, con startups españolas captando inversiones millonarias de fondos internacionales. Esta tendencia ha generado miles de empleos especializados y ha posicionado a ciudades como Madrid y Barcelona como hubs tecnológicos de referencia europea.',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'María González',
  (SELECT id FROM sections WHERE slug = 'economia'),
  true,
  now() - interval '2 hours'
ON CONFLICT DO NOTHING;

INSERT INTO articles (title, subtitle, content, image_url, author, section_id, published_at)
SELECT 
  'Nueva reforma educativa busca modernizar el sistema',
  'El gobierno propone cambios estructurales en la enseñanza secundaria y universitaria',
  'El Ministerio de Educación ha presentado una propuesta de reforma que busca adaptar el sistema educativo a las demandas del siglo XXI. La iniciativa incluye la incorporación de nuevas metodologías pedagógicas y la digitalización de los contenidos académicos.

Entre las principales novedades se encuentra la reducción del número de asignaturas obligatorias y el aumento de las optativas, permitiendo a los estudiantes personalizar su formación según sus intereses y aptitudes.

Los sindicatos de profesores han expresado su apoyo cauteloso a la reforma, aunque solicitan mayores recursos para la formación del profesorado y la mejora de las infraestructuras escolares.',
  'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Carlos Ruiz',
  (SELECT id FROM sections WHERE slug = 'sociedad'),
  now() - interval '4 hours'
ON CONFLICT DO NOTHING;

INSERT INTO articles (title, subtitle, content, image_url, author, section_id, published_at)
SELECT 
  'La inteligencia artificial revoluciona la medicina',
  'Hospitales españoles implementan sistemas de diagnóstico asistido por IA',
  'La inteligencia artificial está transformando la práctica médica en España. Varios hospitales de referencia han comenzado a utilizar sistemas de diagnóstico asistido que permiten detectar enfermedades con mayor precisión y rapidez.

Estos sistemas, desarrollados mediante aprendizaje profundo, pueden analizar imágenes médicas y detectar patrones que podrían pasar desapercibidos al ojo humano. Los resultados preliminares muestran una mejora significativa en la detección temprana de cáncer y otras enfermedades graves.

Los profesionales médicos destacan que estas herramientas no reemplazan el criterio clínico, sino que lo complementan, permitiendo diagnósticos más rápidos y precisos.',
  'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Ana Martínez',
  (SELECT id FROM sections WHERE slug = 'tecnologia'),
  now() - interval '6 hours'
ON CONFLICT DO NOTHING;

INSERT INTO articles (title, subtitle, content, image_url, author, section_id, published_at)
SELECT 
  'El Gobierno aprueba nuevas medidas fiscales',
  'Las modificaciones tributarias afectarán a empresas y autónomos a partir del próximo trimestre',
  'El Consejo de Ministros ha aprobado un paquete de medidas fiscales que entrará en vigor el próximo trimestre. Las nuevas disposiciones incluyen incentivos para la contratación de jóvenes y reducciones fiscales para empresas que inviertan en I+D.

La oposición ha criticado algunas de las medidas, argumentando que no van suficientemente lejos en la reducción de la carga fiscal. Sin embargo, el gobierno defiende que se trata de un equilibrio necesario entre el apoyo al tejido empresarial y el mantenimiento de los servicios públicos.',
  'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Pedro Sánchez',
  (SELECT id FROM sections WHERE slug = 'politica'),
  now() - interval '8 hours'
ON CONFLICT DO NOTHING;

INSERT INTO articles (title, subtitle, content, image_url, author, section_id, published_at)
SELECT 
  'España clasificada para la final del torneo europeo',
  'La selección nacional logra una victoria histórica en las semifinales',
  'La selección española de fútbol ha conseguido su pase a la final del torneo europeo tras una emocionante victoria por 2-1 en las semifinales. El partido, disputado en un estadio abarrotado, mantuvo en vilo a millones de espectadores.

Los goles llegaron en la segunda mitad, con un desempeño sobresaliente del mediocampo español. El seleccionador destacó el trabajo en equipo y la determinación de los jugadores como claves del éxito.

La final se disputará el próximo domingo y se espera que millones de aficionados sigan el encuentro desde diferentes puntos del país.',
  'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Luis Fernández',
  (SELECT id FROM sections WHERE slug = 'deportes'),
  now() - interval '1 hour'
ON CONFLICT DO NOTHING;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_section ON articles(section_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured) WHERE is_featured = true;