export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">EL COMUNICACIÓN</h3>
            <p className="text-gray-400 text-sm">
              Periodismo independiente y de calidad desde 2024
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Secciones</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Política</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Economía</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Internacional</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tecnología</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Recibe las noticias más importantes en tu correo
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button className="w-full mt-2 px-3 py-2 text-sm bg-blue-900 hover:bg-blue-800 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 EL COMUNICACIÓN. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
