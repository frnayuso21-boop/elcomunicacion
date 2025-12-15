import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl: string;
  advertiser: string;
  size: 'banner' | 'square' | 'rectangle' | 'skyscraper';
  position: 'left-sidebar' | 'right-sidebar' | 'inline' | 'header';
  ctaText?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface AdComponentProps {
  ad: Advertisement;
  onClose?: () => void;
  className?: string;
}

export function AdComponent({ ad, onClose, className = '' }: AdComponentProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleClick = () => {
    window.open(ad.linkUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  const sizeClasses = {
    banner: 'w-full h-24',
    square: 'w-72 h-60',
    rectangle: 'w-80 h-72',
    skyscraper: 'w-40 h-96'
  };

  const styles = {
    backgroundColor: ad.backgroundColor || '#ffffff',
    color: ad.textColor || '#000000'
  };

  return (
    <div className={`relative ${sizeClasses[ad.size]} ${className} cursor-pointer group`}>
      <div 
        className="w-full h-full rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
        style={styles}
        onClick={handleClick}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Ad Label */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            Publicidad
          </span>
        </div>

        {/* Ad Content */}
        <div className="h-full flex flex-col justify-center p-4">
          {ad.imageUrl && (
            <div className="flex-shrink-0 mb-3">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-32 object-cover rounded"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-2 leading-tight">
              {ad.title}
            </h3>
            
            {ad.description && (
              <p className="text-sm opacity-90 mb-3 line-clamp-2">
                {ad.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium opacity-75">
                {ad.advertiser}
              </span>
              
              {ad.ctaText && (
                <button className="flex items-center gap-1 text-sm font-bold hover:underline">
                  {ad.ctaText}
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdManagerProps {
  position: 'left-sidebar' | 'right-sidebar' | 'inline' | 'header';
  size: 'banner' | 'square' | 'rectangle' | 'skyscraper';
  className?: string;
}

export function AdManager({ position, size, className = '' }: AdManagerProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Sample advertisements - In a real app, this would come from an ad server
  const advertisements: Advertisement[] = [
    {
      id: '1',
      title: 'Descubre las mejores ofertas',
      description: 'Aprovecha nuestras promociones exclusivas esta temporada',
      imageUrl: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20shopping%20banner%20with%20discount%20tags%20and%20colorful%20products&image_size=landscape_16_9',
      linkUrl: 'https://example.com/ofertas',
      advertiser: 'Tienda Online',
      size: 'rectangle',
      position: 'inline',
      ctaText: 'Ver Ofertas',
      backgroundColor: '#fef3c7',
      textColor: '#92400e'
    },
    {
      id: '2',
      title: 'Vive la experiencia digital',
      description: 'Tecnología de última generación al mejor precio',
      imageUrl: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20technology%20banner%20with%20smartphones%20and%20laptops%20professional%20style&image_size=landscape_16_9',
      linkUrl: 'https://example.com/tecnologia',
      advertiser: 'Tech Store',
      size: 'banner',
      position: 'inline',
      ctaText: 'Descubrir',
      backgroundColor: '#dbeafe',
      textColor: '#1e40af'
    },
    {
      id: '3',
      title: 'Planifica tu futuro',
      description: 'Servicios financieros personalizados para ti',
      linkUrl: 'https://example.com/finanzas',
      advertiser: 'Banco Digital',
      size: 'square',
      position: 'sidebar',
      ctaText: 'Más Info',
      backgroundColor: '#d1fae5',
      textColor: '#065f46'
    }
  ];

  // Filter ads by position and size
  const relevantAds = advertisements.filter(ad => 
    ad.position === position && ad.size === size
  );

  useEffect(() => {
    if (relevantAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % relevantAds.length);
      }, 15000); // Rotate ads every 15 seconds

      return () => clearInterval(interval);
    }
  }, [relevantAds.length]);

  if (relevantAds.length === 0) {
    // Fallback placeholder ad
    const fallbackAd: Advertisement = {
      id: 'fallback',
      title: 'Espacio Publicitario',
      description: 'Contacta con nosotros para anunciarte aquí',
      linkUrl: 'mailto:publicidad@elcomunicacion.com',
      advertiser: 'El Comunicación',
      size,
      position,
      ctaText: 'Contactar',
      backgroundColor: '#f3f4f6',
      textColor: '#6b7280'
    };

    return (
      <AdComponent 
        ad={fallbackAd} 
        className={className}
      />
    );
  }

  const currentAd = relevantAds[currentAdIndex];

  return (
    <AdComponent 
      ad={currentAd} 
      className={className}
    />
  );
}

interface AdMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  revenue: number;
}

interface AdAnalyticsProps {
  adId: string;
  metrics: AdMetrics;
}

export function AdAnalytics({ adId, metrics }: AdAnalyticsProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h4 className="font-bold text-sm mb-3">Análisis del Anuncio #{adId}</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Impresiones</div>
          <div className="font-bold">{metrics.impressions.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Clics</div>
          <div className="font-bold">{metrics.clicks.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">CTR</div>
          <div className="font-bold">{(metrics.ctr * 100).toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-gray-600">Ingresos</div>
          <div className="font-bold">€{metrics.revenue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// Ad placement configuration
export const adPlacements = {
  homepage: {
    header: { size: 'banner', position: 'header' },
    topInline: { size: 'banner', position: 'inline' },
    sidebarTop: { size: 'square', position: 'sidebar' },
    sidebarBottom: { size: 'rectangle', position: 'sidebar' },
    bottomInline: { size: 'banner', position: 'inline' }
  },
  
  section: {
    topInline: { size: 'banner', position: 'inline' },
    sidebarTop: { size: 'square', position: 'sidebar' },
    inline: { size: 'rectangle', position: 'inline' },
    sidebarBottom: { size: 'rectangle', position: 'sidebar' }
  },
  
  article: {
    header: { size: 'banner', position: 'header' },
    sidebar: { size: 'square', position: 'sidebar' },
    inline: { size: 'rectangle', position: 'inline' }
  }
};

export default AdManager;