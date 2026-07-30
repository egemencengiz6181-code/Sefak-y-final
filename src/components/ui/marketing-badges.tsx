'use client';

import React, { useState } from 'react';
import { useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { 
  BookOpen, GraduationCap, Trophy, Users 
} from 'lucide-react';

interface BadgeProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  rotation: number;
  x: number;
  y: number;
  color: string;
  zIndex?: number;
}

const badges: BadgeProps[] = [
  { 
    id: '5-sinif', 
    label: '5. Sınıf', 
    icon: <BookOpen className="w-4 h-4" />,
    rotation: -12,
    x: -280,
    y: -80,
    color: "from-[#E21F26] to-[#BE1821]"
  },
  { 
    id: '6-sinif', 
    label: '6. Sınıf', 
    icon: <BookOpen className="w-4 h-4" />,
    rotation: 8,
    x: -120,
    y: -140,
    color: "from-[#2E3192] to-[#242672]"
  },
  { 
    id: '7-sinif', 
    label: '7. Sınıf', 
    icon: <GraduationCap className="w-4 h-4" />,
    rotation: -5,
    x: 150,
    y: -120,
    color: "from-[#E21F26] to-[#2E3192]"
  },
  { 
    id: '8-sinif', 
    label: '8. Sınıf & LGS', 
    icon: <Trophy className="w-4 h-4" />,
    rotation: 10,
    x: 260,
    y: -30,
    color: "from-zinc-800 to-zinc-900"
  },
  { 
    id: '8-sinif-vip', 
    label: '8. Sınıf VIP', 
    icon: <GraduationCap className="w-4 h-4" />,
    rotation: 6,
    x: -220,
    y: 60,
    color: "from-[#2E3192] to-[#E21F26]"
  },
  { 
    id: 'ozel-ders', 
    label: 'Özel Ders', 
    icon: <Users className="w-4 h-4" />,
    rotation: -8,
    x: 180,
    y: 90,
    color: "from-[#E21F26] to-[#BE1821]"
  },
  { 
    id: 'rehberlik', 
    label: 'Rehberlik', 
    icon: <Users className="w-4 h-4" />,
    rotation: 0,
    x: -40,
    y: -20,
    zIndex: 50,
    color: "from-[#2E3192] to-[#242672]"
  }
];

export default function MarketingBadges() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (id === 'rehberlik') {
      router.push('/rehberlik' as any);
    } else {
      router.push(`/services/${id}`);
    }
  };

  return (
    <>
      {/* ── MOBİL: overflow olmayan flex grid ── */}
      <div className="md:hidden w-full px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {badges.map((badge, index) => (
            <button
              key={badge.id}
              onClick={() => handleClick(badge.id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={cn(
                "badge-pop flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 shadow-lg cursor-pointer active:scale-95 transition-transform",
                "bg-gradient-to-br font-bold text-white text-sm",
                badge.color
              )}
            >
              <span className="text-white/70">{badge.icon}</span>
              <span className="tracking-tight text-white/90 whitespace-nowrap">{badge.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: yüzen scattered layout ── */}
      <div className="hidden md:flex relative h-[500px] w-full items-center justify-center overflow-visible">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-primary/5  rounded-full pointer-events-none" />

        {badges.map((badge, index) => {
          const isHovered = hoveredId === badge.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== badge.id;

          return (
            <button
              key={badge.id}
              onClick={() => handleClick(badge.id)}
              onMouseEnter={() => setHoveredId(badge.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                // Composited transform only — no filter/blur, which forced a
                // GPU re-rasterise of every sibling badge on each hover.
                transform: `translate3d(${badge.x}px, ${badge.y}px, 0) rotate(${
                  isHovered ? 0 : badge.rotation
                }deg) scale(${isHovered ? 1.2 : isOtherHovered ? 0.8 : 1})`,
                opacity: isOtherHovered ? 0.25 : 1,
                zIndex: isHovered ? 999 : badge.zIndex || 10,
                transitionDelay: `${index * 40}ms`,
              }}
              className={cn(
                "badge-float absolute flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 shadow-2xl group cursor-pointer active:scale-95",
                "bg-gradient-to-br font-bold text-white",
                badge.color
              )}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="text-white/60 group-hover:text-white transition-colors">{badge.icon}</span>
              <span className="text-base tracking-tight text-white/90 group-hover:text-white whitespace-nowrap">{badge.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
