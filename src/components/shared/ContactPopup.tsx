'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full max-w-sm bg-white dark:bg-[#0f0f13] rounded-[32px] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
              {/* Red top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#E21F26] via-[#E65F5F] to-[#2E3192]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-white/50"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-8 pt-8 pb-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E21F26]/10 text-[#E21F26] text-xs font-semibold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
                    Kayıt &amp; Bilgi
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    Bize Ulaşın
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-white/40 font-light">
                    Kayıt ve bilgi almak için aşağıdaki kanallardan bize ulaşabilirsiniz.
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  {/* Call */}
                  <a
                    href="tel:02126011500"
                    className="group flex items-center gap-4 w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-[#E21F26]/40 hover:bg-[#E21F26]/5 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E21F26]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E21F26]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#E21F26]" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-0.5">
                        Bizi Arayın
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-base">
                        0 212 601 15 00
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/905493880884"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 w-full px-6 py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/50 hover:bg-[#25D366]/15 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-0.5">
                        WhatsApp&apos;tan Yazın
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-base">
                        0 549 388 08 84
                      </div>
                    </div>
                  </a>
                </div>

                {/* Address */}
                <p className="mt-6 text-center text-xs text-slate-400 dark:text-white/25 leading-relaxed">
                  Kartaltepe Mah. Halkalı Cad. 2. Orkide Sok. No:2<br />
                  Küçükçekmece / İstanbul
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
