export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto">
      {/* Línea superior decorativa - más delgada */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent mb-1"></div>
      
      {/* Logo principal estirado - tamaño pequeño */}
      <div className="relative w-full">
        <h1 className="font-serif text-3xl md:text-4xl font-black text-blue-900 tracking-[0.25em] leading-none select-none transform scale-x-125">
          EL COMUNICACIÓN
        </h1>
        
        {/* Sombra para efecto de relieve - más sutil */}
        <div className="absolute inset-0 -z-10 transform translate-x-px translate-y-px scale-x-125">
          <h1 className="font-serif text-3xl md:text-4xl font-black text-gray-400 tracking-[0.25em] leading-none opacity-20 select-none">
            EL COMUNICACIÓN
          </h1>
        </div>
      </div>
      
      {/* Subtítulo con estilo periódico - más compacto */}
      <div className="flex items-center gap-2 mt-0.5">
        <div className="w-8 h-px bg-blue-900"></div>
        <div className="font-serif text-2xs font-semibold text-gray-700 tracking-widest whitespace-nowrap px-1">
          Diario Nacional Español
        </div>
        <div className="w-8 h-px bg-blue-900"></div>
      </div>
      
      {/* Línea inferior decorativa - más delgada */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent mt-1"></div>
    </div>
  );
}