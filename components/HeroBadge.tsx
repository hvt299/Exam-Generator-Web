'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative mb-7 inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-blue-200/80 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-blue-300 hover:shadow-[0_12px_35px_rgba(37,99,235,0.16)] dark:border-blue-800/70 dark:bg-slate-900/80 dark:hover:border-blue-600/70 dark:hover:shadow-[0_12px_35px_rgba(37,99,235,0.18)]"
    >
      {/* Soft background ambient glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
      />

      {/* Icon with expanding pulse halo */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <motion.span
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute inset-0 rounded-full bg-blue-500/30"
        />

        <motion.span
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              '0 4px 12px rgba(37, 99, 235, 0.25)',
              '0 6px 18px rgba(37, 99, 235, 0.42)',
              '0 4px 12px rgba(37, 99, 235, 0.25)',
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white dark:from-blue-400 dark:to-indigo-500 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </motion.span>
      </div>

      {/* Text Content in 2 rows */}
      <div className="relative flex flex-col items-start pr-1 text-left">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            BỘ GIÁO DỤC &amp; ĐÀO TẠO
          </span>

          <span className="h-1 w-1 rounded-full bg-blue-400 dark:bg-blue-500" />

          <motion.span
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
          >
            Chính thức
          </motion.span>
        </div>

        <motion.span
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-xs font-black tracking-tight text-slate-800 dark:text-slate-100 sm:text-[13px]"
        >
          Chuẩn hóa Cấu trúc Đề thi Tốt nghiệp THPT 2025
        </motion.span>
      </div>

      {/* Shine sweep animation fully across the badge */}
      <motion.div
        animate={{
          left: ['-25%', '125%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-y-0 w-24 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-blue-300/25"
      />

      {/* Floating decorative dots */}
      <motion.div
        animate={{
          y: [0, -3, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.3,
        }}
        className="absolute right-2 top-1 h-1 w-1 rounded-full bg-blue-400"
      />

      <motion.div
        animate={{
          y: [0, 3, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay: 0.8,
        }}
        className="absolute bottom-1 right-8 h-1 w-1 rounded-full bg-indigo-400 dark:bg-indigo-300"
      />
    </motion.div>
  );
}
