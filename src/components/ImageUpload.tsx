import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  onClose: () => void;
}

interface ValidationError {
  type: 'size' | 'format' | 'dimensions';
  message: string;
}

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB (increased from 10MB)
const OPTIMAL_WIDTH = 1200;
const OPTIMAL_HEIGHT = 630;
const MIN_WIDTH = 200; // Further reduced from 400px
const MIN_HEIGHT = 100; // Further reduced from 200px
const ALLOWED_FORMATS = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp',
  'image/jpg', 'image/svg+xml', 'image/tiff', 'image/x-icon'
];

export function ImageUpload({ onImageUpload, onClose }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = async (file: File): Promise<boolean> => {
    setError(null);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError({
        type: 'size',
        message: `El archivo excede el tamaño máximo de 15MB (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
      });
      return false;
    }

    // Validate file format
    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError({
        type: 'format',
        message: 'Formato no válido. Solo se permiten imágenes.'
      });
      return false;
    }

    // Validate dimensions
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
          setError({
            type: 'dimensions',
            message: `La imagen es demasiado pequeña (${img.width}x${img.height}px). Mínimo: ${MIN_WIDTH}x${MIN_HEIGHT}px`
          });
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        setError({
          type: 'format',
          message: 'Error al leer la imagen'
        });
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = async (file: File) => {
    const isValid = await validateFile(file);
    if (isValid) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const optimizeImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      // For very large images, resize to reasonable dimensions
      const img = new Image();
      img.onload = () => {
        // Only optimize if image is very large
        if (img.width > 2000 || img.height > 2000) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          let { width, height } = img;
          const maxSize = 1920; // Max dimension
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            resolve(blob!);
          }, file.type, 0.9);
        } else {
          // Return original file if not too large
          resolve(file);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Optimize image
      const optimizedBlob = await optimizeImage(file);
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', optimizedBlob, file.name);
      formData.append('folder', 'articles');

      // Upload to backend
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      
      setTimeout(() => {
        onImageUpload(data.url);
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      setError({
        type: 'format',
        message: 'Error al subir la imagen. Por favor, intenta de nuevo.'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Subir Imagen
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!preview && !isUploading && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Arrastra y suelta tu imagen aquí</h3>
              <p className="text-gray-600 mb-4">o</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
              >
                Seleccionar archivo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.tiff,.ico"
                onChange={handleFileInput}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-4">
                Formatos: JPEG, PNG, WebP, GIF, BMP, SVG, TIFF • Máx: 15MB • Mín: 200x100px • Óptimo: 1200x630px
              </p>
            </div>
          )}

          {preview && !isUploading && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleUpload}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirmar y Subir
                </button>
                <button
                  onClick={resetUpload}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cambiar Imagen
                </button>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 mb-2">Subiendo y optimizando imagen...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{uploadProgress}% completado</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}