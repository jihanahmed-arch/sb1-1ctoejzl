import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  textColor?: string;
  iconColor?: string;
  withTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  textColor = 'text-pink-500', 
  iconColor = 'text-pink-500',
  withTagline = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        <ShoppingBag className={`${iconColor} mr-2`} size={24} />
        <span className={`${textColor} font-bold text-xl tracking-tight font-serif`}>
          Hena's Collection
        </span>
      </div>
      {withTagline && (
        <span className="text-xs text-gray-500 italic mt-1">Elegance in Every Detail</span>
      )}
    </div>
  );
};

export default Logo;