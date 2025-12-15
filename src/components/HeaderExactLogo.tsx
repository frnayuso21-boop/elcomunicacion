import '../styles/newspaper-logo.css';

export function HeaderExactLogo() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full select-none" style={{ backgroundColor: '#F2EBDD' }}>
      {/* EL COMUNICACIÓN - Línea principal con tipografía exacta de periódico */}
      <div 
        className="newspaper-logo text-center w-full"
        style={{
          fontSize: '48px',
          lineHeight: '48px',
          color: '#0D2E49',
          fontWeight: 900,
          letterSpacing: '0px',
          textTransform: 'uppercase',
          transform: 'scaleX(0.9) scaleY(1)',
          width: '100%',
          fontStretch: 'condensed',
          fontStyle: 'normal',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        EL COMUNICACIÓN
      </div>
      
      {/* Espacio exacto entre líneas (20px en el original, proporcional) */}
      <div style={{ height: '8px' }}></div>
      
      {/* Diario Nacional Español - Segunda línea exacta */}
      <div 
        className="newspaper-subhead text-center w-full"
        style={{
          fontSize: '16px',
          lineHeight: '16px',
          color: '#0D2E49',
          fontWeight: 500,
          letterSpacing: 'normal',
          textTransform: 'capitalize',
          transform: 'scaleX(0.9)',
          width: '100%',
          fontStyle: 'normal',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        Diario Nacional Español
      </div>
    </div>
  );
}