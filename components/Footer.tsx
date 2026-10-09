import Link from 'next/link';
import { FileStack, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <FileStack className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                ExamGen <span className="text-blue-600 dark:text-blue-400">PRO</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Giải pháp tự động hóa tạo đề thi trắc nghiệm chuyên nghiệp, bám sát cấu trúc thi tốt nghiệp THPT chuẩn Bộ GD&ĐT 2025. Hỗ trợ hoán vị câu hỏi, cân đối đáp án và xuất bản tài liệu in ấn chuẩn mực.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn Bộ GD 2025
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Smart Layout 4-2-1
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <Sparkles className="w-3.5 h-3.5" /> Round-Robin Multi-Files
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Điều hướng chính
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Trang chủ giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/generator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Không gian trộn đề thi
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Quy chuẩn soạn thảo Word
                </Link>
              </li>
              <li>
                <Link href="/docs?tab=features" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tính năng tự động hóa
                </Link>
              </li>
            </ul>
          </div>

          {/* Standard & Rules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Cấu trúc & Quy chuẩn
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs?tab=rules" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cấu trúc 3 Phần đề thi mới
                </Link>
              </li>
              <li>
                <Link href="/docs?tab=rules" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Quy ước tô màu & Gạch chân
                </Link>
              </li>
              <li>
                <Link href="/docs?tab=rules" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Thẻ phân nhóm & Ghim câu hỏi
                </Link>
              </li>
              <li>
                <Link href="/docs?tab=limitations" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cảnh báo Red Flags cần tránh
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ExamGen PRO. Hệ thống tạo lập và xáo trộn đề thi trắc nghiệm.</p>
        </div>
      </div>
    </footer>
  );
}
