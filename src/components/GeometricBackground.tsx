import React from 'react';

export const GeometricBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle radial ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/[0.04] blur-[140px] rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-amber-600/[0.025] blur-[130px] rounded-full" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[450px] bg-sky-500/[0.03] blur-[150px] rounded-full" />

      {/* SVG Geometric Triangles & Polygons (Engineering Geometry inspired by adityacprtm.dev) */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="poly-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="poly-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="poly-grad-3" x1="0%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Top-left to Center Cluster */}
        <polygon points="120,60 380,180 200,340" fill="url(#poly-grad-1)" />
        <polygon points="380,180 540,110 460,320" fill="url(#poly-grad-3)" />
        <polygon points="200,340 380,180 460,320" fill="url(#poly-grad-1)" opacity="0.6" />
        <polygon points="540,110 720,200 620,380" fill="url(#poly-grad-2)" />
        <polygon points="460,320 620,380 510,510" fill="url(#poly-grad-3)" />
        <polygon points="200,340 460,320 310,490" fill="url(#poly-grad-1)" opacity="0.5" />
        <polygon points="310,490 510,510 420,670" fill="url(#poly-grad-2)" opacity="0.7" />

        {/* Top Right Floating Elements */}
        <polygon points="1200,80 1420,220 1310,360" fill="url(#poly-grad-1)" opacity="0.5" />
        <polygon points="1420,220 1560,170 1490,390" fill="url(#poly-grad-3)" opacity="0.4" />
        <polygon points="1310,360 1490,390 1380,540" fill="url(#poly-grad-2)" opacity="0.5" />

        {/* Bottom Left Accent */}
        <polygon points="80,720 280,840 160,990" fill="url(#poly-grad-3)" opacity="0.5" />
        <polygon points="280,840 440,780 370,960" fill="url(#poly-grad-1)" opacity="0.4" />

        {/* Subtle Node Intersection Grid Lines */}
        <line x1="380" y1="180" x2="540" y2="110" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <line x1="460" y1="320" x2="620" y2="380" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <line x1="200" y1="340" x2="310" y2="490" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="380" cy="180" r="3" fill="#60a5fa" opacity="0.8" />
        <circle cx="460" cy="320" r="3" fill="#38bdf8" opacity="0.8" />
        <circle cx="540" cy="110" r="2.5" fill="#f59e0b" opacity="0.7" />
        <circle cx="620" cy="380" r="3" fill="#60a5fa" opacity="0.8" />
        <circle cx="510" cy="510" r="2.5" fill="#38bdf8" opacity="0.8" />
      </svg>
    </div>
  );
};
