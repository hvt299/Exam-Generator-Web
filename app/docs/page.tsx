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
  HelpCircle,
  Image as ImageIcon,
  ListOrdered,
  Scissors
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
              Tài liệu Đặc tả &amp; Hướng dẫn Soạn thảo Đề thi 2025
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Quy chuẩn cấu trúc đề kiểm tra Bộ GD&amp;ĐT 2025, hướng dẫn phân nhóm hoán vị và cách khắc phục 8 lỗi thường gặp.
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
            <span>1. Quy trình Soạn thảo (3 Bước)</span>
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
            <span>3. Khắc phục 8 Lỗi Thường Gặp</span>
          </button>
        </div>

        {/* TAB 1: QUY TẮC & CẤU TRÚC */}
        {activeTab === 'rules' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* BƯỚC 1: CHUẨN BỊ NỘI DUNG */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Bước 1. Chuẩn bị nội dung đề thi gốc</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hãy <strong>xóa phần đầu</strong> (tiêu đề Sở, Trường, Kỳ thi, khung thông tin thí sinh) và <strong>phần cuối</strong> (chữ ký giáo viên, ghi chú), bạn chỉ để lại nội dung đề thi bắt đầu từ câu hỏi đầu tiên. Hệ thống sẽ tự động khởi tạo lại khung tiêu đề trường và chân trang chuẩn quy cách.
              </p>
            </div>

            {/* BƯỚC 2: SOẠN CẤU TRÚC 4 PHẦN */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <FileStack className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Bước 2. Soạn nội dung đề thi gốc theo cấu trúc Bộ GD&amp;ĐT 2025</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Đề kiểm tra chuẩn 2025 phân định rõ ràng các phần. Hệ thống đảm bảo <strong>các phần luôn theo trình tự từ I &rarr; II &rarr; III &rarr; IV</strong> và không bao giờ xáo trộn câu hỏi giữa các phần với nhau:
              </p>

              <div className="space-y-4 text-sm">
                {/* Phần I */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-base">PHẦN I. Trắc nghiệm 4 lựa chọn (A, B, C, D)</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded">Chọn 1 đáp án đúng</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li>Câu hỏi bắt đầu bằng: <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1.</code>, <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 2:</code> hoặc <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Question 1.</code></li>
                    <li>Phải <strong>xuống dòng (Enter)</strong> trước khi gõ các đáp án và trước khi bắt đầu câu tiếp theo.</li>
                    <li>Các đáp án bắt đầu bằng: <code className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-1 rounded">A.</code>, <code className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-1 rounded">B.</code>, <code className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-1 rounded">C.</code>, <code className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-1 rounded">D.</code></li>
                    <li>Nếu cần cố định phương án nào, đặt thêm dấu <code className="font-bold text-rose-600 bg-white dark:bg-slate-900 px-1 rounded">#</code> liền trước (Ví dụ: <code className="text-rose-600 font-bold">#D. Cả A và B đều đúng</code>).</li>
                    <li>Đáp án đúng: chỉ cần <strong>gạch chân ký tự</strong> (nhấn <code>Ctrl + U</code>) hoặc <strong>tô màu Đỏ/Xanh</strong> ký tự A., B., C., D.</li>
                  </ul>
                </div>

                {/* Phần II */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">PHẦN II. Trắc nghiệm Đúng / Sai</span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">4 ý a-b-c-d</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li>Câu hỏi bắt đầu bằng: <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1.</code>, <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Question 1.</code></li>
                    <li>Phải xuống dòng (Enter) trước khi gõ các ý con.</li>
                    <li>Các ý bắt buộc bắt đầu bằng chữ thường kèm dấu ngoặc đơn: <code className="font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1 rounded">a)</code>, <code className="font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1 rounded">b)</code>, <code className="font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1 rounded">c)</code>, <code className="font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1 rounded">d)</code>. Ghim cố định bằng <code className="font-bold text-rose-600">#a)</code>.</li>
                    <li>Ý nào của câu hỏi là <strong>Đúng</strong> chỉ cần <strong>gạch chân ký tự</strong> (ví dụ: <u>a)</u>) hoặc tô màu đỏ. Ý không gạch chân mặc định là <strong>Sai</strong>.</li>
                  </ul>
                </div>

                {/* Phần III */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-purple-600 dark:text-purple-400 text-base">PHẦN III. Trả lời ngắn (Tự luận điền số)</span>
                    <span className="text-[10px] bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold px-2 py-0.5 rounded">Số ≤ 4 ký tự</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li>Câu hỏi bắt đầu bằng: <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1.</code>, <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Question 1.</code></li>
                    <li>Phải xuống dòng (Enter) trước khi gõ đáp án.</li>
                    <li>Nội dung trả lời ngắn được đặt sau ký tự <code className="font-bold text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-900 px-1 rounded">A.</code> (Ví dụ: <code className="font-bold text-purple-600">A. 12</code> hoặc <code className="font-bold text-purple-600">A. 12,5</code> hoặc <code className="font-bold text-purple-600">A. -1,5</code>).</li>
                    <li><strong className="text-amber-600 dark:text-amber-400">Lưu ý quan trọng:</strong> Nội dung trả lời ngắn bắt buộc là <strong>số với chiều dài không quá 4 ký tự</strong> (theo quy định chung của Bộ GD&amp;ĐT).</li>
                    <li>Hệ thống sẽ tự động trích xuất kết quả vào bảng Excel ma trận và <strong>tự động ẩn phương án A. trong đề thi của học sinh</strong>.</li>
                  </ul>
                </div>

                {/* Phần IV */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400 text-base">PHẦN IV. Tự luận</span>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded">Trình bày bài giải</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li>Câu hỏi bắt đầu bằng: <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1.</code>, <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1:</code>, <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Bài 1.</code>, hoặc có thang điểm như <code className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-1 rounded">Câu 1 (2,0 điểm):</code>.</li>
                    <li>Phải xuống dòng (Enter) trước khi gõ các ý con và trước khi bắt đầu câu tiếp theo.</li>
                    <li>Nếu câu hỏi có nhiều ý, các ý con có thể đánh số thứ tự dạng: <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">1.</code>, <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">2.</code> (hoặc <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">1)</code>, <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">2)</code>) hoặc chữ cái <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">a.</code>, <code className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-1 rounded">b.</code>. Hệ thống tự động nhận diện bóc tách thành từng câu và ý con riêng biệt.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BƯỚC 3: PHÂN NHÓM & XÁC ĐỊNH PHẦN */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Pin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Bước 3. Đặt ký tự phân nhóm &amp; xác định phần (&lt;gX#P&gt;)</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Áp dụng cho các nhóm câu hỏi chùm, bài đọc hiểu tiếng Anh, hoặc chùm câu hỏi phân loại môn GD KT-PL, Tin học. Đặt thẻ ở đầu dòng trước nhóm câu hỏi:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-blue-600 dark:text-blue-400">PHẦN I - Trắc nghiệm ABCD:</div>
                  <div><code className="font-bold text-purple-600">&lt;g0#1&gt;</code>: Không trộn (bài nghe Audio).</div>
                  <div><code className="font-bold text-purple-600">&lt;g1#1&gt;</code>: Chỉ hoán vị câu hỏi trong nhóm.</div>
                  <div><code className="font-bold text-purple-600">&lt;g2#1&gt;</code>: Chỉ hoán vị đáp án (bài đọc hiểu chung).</div>
                  <div><code className="font-bold text-purple-600">&lt;g3#1&gt;</code>: Hoán vị cả câu hỏi và đáp án.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">PHẦN II - Trắc nghiệm Đúng / Sai:</div>
                  <div><code className="font-bold text-purple-600">&lt;g0#2&gt;</code>: Không trộn câu và không trộn ý.</div>
                  <div><code className="font-bold text-purple-600">&lt;g1#2&gt;</code>: Chỉ hoán vị các câu hỏi.</div>
                  <div><code className="font-bold text-purple-600">&lt;g2#2&gt;</code>: Chỉ hoán vị các ý a-b-c-d.</div>
                  <div><code className="font-bold text-purple-600">&lt;g3#2&gt;</code>: Hoán vị cả câu hỏi và các ý a-b-c-d.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-purple-600 dark:text-purple-400">PHẦN III - Trả lời ngắn:</div>
                  <div><code className="font-bold text-purple-600">&lt;g0#3&gt;</code>: Giữ nguyên thứ tự câu hỏi.</div>
                  <div><code className="font-bold text-purple-600">&lt;g1#3&gt;</code>: Hoán vị các câu hỏi trong nhóm.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-amber-600 dark:text-amber-400">PHẦN IV - Tự luận:</div>
                  <div><code className="font-bold text-purple-600">&lt;g0#4&gt;</code>: Giữ nguyên thứ tự các câu tự luận.</div>
                  <div><code className="font-bold text-purple-600">&lt;g1#4&gt;</code>: Hoán vị thứ tự các câu tự luận.</div>
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
                    Bảo toàn Trình tự Phần I &rarr; IV &amp; Chùm câu hỏi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Đảm bảo tuyệt đối các câu hỏi được phân bổ chặt chẽ theo trình tự từ Phần I đến Phần IV. Các nhóm câu hỏi chùm (bài đọc hiểu) được bảo toàn toàn bộ đoạn văn đề dẫn (Passage) và không bị gộp lẫn vào nhau.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 inline-block mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Ma trận Excel Tự Động &amp; Đúng / Sai
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Xuất file Excel đối chiếu đáp án từng mã đề: Phần I ra ký tự A-B-C-D, Phần II ra chuỗi Đúng/Sai (ĐSĐS), Phần III ra số đáp án, Phần IV ra ký hiệu TL. Tương thích trực tiếp với máy quét và phần mềm chấm thi.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 inline-block mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Tự Động Ẩn Đáp Án Phần III
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Trong file Word đề thi của học sinh, hệ thống tự động ẩn phương án trả lời ngắn của giáo viên để tránh lộ đáp án, chỉ giữ lại thân câu hỏi chuẩn mực cho học sinh làm bài.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 8 LỖI THƯỜNG GẶP & CÁCH KHẮC PHỤC */}
        {activeTab === 'limitations' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/80 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200">
                    Cẩm nang Khắc phục 8 Lỗi Thường Gặp
                  </h3>
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                    Hướng dẫn chi tiết nguyên nhân và cách sửa 8 lỗi định dạng phổ biến nhất
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {/* Lỗi 1 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 1</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Câu hỏi hoặc đáp án để trong Bảng (Table)</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Để các đáp án canh thẳng hàng, giáo viên hay soạn đáp án nằm trong bảng (Table). Việc này khiến hệ thống không thể đọc tuần tự câu hỏi. Việc canh hàng thẳng đẹp sẽ do thuật toán Smart Layout tự động xử lý.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Hãy copy toàn bộ câu hỏi và đáp án ra ngoài Bảng, gõ như văn bản thông thường.
                  </p>
                </div>

                {/* Lỗi 2 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 2</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Gõ sai, thiếu từ khóa bắt đầu của câu hỏi</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Chèn thêm ký tự nhận thức như <code>Câu 1 (NB):</code> hoặc thiếu dấu chấm/hai chấm như <code>Câu 2 Hãy tính...</code> khiến hệ thống không nhận dạng được câu hỏi.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Xóa cụm ký tự (NB), (TH) nếu có và gõ thêm dấu chấm (.) hoặc hai chấm (:) liền sau số câu (ví dụ: <code>Câu 1.</code> hoặc <code>Câu 2:</code>).
                  </p>
                </div>

                {/* Lỗi 3 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 3</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Gõ sai, thiếu từ khóa bắt đầu của các đáp án</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Thiếu dấu chấm sau chữ cái đáp án (ví dụ: <code>B Hà Nội</code>) hoặc có khoảng cách thừa trước dấu chấm (ví dụ: <code>D . Đà Nẵng</code>).
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Gõ thêm dấu chấm (.) liền sau ký tự B và xóa khoảng cách giữa ký tự D và dấu chấm (ví dụ: <code>B.</code>, <code>D.</code>).
                  </p>
                </div>

                {/* Lỗi 4 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 4</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Không xuống dòng giữa câu hỏi và đáp án</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Gõ đáp án A. dính liền trên cùng dòng với câu hỏi (ví dụ: <code>Câu 1. Thủ đô là gì? A. Hà Nội</code>).
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Đặt con trỏ chuột trước chữ cái A. và nhấn phím ENTER để ngắt đáp án xuống dòng riêng.
                  </p>
                </div>

                {/* Lỗi 5 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 5</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Không xuống dòng giữa đáp án câu trên và câu hỏi tiếp theo (Dính câu)</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Nhìn trong Word tưởng như đã xuống dòng (do Word tự tràn dòng) nhưng thực chất chưa có dấu ngắt đoạn Enter. Khi đưa lên trộn sẽ bị lỗi dính câu.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Bật biểu tượng Show/Hide Paragraph Mark (&para;) trong Word, đưa con trỏ về cuối đáp án D và nhấn ENTER xuống dòng.
                  </p>
                </div>

                {/* Lỗi 6 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 6</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Sử dụng tính năng Numbering tự động của MS Word</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Các đáp án A., B., C., D. hoặc Câu 1, Câu 2 được đánh số tự động qua tính năng Numbering của Word. Ký tự này là đếm ảo, không tồn tại trong văn bản XML thực tế.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Bôi đen toàn bộ đề thi, tắt tính năng Numbering (chọn None) và gõ tay lại như ký tự thông thường.
                  </p>
                </div>

                {/* Lỗi 7 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 7</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Nhận nhầm từ khóa đáp án từ đơn vị, đại lượng, tên riêng</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Các đơn vị như Ampe (A), Culong (C), nguyên tố hóa học, hoặc tên nhân vật/địa danh đi sau có dấu chấm.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Nhấn Enter xuống dòng để mỗi đáp án nằm trên 1 dòng riêng biệt, hoặc xóa dấu chấm (.) liền sau chữ cái tên nhân vật/đơn vị đo.
                  </p>
                </div>

                {/* Lỗi 8 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">Lỗi 8</span>
                    <strong className="text-slate-900 dark:text-white text-sm">Mất hình ảnh hoặc hình nhảy lộn xộn sau khi trộn</strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Nguyên nhân:</strong> Hình ảnh đang ở chế độ trôi nổi (Behind text, In front of text, Square...). Khi hoán vị câu hỏi, hình không gắn liền với dòng văn bản nên sẽ bị xô lệch vị trí.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    &rarr; Cách sửa: Chọn hình ảnh &rarr; Format Picture &rarr; Position &rarr; Chọn "In Line with Text" để ảnh nằm trên một dòng riêng biệt gắn chặt vào câu hỏi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM HELPFUL ACTION */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/50 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Bạn đã kiểm tra đề thi theo đúng 8 quy chuẩn?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Hãy truy cập ngay công cụ trộn đề để hệ thống phân tích và kiểm tra tính hợp lệ.
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
