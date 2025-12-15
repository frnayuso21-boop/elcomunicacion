export function ExactLogo() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full" style={{ backgroundColor: '#F2EBDD' }}>
      {/* Contenedor con las proporciones exactas */}
      <div className="relative w-full" style={{ 
        width: '1145px', 
        height: '194px',
        backgroundColor: '#F2EBDD'
      }}>
        {/* Línea superior con espaciado exacto */}
        <div style={{ height: '18px' }}></div>
        
        {/* EL COMUNICACIÓN - Línea principal */}
        <div 
          className="font-serif font-black text-center w-full"
          style={{
            fontSize: '120px',
            lineHeight: '120px',
            color: '#0D2E49',
            fontFamily: 'serif',
            fontWeight: 900,
            letterSpacing: '0px',
            textTransform: 'uppercase',
            transform: 'scaleX(0.9)',
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            position: 'relative',
            top: '0px'
          }}
        >
          EL COMUNICACIÓN
        </div>
        
        {/* Espacio exacto entre líneas */}
        <div style={{ height: '20px' }}></div>
        
        {/* Diario Nacional Español - Segunda línea */}
        <div 
          className="font-serif font-medium text-center w-full"
          style={{
            fontSize: '40px',
            lineHeight: '40px',
            color: '#0D2E49',
            fontFamily: 'serif',
            fontWeight: 500,
            letterSpacing: 'normal',
            textTransform: 'capitalize',
            transform: 'scaleX(0.9)',
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            position: 'relative',
            top: '0px'
          }}
        >
          Diario Nacional Español
        </div>
        
        {/* Espacio inferior exacto */}
        <div style={{ height: '18px' }}></div>
      </div>
    </div>
  );
}