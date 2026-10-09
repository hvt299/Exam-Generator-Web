import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  FileStack, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Table, 
  Cpu, 
  FileText, 
  AlertTriangle,
  FileCheck2,
  LayoutGrid,
  Zap
} from 'lucide-react';
import { HeroBadge } from '@/components/HeroBadge';

export default function HomePage() {
  const features = [
    {
      icon: LayoutGrid,
      title: 'Smart Layout 4-2-1',
      description: 'Thuật toán tự động đo độ dài đáp án và dàn trang bằng thẻ Tab chuẩn Word. Sắp xếp 4, 2 hoặc 1 đáp án/dòng thẳng hàng, tiết kiệm tối đa giấy in.',
      badge: 'Tiết kiệm 40% giấy',
    },
    {
      icon: Layers,
      title: 'Hỗ trợ Nhiều Đề Gốc (Round-Robin)',
      description: 'Cho phép nạp đồng thời nhiều đề gốc. Thuật toán Round-Robin tự động chia đều số lượng đề con cần trộn cho từng nguồn đề, tránh trùng lặp câu hỏi.',
      badge: 'Đa nguồn đề',
    },
    {
      icon: Table,
      title: 'Ma trận Excel Tự Động',
      description: 'Tự động xuất bảng Excel đối chiếu các mã đề trực quan, tương thích tuyệt đối với máy quét trắc nghiệm và các phần mềm chấm thi phổ biến.',
      badge: 'Xuất file .xlsx',
    },
    {
      icon: FileText,
      title: 'Tiêu Đề Tàng Hình Chuẩn Bộ',
      description: 'Tự động chèn bảng Header 2 cột theo đúng chuẩn Sở & Trường, viền vô hình, căn lề chuẩn xác, không làm xô lệch bất kỳ dòng văn bản nào.',
      badge: 'Chuẩn Bộ GD&ĐT',
    },
    {
      icon: ShieldCheck,
      title: 'Cấu trúc 3 Phần Mới 2025',
      description: 'Nhận diện hoàn hảo Phần I (Trắc nghiệm 4 lựa chọn), Phần II (Đúng/Sai 4 ý a-b-c-d) và Phần III (Trả lời ngắn).',
      badge: 'Đề thi 2025',
    },
    {
      icon: Zap,
      title: 'Bắt Lỗi Định Dạng Thông Minh',
      description: 'Phân tích lõi XML sâu, phát hiện câu thiếu đáp án, lỗi chưa bôi đáp án đúng hoặc ngắt dòng sai quy cách trước khi trộn.',
      badge: 'An toàn dữ liệu',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Nạp File Đề Word (.docx)',
      desc: 'Kéo thả một hoặc nhiều file đề thi Word gốc. Giữ nguyên định dạng công thức Toán, Lý, Hóa và hình vẽ minh họa.',
    },
    {
      step: '02',
      title: 'Cấu hình & Xem trước Ma trận',
      desc: 'Tùy chỉnh số lượng mã đề, mã bắt đầu, tiêu đề kỳ thi và kiểm tra trước bảng hoán vị đáp án trực tiếp trên trình duyệt.',
    },
    {
      step: '03',
      title: 'Tải Về Trọn Bộ Đề (ZIP)',
      desc: 'Nhận ngay gói file nén chứa các đề thi Word đã dàn trang hoàn chỉnh cùng file ma trận Excel đối chiếu đáp án.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <HeroBadge />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
            Hệ thống Trộn Đề Thi Thông Minh &amp; Tối Ưu Dàn Trang Tự Động
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Phân tích đề gốc Word (.docx), hoán vị khoa học câu hỏi &amp; đáp án, tự động căn tab Smart Layout 4-2-1 thẳng hàng và xuất ma trận đối chiếu Excel chỉ trong vài giây.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
            <Link
              href="/generator"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <FileStack className="w-5 h-5" />
              <span>Bắt đầu Trộn đề ngay</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/docs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-base transition-all shadow-xs hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Quy chuẩn &amp; Hướng dẫn</span>
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <span className="block text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">100%</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Giữ nguyên công thức Toán &amp; Hình ảnh</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400 mb-1">4-2-1</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Smart Layout tiết kiệm giấy in tối đa</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">3 Phần</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Trắc nghiệm, Đúng/Sai, Điền đáp án</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <span className="block text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">Tức thì</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kiểm tra ma trận &amp; Đóng gói ZIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW 3 STEPS */}
      <section className="py-16 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Quy trình làm việc tinh gọn
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tạo đề thi chuẩn chỉ trong 3 bước
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => (
              <div 
                key={idx} 
                className="relative p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col hover:-translate-y-1 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 group-hover:rotate-6 transition-transform">
                    {idx === 0 && <FileStack className="w-5 h-5" />}
                    {idx === 1 && <Cpu className="w-5 h-5" />}
                    {idx === 2 && <FileCheck2 className="w-5 h-5" />}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Công nghệ tiên tiến
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Đáp ứng mọi yêu cầu khắt khe của bài thi chuẩn hóa
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Được thiết kế tỉ mỉ để phục vụ nhu cầu khảo thí, kiểm tra định kỳ của các trường THCS, THPT và Trung tâm Giáo dục.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK RULES & RED FLAGS SUMMARY SECTION */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Quy tắc nhanh */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700/60 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quy ước Đánh dấu Đáp án Đúng</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Hệ thống hỗ trợ tự động bóc tách đáp án đúng thông qua 2 cách linh hoạt trên file Word gốc:
                </p>
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-sm">
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold block mb-1">Cách 1: Bôi màu ký tự đáp án</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">
                      Hỗ trợ các tone màu: Đỏ (Red), Xanh lá cây (Green) hoặc Xanh dương (Blue).
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-sm">
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold block mb-1">Cách 2: Gạch chân ký tự đáp án</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">
                      Bôi đen văn bản đáp án đúng và nhấn tổ hợp phím Ctrl + U (Underline).
                    </span>
                  </div>
                </div>
              </div>
              <Link 
                href="/docs?tab=rules"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span>Xem tài liệu cấu trúc chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cảnh báo Red Flags */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 shadow-xs flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-700/60 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lưu ý Định dạng Tránh lỗi (Red Flags)</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Trình phân tích XML yêu cầu tuân thủ quy cách chuẩn để dữ liệu không bị sai lệch:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                    <span>Không đặt câu hỏi hoặc đáp án bên trong <strong>Bảng (Table)</strong> hoặc <strong>Textbox</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                    <span>Hình ảnh phải định dạng chế độ <strong>In line with text</strong> (Cùng dòng với văn bản).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                    <span><strong>Không dùng phím Enter</strong> để ngắt dòng bên trong một phương án đáp án.</span>
                  </li>
                </ul>
              </div>
              <Link 
                href="/docs?tab=limitations"
                className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
              >
                <span>Xem danh sách đầy đủ các Red Flags</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BOTTOM BANNER - MÀU NHẸ NHÀNG, DỊU MẮT */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-blue-200/60 dark:border-slate-800 shadow-md text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sẵn sàng tạo bộ đề thi trắc nghiệm chuẩn mực?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Tải lên đề gốc của bạn và kiểm tra kết quả trộn đề hoàn toàn miễn phí ngay trên trình duyệt.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/generator"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Vào không gian Trộn đề
                </Link>
                <Link
                  href="/docs"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-base transition-all shadow-xs hover:-translate-y-0.5"
                >
                  Đọc hướng dẫn chuẩn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
