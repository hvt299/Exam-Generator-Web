'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Palette, 
  Pin, 
  Layers, 
  Table, 
  FileText, 
  Hash, 
  Keyboard, 
  FileStack,
  Check,
  XCircle,
  HelpCircle
} from 'lucide-react';

function DocsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'rules' | 'features' | 'limitations') || 'rules';
  const [activeTab, setActiveTab] = useState<'rules' | 'features' | 'limitations'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'rules' || tabParam === 'features' || tabParam === 'limitations') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Quy chuẩn &amp; Hướng dẫn</span>
        </div>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tài liệu Đặc tả &amp; Hướng dẫn Soạn thảo
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Quy chuẩn kỹ thuật cấu trúc đề thi Word và các khuyến nghị giúp thuật toán bóc tách dữ liệu chính xác 100%.
            </p>
          </div>

          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto shrink-0"
          >
            <span>Vào Trộn đề ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 py-3 px-5 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'rules'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Quy tắc &amp; Cấu trúc Đề thi</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-2 py-3 px-5 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'features'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Tính năng Tự Động Hóa</span>
          </button>

          <button
            onClick={() => setActiveTab('limitations')}
            className={`flex items-center gap-2 py-3 px-5 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'limitations'
                ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>3. Hạn chế &amp; Cảnh báo (Red Flags)</span>
          </button>
        </div>

        {/* TAB 1: QUY TẮC & CẤU TRÚC */}
        {activeTab === 'rules' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1. Cấu trúc 3 Phần */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <FileStack className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>1. Cấu trúc 3 Phần chuẩn Bộ GD&ĐT 2025</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Đề thi mới phân chia làm 3 phần độc lập, máy quét và phần mềm phân tích dựa theo cấu trúc cú pháp nhận diện:
              </p>

              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-600 dark:text-blue-400">PHẦN I - Trắc nghiệm nhiều lựa chọn</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">4 đáp án</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Nhận diện qua từ khóa bắt đầu: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded font-bold text-slate-900 dark:text-white">Câu X.</code> hoặc <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded font-bold text-slate-900 dark:text-white">Question X:</code>. Theo sau là 4 phương án <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded font-bold text-blue-600 dark:text-blue-400">A. B. C. D.</code> (bắt buộc có dấu chấm ngay sau chữ cái).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-600 dark:text-blue-400">PHẦN II - Trắc nghiệm Đúng / Sai</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">4 ý a-b-c-d</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Mỗi câu hỏi có 4 phát biểu con đánh dấu bằng chữ thường và đóng ngoặc đơn: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded font-bold text-blue-600 dark:text-blue-400">a) b) c) d)</code> nằm phía dưới thân câu hỏi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-600 dark:text-blue-400">PHẦN III - Trả lời ngắn / Tự luận điền số</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">1 kết quả</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Thí sinh tự điền đáp số vào phiếu trả lời. Trong file Word gốc, giáo viên gõ duy nhất 1 đáp án chuẩn đi sau tiền tố <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded font-bold text-blue-600 dark:text-blue-400">A.</code> (Ví dụ: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded">A. 12,5</code>).
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Cách Đánh Dấu Đáp Án Đúng */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>2. Cách Đánh Dấu Đáp Án Đúng trong File Word</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hệ thống nhận diện đáp án đúng thông qua thuộc tính định dạng XML trong file .docx. Quý thầy cô có thể sử dụng 1 trong 2 phương án sau:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block mb-2">
                    Cách 1: Bôi màu ký tự (Font Color)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Hỗ trợ 3 gam màu chuẩn:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <li><strong>Màu Đỏ:</strong> Red, #FF0000, #C00000, #EE0000</li>
                    <li><strong>Màu Xanh lá cây:</strong> Green, #00B050, #008000</li>
                    <li><strong>Màu Xanh dương:</strong> Blue, #0000FF, #0070C0</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60">
                  <span className="font-bold text-blue-800 dark:text-blue-300 text-sm block mb-2">
                    Cách 2: Gạch chân chữ (Underline)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Bôi đen chữ cái đáp án hoặc nội dung đáp án đúng, sau đó nhấn tổ hợp phím tắt:
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <kbd className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                      Ctrl + U
                    </kbd>
                    <span className="text-xs text-slate-500">hoặc nút Underline trên Word</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Phân Nhóm & Ghim Đáp Án */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Pin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>3. Phân Nhóm &amp; Ghim Đáp Án Bằng Thẻ Nhận Diện</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Đặt thẻ <code className="font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800">&lt;gX&gt;</code> ở đầu dòng để kiểm soát thuật toán hoán vị:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <code className="font-bold text-purple-600 dark:text-purple-400">&lt;g3&gt;</code> - <strong>Trộn toàn bộ</strong>: Hoán vị cả vị trí câu hỏi lẫn vị trí các đáp án (Chế độ mặc định).
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <code className="font-bold text-purple-600 dark:text-purple-400">&lt;g2&gt;</code> - <strong>Chỉ trộn đáp án</strong>: Giữ nguyên thứ tự các câu hỏi (Thích hợp cho bài Đọc hiểu tiếng Anh hoặc bài đọc chung đề dẫn).
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <code className="font-bold text-purple-600 dark:text-purple-400">&lt;g1&gt;</code> - <strong>Chỉ trộn câu</strong>: Giữ nguyên thứ tự A, B, C, D của các phương án.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <code className="font-bold text-purple-600 dark:text-purple-400">&lt;g0&gt;</code> - <strong>Đóng băng hoàn toàn</strong>: Giữ cố định 100% không xáo trộn (Dành cho phần Nghe audio hoặc đề mục đặc biệt).
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 mt-4">
                <Hash className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                  <strong>Tính năng Ghim đáp án cố định:</strong> Thêm dấu <code className="bg-white dark:bg-slate-900 font-bold px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800 text-rose-600">#</code> ngay trước ký tự đáp án (Ví dụ: <code>#D. Cả A và B đều đúng</code>). Đáp án có dấu <code>#</code> sẽ luôn nằm ở vị trí ban đầu và không bao giờ bị đổi chỗ.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TÍNH NĂNG NỔI BẬT */}
        {activeTab === 'features' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 inline-block mb-4">
                    <Table className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Smart Layout 4-2-1
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Hệ thống tự động phân tích độ dài ký tự của từng phương án trả lời. Nếu ngắn xếp 4 đáp án trên 1 dòng, vừa phải xếp 2 đáp án trên 1 dòng, và dài xếp 1 đáp án trên 1 dòng bằng các điểm Tab Stop chính xác trong Word. Tránh xô lệch dòng và giảm đến 40% số trang in ấn.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-block mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Hỗ trợ Nhiều Đề Gốc (Round-Robin)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Bạn có thể nạp cùng lúc 2, 3 hoặc nhiều đề thi gốc Word khác nhau. Cơ chế Round-Robin thông minh sẽ tự động chia đều số lượng đề hoán vị cần xuất ra cho từng đề gốc, giúp kỳ thi bảo mật tối đa và đề thi phong phú.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 inline-block mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Ma trận Excel Tự Động
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ngay khi hoàn tất trộn, hệ thống xuất kèm bảng ma trận Excel đối chiếu đáp án từng mã đề (Mã 101, 102, 103...). Dữ liệu chuẩn xác 100%, sẵn sàng nhập vào các hệ thống chấm trắc nghiệm bằng điện thoại hoặc máy quét chuyên dụng.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 inline-block mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Tàng Hình Header
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tự động tạo khung tiêu đề 2 cột (Cột trái: Sở &amp; Trường; Cột phải: Tên kỳ thi, mã đề, số báo danh) với đường viền ẩn hoàn toàn. Đảm bảo tính thẩm mỹ, canh lề chuẩn mực theo đúng quy định của Bộ Giáo Dục.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HẠN CHẾ & CẢNH BÁO RED FLAGS */}
        {activeTab === 'limitations' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/80 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200">
                    Vùng Cảnh Báo Nghiêm Ngặt (Red Flags)
                  </h3>
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                    Tuân thủ tuyệt đối các quy tắc sau để tránh lỗi phân tích lõi XML
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
                Trình phân tích đọc trực tiếp cấu trúc cây phần tử XML của file Word (.docx) nên rất nhạy cảm với các định dạng phi chuẩn. Để đảm bảo 100% đề thi được phân tích trơn tru, vui lòng tránh các điều sau:
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">
                      Không sử dụng Bảng (Table), Textbox hoặc SmartArt cho câu hỏi và đáp án
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Các phần tử nằm trong Table hoặc Textbox độc lập sẽ bị thuật toán đọc tuần tự bỏ qua, dẫn đến việc thiếu câu hỏi hoặc thiếu đáp án.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">
                      Hình ảnh bắt buộc phải để chế độ &quot;In line with text&quot;
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Nếu để chế độ ảnh trôi nổi (Behind text, In front of text, Square...), hình ảnh sẽ bị xê dịch hoặc mất liên kết với câu hỏi tương ứng sau khi hoán vị.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">
                      Tuyệt đối không nhấn phím Enter để ngắt dòng bên trong một đáp án
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Phím Enter trong Word tạo ra thẻ đoạn văn <code>&lt;w:p&gt;</code> mới, khiến thuật toán hiểu nhầm là câu hỏi mới hoặc làm đứt đoạn đáp án. Nếu nội dung dài, hãy để Word tự động tràn dòng tự nhiên.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white mb-0.5">
                      Cẩn trọng với tính năng Đánh số tự động (Auto-Numbering)
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Khi dùng Auto-Numbering của Word, các ký tự A., B., C., D. là số đếm ảo và không tồn tại trong thẻ văn bản XML thực tế. Khuyến cáo nên gõ trực tiếp ký tự phím kèm dấu chấm để độ nhận diện đạt 100%.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM HELPFUL ACTION */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/50 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Bạn đã nắm rõ các quy chuẩn định dạng?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Hãy truy cập ngay không gian làm việc để nạp file và xuất bản bộ đề đầu tiên.
            </p>
          </div>
          <Link
            href="/generator"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all shrink-0"
          >
            <span>Bắt đầu trộn đề</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    }>
      <DocsContent />
    </Suspense>
  );
}
