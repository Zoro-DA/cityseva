import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBackground = () => {
  const backgroundElements = [
    { id: 1, icon: "Building2", position: "top-10 left-10", size: 24, opacity: 0.1 },
    { id: 2, icon: "MapPin", position: "top-20 right-20", size: 20, opacity: 0.08 },
    { id: 3, icon: "Shield", position: "bottom-20 left-20", size: 28, opacity: 0.12 },
    { id: 4, icon: "Users", position: "bottom-10 right-10", size: 22, opacity: 0.09 },
    { id: 5, icon: "FileText", position: "top-1/3 left-1/4", size: 18, opacity: 0.07 },
    { id: 6, icon: "CheckCircle", position: "bottom-1/3 right-1/4", size: 26, opacity: 0.1 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      {/* Geometric Patterns */}
      <div className="absolute inset-0">
        {/* Large Circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full transform translate-x-1/2 -translate-y-1/2" />
        
        {/* Medium Circle */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/4 rounded-full transform -translate-x-1/2 translate-y-1/2" />
        
        {/* Small Circles */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-secondary/3 rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-success/3 rounded-full" />
      </div>
      {/* Floating Icons */}
      <div className="absolute inset-0">
        {backgroundElements?.map((element) => (
          <div
            key={element?.id}
            className={`absolute ${element?.position} animate-pulse`}
            style={{ 
              opacity: element?.opacity,
              animationDelay: `${element?.id * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            <Icon 
              name={element?.icon} 
              size={element?.size} 
              color="var(--color-primary)" 
            />
          </div>
        ))}
      </div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />
    </div>
  );
};

export default LoginBackground;