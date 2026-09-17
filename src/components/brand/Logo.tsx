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
      <div className={`${sizeMap[size]} rounded-none overflow-hidden border ${isDark ? 'border-neutral-800 bg-black' : 'border-black bg-black'} flex items-center justify-center p-0.5 shrink-0`}>
        <img
          src="/nysax-logo.png"
          alt="Nysa Agency Logo"
          className="w-full h-full object-cover rounded-none"
        />
      </div>
      {showText && (
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-medium text-lg tracking-widest uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              NYSA AGENCY
            </span>
          </div>
          <p className={`text-[9px] tracking-widest uppercase font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {subtext}
          </p>
        </div>
      )}
    </div>
  );
};
