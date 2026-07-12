'use client';

import Image from 'next/image';

const logoNumbers = Array.from({ length: 34 }, (_, i) => i + 1);

export default function LogoMarquee() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* CSS marquee — no JS, GPU-accelerated */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex flex-none items-center"
          style={{ animation: `marquee-left ${logoNumbers.length * 2}s linear infinite` }}
        >
          {[...logoNumbers, ...logoNumbers].map((num, index) => (
            <div
              key={index}
              className="flex-none mx-12 w-32 h-20 relative grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={`/logos/${num}.png`}
                alt={`Partner ${num}`}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
