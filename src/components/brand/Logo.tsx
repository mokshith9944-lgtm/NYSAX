import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtext?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  subtext = 'Digital Studio & Growth Agency',
  variant = 'light',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeMap[size]} rounded-xl overflow-hidden border ${isDark ? 'border-white/20 bg-neutral-900 shadow-md' : 'border-black/10 bg-black shadow-sm'} flex items-center justify-center p-0.5 shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <img
          src="/nysax-logo.png"
          alt="NYSAX Agency Logo"
          className="w-full h-full object-cover rounded-[10px]"
        />
      </div>
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold text-xl tracking-tight ${isDark ? 'text-white' : 'text-black'} group-hover:opacity-80 transition-opacity`}>
              NYSAX
            </span>
            <span className={`px-1.5 py-0.5 text-[9px] uppercase font-mono font-medium tracking-wider rounded ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black text-white border border-black'}`}>
              STUDIO
            </span>
          </div>
          <p className={`text-[10px] tracking-wider uppercase -mt-0.5 font-mono ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
            {subtext}
          </p>
        </div>
      )}
    </div>
  );
};
