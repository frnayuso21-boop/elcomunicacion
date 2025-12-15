export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F2EBDD' }}>
      <div className="animate-pulse">
        <img 
          src="/src/public/logo-el-comunicacion.png" 
          alt="El Comunicación Periódico" 
          className="h-16 w-auto filter sepia-[0.8] hue-rotate-[340deg] saturate-[1.5] brightness-[1.1] contrast-[1.2] bg-transparent mx-auto"
        />
        <div className="text-center mt-4">
          <div className="text-gray-700 font-medium text-sm">Cargando...</div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent mx-auto mt-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}