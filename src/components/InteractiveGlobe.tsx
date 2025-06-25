
import React, { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  capital: string;
  lat: number;
  lng: number;
  hasTestimonials: boolean;
}

interface InteractiveGlobeProps {
  onCountryClick: (countryId: string) => void;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onCountryClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);

  const countries: Country[] = [
    { id: 'argentina', name: 'Argentina', capital: 'Buenos Aires', lat: -34.6, lng: -58.4, hasTestimonials: true },
    { id: 'canada', name: 'Canadá', capital: 'Montreal', lat: 45.5, lng: -73.6, hasTestimonials: true },
    { id: 'usa', name: 'Estados Unidos', capital: 'Nueva York', lat: 40.7, lng: -74.0, hasTestimonials: true },
    { id: 'germany', name: 'Alemania', capital: 'Berlín', lat: 52.5, lng: 13.4, hasTestimonials: false },
    { id: 'japan', name: 'Japón', capital: 'Kioto', lat: 35.0, lng: 135.8, hasTestimonials: true },
    { id: 'italy', name: 'Italia', capital: 'Roma', lat: 41.9, lng: 12.5, hasTestimonials: true },
    { id: 'france', name: 'Francia', capital: 'París', lat: 48.9, lng: 2.3, hasTestimonials: false },
    { id: 'spain', name: 'España', capital: 'Madrid', lat: 40.4, lng: -3.7, hasTestimonials: false },
    { id: 'mexico', name: 'México', capital: 'Ciudad de México', lat: 19.4, lng: -99.1, hasTestimonials: true },
    { id: 'cambodia', name: 'Camboya', capital: 'Siem Reap', lat: 13.4, lng: 103.9, hasTestimonials: true },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGlobe = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw globe background
      const gradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 0, centerX, centerY, radius);
      gradient.addColorStop(0, '#4facfe');
      gradient.addColorStop(1, '#00f2fe');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add subtle border
      ctx.strokeStyle = '#0369a1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw grid lines (longitude)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 + rotation) * Math.PI / 180;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX - Math.cos(angle) * radius;
        const y2 = centerY - Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw latitude lines
      for (let i = 1; i < 6; i++) {
        const y = centerY + (i - 3) * radius / 3;
        const width = Math.sqrt(radius * radius - Math.pow((i - 3) * radius / 3, 2)) * 2;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, width / 8, 0, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw country markers
      countries.forEach(country => {
        const adjustedLng = country.lng + rotation;
        const x = centerX + (adjustedLng / 180) * radius * 0.8;
        const y = centerY - (country.lat / 90) * radius * 0.8;

        // Check if point is on visible side of globe
        const normalizedLng = ((adjustedLng % 360) + 360) % 360;
        const isVisible = normalizedLng > 90 && normalizedLng < 270;

        if (!isVisible && Math.abs(x - centerX) < radius && Math.abs(y - centerY) < radius) {
          // Draw marker
          const markerSize = 8;
          
          ctx.beginPath();
          ctx.arc(x, y, markerSize, 0, 2 * Math.PI);
          ctx.fillStyle = country.hasTestimonials ? '#ef4444' : '#f97316';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Add glow effect
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, markerSize * 2);
          glowGradient.addColorStop(0, country.hasTestimonials ? 'rgba(239, 68, 68, 0.8)' : 'rgba(249, 115, 22, 0.8)');
          glowGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, markerSize * 2, 0, 2 * Math.PI);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawGlobe();
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const animationFrame = setInterval(() => {
      if (!isDragging) {
        setRotation(prev => prev + 0.2);
      }
      drawGlobe();
    }, 50);

    return () => {
      clearInterval(animationFrame);
      resizeObserver.disconnect();
    };
  }, [rotation, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMouseX;
      setRotation(prev => prev + deltaX * 0.5);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Check if click is near any country marker
    countries.forEach(country => {
      const adjustedLng = country.lng + rotation;
      const x = centerX + (adjustedLng / 180) * radius * 0.8;
      const y = centerY - (country.lat / 90) * radius * 0.8;

      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
      if (distance < 15) {
        onCountryClick(country.id);
      }
    });
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-sky-100 to-sky-200 rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      />
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700 font-poppins">Con testimonios</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700 font-poppins">Destino disponible</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 font-poppins">Arrastra para rotar • Haz clic en los puntos</p>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
