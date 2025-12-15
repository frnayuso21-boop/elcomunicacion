export function HeaderLogo() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
      {/* Línea superior decorativa - más delgada */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent mb-0.5"></div>
      
      {/* Logo principal estirado - tamaño pequeño */}
      <div className="relative w-full max-w-2xl">
        <h1 className="font-serif text-2xl md:text-3xl font-black text-blue-900 tracking-[0.25em] leading-none select-none transform scale-x-125">
          EL COMUNICACIÓN
        </h1>
        
        {/* Sombra para efecto de relieve - más sutil */}
        <div className="absolute inset-0 -z-10 transform translate-x-px translate-y-px scale-x-125">
          <h1 className="font-serif text-2xl md:text-3xl font-black text-gray-400 tracking-[0.25em] leading-none opacity-20 select-none">
            EL COMUNICACIÓN
          </h1>
        </div>
      </div>
      
      {/* Subtítulo con líneas decorativas - minimalista */}
      <div className="flex items-center gap-2 mt-0.5 w-full max-w-lg">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-900"></div>
        <div className="font-serif text-2xs font-semibold text-gray-700 tracking-widest whitespace-nowrap px-1">
          Diario Nacional Español
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-900"></div>
      </div>
      
      {/* Línea inferior decorativa - más delgada */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent mt-0.5"></div>
    </div>
  );
}