import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtext?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  subtext = 'Growth & Digital Studio',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeMap[size]} rounded-xl overflow-hidden border border-white/15 bg-black shadow-lg shadow-black/50 flex items-center justify-center p-0.5 shrink-0 group-hover:border-primary/50 transition-all`}>
        <img
          src="/nysax-logo.png"
          alt="NYSAX Agency Logo"
          className="w-full h-full object-cover rounded-[10px]"
        />
      </div>
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              NYSAX
            </span>
            <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-widest rounded bg-primary/15 text-blue-300 border border-primary/30">
              Agency
            </span>
          </div>
          <p className="text-[10px] tracking-wider text-slate-400 uppercase -mt-0.5 font-medium">
            {subtext}
          </p>
        </div>
      )}
    </div>
  );
};
