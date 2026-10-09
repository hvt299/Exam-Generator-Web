'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  UploadCloud, 
  FileText, 
  Loader2, 
  Settings2, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  AlertOctagon, 
  Download, 
  BookOpen, 
  X, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  FileCheck2, 
  SlidersHorizontal, 
  ArrowLeft, 
  ArrowRight,
  FileSpreadsheet,
  Check,
  RotateCcw
} from 'lucide-react';

export default function GeneratorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // File Upload State
  const [files, setFiles] = useState<File[]>([]);

  // Config State
  const [numExams, setNumExams] = useState(4);
  const [startCode, setStartCode] = useState(101);
  const [startQuestion, setStartQuestion] = useState(1);

  // Header & Footer State (MẶC ĐỊNH LÀ TẮT THEO YÊU CẦU)
  const [useHeader, setUseHeader] = useState(false);
  const [useFooter, setUseFooter] = useState(false);
  const [department, setDepartment] = useState('SỞ GD&ĐT...');
  const [school, setSchool] = useState('TRƯỜNG THPT...');
  const [examName, setExamName] = useState('KIỂM TRA CUỐI KÌ I');
  const [schoolYear, setSchoolYear] = useState('NĂM HỌC 2025 - 2026');
  const [subject, setSubject] = useState('Toán');
  const [duration, setDuration] = useState('90 phút');

  // Loading & Preview State
  const [loadingState, setLoadingState] = useState<'none' | 'previewing' | 'downloading'>('none');
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  // UI helpers
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [matrixPage, setMatrixPage] = useState(0);
  const rowsPerPage = 10;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Helper smooth scroll to top of form
  const scrollToFormTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilesProcess = (selectedFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    Array.from(selectedFiles).forEach(f => {
      if (f.name.endsWith('.docx')) {
        validFiles.push(f);
      } else {
        alert(`File ${f.name} bị từ chối vì không phải định dạng .docx`);
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setValidationErrors([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesProcess(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loadingState === 'none' && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesProcess(e.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, idx) => idx !== indexToRemove));
  };

  const goToStep2 = () => {
    if (files.length === 0) return;
    setStep(2);
    scrollToFormTop();
  };

  const handlePreview = async () => {
    if (files.length === 0) return;
    setLoadingState('previewing');
    setValidationErrors([]);
    setPreviewData(null);

    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('numExams', numExams.toString());
    formData.append('startCode', startCode.toString());
    formData.append('startQuestion', startQuestion.toString());

    try {
      const response = await fetch(`${apiUrl}/api/v1/exams/preview`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Có lỗi xảy ra khi kết nối máy chủ');
      const data = await response.json();
      if (!data.success) {
        setValidationErrors(data.errors || []);
        // Scroll to error card
        setTimeout(() => {
          errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        setPreviewData(data);
        setStep(3);
        scrollToFormTop();
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingState('none');
    }
  };

  const handleDownloadZip = async () => {
    if (files.length === 0) return;
    setLoadingState('downloading');

    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('numExams', numExams.toString());
    formData.append('startCode', startCode.toString());
    formData.append('startQuestion', startQuestion.toString());
    formData.append('useHeader', useHeader.toString());
    formData.append('useFooter', useFooter.toString());
    formData.append('department', department);
    formData.append('school', school);
    formData.append('examName', examName);
    formData.append('schoolYear', schoolYear);
    formData.append('subject', subject);
    formData.append('duration', duration);

    try {
      const response = await fetch(`${apiUrl}/api/v1/exams/mix-multi`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Định dạng file không chuẩn hoặc có lỗi từ máy chủ!');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'Bo_De_Thi.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingState('none');
    }
  };

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* OVERLAY LOADER */}
      {loadingState !== 'none' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
              {loadingState === 'previewing' ? 'Đang phân tích cấu trúc...' : 'Đang xuất bản file ZIP...'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm text-center">
              Vui lòng giữ kết nối và không đóng trang.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto" ref={formTopRef}>
        {/* BREADCRUMB & HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">Không gian trộn đề</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trộn Đề Thi Trắc Nghiệm
            </h1>
          </div>

          <Link
            href="/docs"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-all shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Quy chuẩn &amp; Hướng dẫn</span>
          </Link>
        </div>

        {/* STEP PROGRESS INDICATOR (3 BƯỚC RÕ RÀNG, TINH GỌN) */}
        <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setStep(1); scrollToFormTop(); }}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              step === 1
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">1. Nạp đề gốc</span>
            <span className="sm:hidden">1. Nạp file</span>
          </button>

          <button
            disabled={files.length === 0}
            onClick={() => { if (files.length > 0) { setStep(2); scrollToFormTop(); } }}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              step === 2
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : files.length > 0
                ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                : 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">2. Cấu hình</span>
            <span className="sm:hidden">2. Cấu hình</span>
          </button>

          <button
            disabled={!previewData}
            onClick={() => { if (previewData) { setStep(3); scrollToFormTop(); } }}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              step === 3
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : previewData
                ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                : 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-600'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">3. Ma trận &amp; ZIP</span>
            <span className="sm:hidden">3. Kết quả</span>
          </button>
        </div>

        {/* WORKSPACE CARD */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 transition-colors">
          
          {/* BƯỚC 1: NẠP FILE ĐỀ THI WORD */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Bước 1: Nạp file đề thi Word (.docx)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Tải lên một hoặc nhiều file đề thi gốc để thuật toán bóc tách công thức và hình ảnh.
                </p>
              </div>

              {/* DROPZONE */}
              <div
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.click();
                  }
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200 ${
                  files.length > 0
                    ? 'border-blue-400 dark:border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/60 dark:hover:bg-blue-950/30'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {files.length > 0 ? (
                  <div className="w-full max-w-lg flex flex-col items-center">
                    <div className="bg-emerald-100 dark:bg-emerald-950/80 p-3 rounded-2xl mb-3 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white text-lg mb-1">
                      Đã chọn {files.length} Đề gốc
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Bạn có thể nạp thêm file hoặc nhấn Tiếp tục sang Cấu hình
                    </span>

                    <div className="w-full max-h-56 overflow-y-auto space-y-2 mb-4 px-1 custom-scrollbar">
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-3 rounded-xl shadow-xs"
                        >
                          <div className="flex items-center truncate mr-3">
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-xs px-2 py-0.5 rounded-md mr-2.5 font-bold">
                              #{i + 1}
                            </span>
                            <span className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">
                              {f.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(i);
                            }}
                            aria-label="Xóa file này"
                            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 p-1.5 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      + Nhấn vào đây để tải thêm file khác
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-50 dark:bg-blue-950/70 p-4 rounded-2xl mb-4 text-blue-600 dark:text-blue-400">
                      <UploadCloud className="h-10 w-10" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                      Kéo thả file Word vào đây hoặc nhấn để duyệt file
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                      Chỉ chấp nhận định dạng .docx • Hỗ trợ chọn cùng lúc nhiều đề gốc
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* ACTION: NEXT TO STEP 2 */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={goToStep2}
                  disabled={files.length === 0}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl font-bold text-sm sm:text-base text-white transition-all ${
                    files.length === 0
                      ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:-translate-y-0.5 active:scale-[0.99]'
                  }`}
                >
                  <span>Tiếp tục: Cấu hình thông số</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 2: CẤU HÌNH ĐỀ THI & TIÊU ĐỀ */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Bước 2: Cấu hình Đề thi &amp; Tiêu đề</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Thiết lập số lượng mã đề con cần trộn và các thông tin trường, môn học nếu cần.
                </p>
              </div>

              {/* THÔNG SỐ HOÁN VỊ */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Thông số sinh mã đề</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Số lượng đề mã
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={numExams}
                      onChange={(e) => setNumExams(parseInt(e.target.value) || 1)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="flex gap-1.5 pt-1">
                      {[2, 4, 8, 12].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setNumExams(n)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors ${
                            numExams === n
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          {n} đề
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Mã bắt đầu
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={startCode}
                      onChange={(e) => setStartCode(parseInt(e.target.value) || 101)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 block pt-1">Ví dụ: 101, 201, 301...</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Câu bắt đầu
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={startQuestion}
                      onChange={(e) => setStartQuestion(parseInt(e.target.value) || 1)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 block pt-1">Mặc định: Câu 1</span>
                  </div>
                </div>
              </div>

              {/* TÙY CHỌN TIÊU ĐỀ HEADER & FOOTER (MẶC ĐỊNH LÀ TẮT) */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-200">
                <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={useHeader}
                      onChange={() => setUseHeader(!useHeader)}
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${useHeader ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useHeader ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="ml-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                      Bổ sung Header (Tiêu đề trường &amp; kỳ thi)
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={useFooter}
                      onChange={() => setUseFooter(!useFooter)}
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${useFooter ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useFooter ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="ml-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                      Bổ sung Footer (Dòng chữ HẾT)
                    </span>
                  </label>
                </div>

                {useHeader && (
                  <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900/80 animate-in slide-in-from-top-2 duration-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Sở / Phòng GD&amp;ĐT
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="SỞ GD&ĐT HÀ NỘI"
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Tên Trường / Đơn vị
                      </label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="TRƯỜNG THPT CHUYÊN..."
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Kì Kiểm Tra
                      </label>
                      <input
                        type="text"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        placeholder="KIỂM TRA CUỐI KÌ I"
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Năm Học
                      </label>
                      <input
                        type="text"
                        value={schoolYear}
                        onChange={(e) => setSchoolYear(e.target.value)}
                        placeholder="NĂM HỌC 2025 - 2026"
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Môn học
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Toán"
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Thời gian làm bài
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="90 phút"
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CARD BÁO LỖI NẾU CÓ */}
              {validationErrors.length > 0 && (
                <div ref={errorsRef} className="bg-rose-50/90 dark:bg-rose-950/40 p-5 sm:p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 animate-fade-in-up">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div className="flex items-center">
                      <div className="bg-rose-100 dark:bg-rose-900/60 p-2 rounded-xl mr-3 text-rose-600 dark:text-rose-400">
                        <AlertOctagon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-extrabold text-rose-800 dark:text-rose-300">
                        Phát hiện {validationErrors.length} điểm cần chỉnh sửa
                      </h3>
                    </div>

                    {validationErrors.length > 4 && (
                      <button
                        type="button"
                        onClick={() => setShowAllErrors(!showAllErrors)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-800 shadow-xs hover:bg-rose-50 dark:hover:bg-slate-700 transition-all self-start sm:self-auto"
                      >
                        <span>{showAllErrors ? 'Thu gọn bớt' : `Xem tất cả ${validationErrors.length} lỗi`}</span>
                        {showAllErrors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(showAllErrors ? validationErrors : validationErrors.slice(0, 4)).map((err: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-rose-900/50 shadow-xs overflow-hidden flex flex-col"
                      >
                        <div className="px-4 py-2.5 bg-rose-50/60 dark:bg-rose-950/50 border-b border-rose-100 dark:border-rose-900/40 flex items-start gap-2">
                          <span className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md shrink-0">
                            {err.file}
                          </span>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                            {err.location}
                          </p>
                        </div>
                        <div className="p-4 flex flex-col gap-3 grow">
                          <p className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
                            {err.message}
                          </p>
                          <div className="bg-blue-50/80 dark:bg-blue-950/50 p-3 rounded-xl flex items-start gap-2.5 border border-blue-100 dark:border-blue-900/50 mt-auto">
                            <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-[10px] font-extrabold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-0.5">
                                Hướng dẫn khắc phục
                              </span>
                              <p className="text-xs text-blue-950 dark:text-blue-200 font-medium leading-relaxed">
                                {err.suggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS STEP 2 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setStep(1); scrollToFormTop(); }}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại Bước 1: Nạp file</span>
                </button>

                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={files.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:-translate-y-0.5 active:scale-[0.99] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Phân tích File &amp; Xem trước Ma trận</span>
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 3: MA TRẬN & TẢI FILE ZIP */}
          {step === 3 && previewData && (
            <div className="space-y-8 animate-fade-in-up">
              {/* SUCCESS NOTICE */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                  <strong>Phân tích thành công!</strong> Thuật toán đã bóc tách toàn bộ dữ liệu câu hỏi và công thức. Kiểm tra nhanh bảng ma trận hoán vị bên dưới và tải gói file ZIP hoàn chỉnh.
                </div>
              </div>

              {/* MATRIX TABLE WITH PAGINATION */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                      Ma trận đáp án ({numExams} mã đề)
                    </h4>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold uppercase">
                      Bản mô phỏng
                    </span>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-end sm:self-auto">
                    <button
                      type="button"
                      disabled={matrixPage === 0}
                      onClick={() => setMatrixPage(p => p - 1)}
                      aria-label="Trang trước"
                      className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 px-2 select-none">
                      TRANG {matrixPage + 1} / {Math.ceil(previewData.matrix[0].length / rowsPerPage)}
                    </span>
                    <button
                      type="button"
                      disabled={(matrixPage + 1) * rowsPerPage >= previewData.matrix[0].length}
                      onClick={() => setMatrixPage(p => p + 1)}
                      aria-label="Trang sau"
                      className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs bg-white dark:bg-slate-900">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm text-center">
                    <thead className="bg-slate-50 dark:bg-slate-800/60">
                      <tr>
                        <th className="px-4 py-3.5 font-bold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
                          Câu
                        </th>
                        {previewData.matrix.map((_: any, i: number) => (
                          <th key={i} className="px-4 py-3.5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                            Mã {startCode + i}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {previewData.matrix[0].slice(matrixPage * rowsPerPage, (matrixPage + 1) * rowsPerPage).map((_: any, relativeIdx: number) => {
                        const qIdx = matrixPage * rowsPerPage + relativeIdx;
                        return (
                          <tr key={qIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                              {startQuestion + qIdx}
                            </td>
                            {previewData.matrix.map((examObj: any, eIdx: number) => {
                              const ansVal = examObj[qIdx];
                              const isMissing = ansVal === '?';
                              return (
                                <td
                                  key={eIdx}
                                  className={`px-4 py-2.5 font-bold ${
                                    isMissing
                                      ? 'text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30'
                                      : 'text-blue-600 dark:text-blue-400'
                                  }`}
                                >
                                  {ansVal}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DETAILED REPRESENTATIVE EXAM PREVIEW */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    Xem trước nội dung chi tiết (Mã đề đại diện {startCode})
                  </h4>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar bg-slate-50/80 dark:bg-slate-800/30 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {previewData.previewExam.map((q: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3"
                    >
                      <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-relaxed">
                        {q.question}
                      </p>
                      {q.answers && q.answers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.answers.map((ans: string, aIdx: number) => {
                            const isCorrect = ans.startsWith(q.correctAnswer);
                            return (
                              <div
                                key={aIdx}
                                className={`text-xs sm:text-sm p-2.5 rounded-lg border transition-colors ${
                                  isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {ans}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                          Đáp án tự luận/điền số: {q.correctAnswer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 3 ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setStep(2); scrollToFormTop(); }}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại Bước 2: Cấu hình</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadZip}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:scale-[0.99] transition-all text-sm sm:text-base"
                >
                  <Download className="w-5 h-5" />
                  <span>Tải Xuống Trọn Bộ Đề (ZIP)</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
