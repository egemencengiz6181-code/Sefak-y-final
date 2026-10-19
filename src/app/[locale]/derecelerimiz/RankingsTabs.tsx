"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Ranking } from "./data"

type Tab = "yks" | "lgs"

type Props = {
  yks: Ranking[]
  lgs: Ranking[]
  labels: { yks: string; lgs: string; empty: string; close: string }
}

export default function RankingsTabs({ yks, lgs, labels }: Props) {
  const [tab, setTab] = useState<Tab>("yks")
  const [active, setActive] = useState<Ranking | null>(null)

  // /derecelerimiz#lgs gibi bağlantılar doğrudan ilgili sekmeyi açsın
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash === "yks" || hash === "lgs") setTab(hash)
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [active])

  const selectTab = (next: Tab) => {
    setTab(next)
    history.replaceState(null, "", `#${next}`)
  }

  const items = tab === "yks" ? yks : lgs

  return (
    <>
      <div className="flex justify-center mb-12">
        <div
          role="tablist"
          className="inline-flex p-1 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          {(["yks", "lgs"] as const).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => selectTab(key)}
              className={cn(
                "px-8 py-2.5 rounded-full text-sm font-bold transition-colors",
                tab === key
                  ? "bg-[#E21F26] text-white"
                  : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
              )}
            >
              {labels[key]}
              <span className="ml-2 text-xs font-semibold opacity-70">
                {(key === "yks" ? yks : lgs).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl border border-dashed border-black/10 dark:border-white/10">
          <GraduationCap className="w-10 h-10 mx-auto mb-4 text-foreground/30" />
          <p className="text-foreground/50">{labels.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <button
              key={item.image}
              onClick={() => setActive(item)}
              className="group text-left rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={item.image}
                  alt={`${item.name} – ${item.school}${item.department ? ` ${item.department}` : ''}`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={i < 3}
                />
              </div>
              <div className="px-5 py-4">
                <p className="font-black text-foreground leading-tight">{item.name}</p>
                <p className="text-sm text-foreground/50 mt-1">
                  {item.school}{item.department && ` · ${item.department}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label={labels.close}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative h-[90vh] aspect-[3/4] max-w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.image}
              alt={`${active.name} – ${active.school}${active.department ? ` ${active.department}` : ''}`}
              fill
              sizes="(min-width: 768px) 70vh, 100vw"
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
