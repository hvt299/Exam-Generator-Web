'use client';

import { useState, useRef, useEffect } from 'react';
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
  SlidersHorizontal, 
  ArrowLeft, 
  ArrowRight,
  FileSpreadsheet,
  Check,
  RotateCcw,
  HelpCircle,
  Tag,
  Type,
  CheckSquare,
  ListOrdered
} from 'lucide-react';

export default function GeneratorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // File Upload State
  const [files, setFiles] = useState<File[]>([]);

  // Config State
  const [numExams, setNumExams] = useState(4);
  const [startCode, setStartCode] = useState(101);
  const [startQuestion, setStartQuestion] = useState(1);

  // Cấu trúc đề & Đánh số câu
  const [selectedParts, setSelectedParts] = useState<number[]>([1, 2, 3, 4]);
  const [numberingMode, setNumberingMode] = useState<'continuous' | 'per_part'>('continuous');
  const [p1StartQuestion, setP1StartQuestion] = useState(1);
  const [p2StartQuestion, setP2StartQuestion] = useState(1);
  const [p3StartQuestion, setP3StartQuestion] = useState(1);
  const [p4StartQuestion, setP4StartQuestion] = useState(1);

  const togglePart = (part: number) => {
    if (selectedParts.includes(part)) {
      if (selectedParts.length === 1) {
        alert('Đề thi phải có ít nhất 1 phần được chọn!');
        return;
      }
      setSelectedParts(selectedParts.filter(p => p !== part));
    } else {
      setSelectedParts([...selectedParts, part].sort((a, b) => a - b));
    }
  };

  // Header & Footer State (MẶC ĐỊNH LÀ TẮT THEO YÊU CẦU)
  const [useHeader, setUseHeader] = useState(false);
  const [useFooter, setUseFooter] = useState(false);
  const [department, setDepartment] = useState('SỞ GD&ĐT...');
  const [school, setSchool] = useState('TRƯỜNG THPT...');
  const [examName, setExamName] = useState('KIỂM TRA CUỐI KÌ I');
  const [schoolYear, setSchoolYear] = useState('NĂM HỌC 2025 - 2026');
  const [subject, setSubject] = useState('Toán');
  const [duration, setDuration] = useState('90 phút');

  // ĐỒNG BỘ ĐỊNH DẠNG CÂU & ĐÁP ÁN (BƯỚC 2)
  const [questionPrefixFormat, setQuestionPrefixFormat] = useState<'dot' | 'colon' | 'keep'>('dot');
  const [showAdvancedPrefix, setShowAdvancedPrefix] = useState(false);
  const [p1QuestionFormat, setP1QuestionFormat] = useState<'dot' | 'colon' | 'keep'>('dot');
  const [p2QuestionFormat, setP2QuestionFormat] = useState<'dot' | 'colon' | 'keep'>('dot');
  const [p3QuestionFormat, setP3QuestionFormat] = useState<'dot' | 'colon' | 'keep'>('dot');
  const [p4QuestionFormat, setP4QuestionFormat] = useState<'dot' | 'colon' | 'keep'>('dot');
  const [answerLabelFormat, setAnswerLabelFormat] = useState<'bold_all' | 'bold_char' | 'regular'>('bold_all');

  // TÙY CHỈNH TÊN FILE (BƯỚC 3)
  const [zipFileName, setZipFileName] = useState('Bo_De_Thi.zip');
  const [examFilePrefix, setExamFilePrefix] = useState('Ma_de_');
  const [excelFileName, setExcelFileName] = useState('Dap_an_excel.xlsx');

  // Loading & Preview State
  const [loadingState, setLoadingState] = useState<'none' | 'previewing' | 'downloading'>('none');
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  // UI helpers
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [matrixPage, setMatrixPage] = useState(0);
  const rowsPerPage = 10;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Tự động gợi ý tên file theo môn học
  useEffect(() => {
    if (subject && subject !== 'Toán') {
      const safeSub = subject.replace(/[^a-zA-Z0-9à-ỹÀ-Ỹ]/g, '_');
      setZipFileName(`De_Thi_${safeSub}.zip`);
      setExamFilePrefix(`De_${safeSub}_Ma_`);
      setExcelFileName(`Dap_an_${safeSub}.xlsx`);
    }
  }, [subject]);

  const getErrorBadge = (type: string) => {
    switch (type) {
      case 'TABLE_DETECTED':
        return { label: 'Bảng Table', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      case 'NUMBERING_DETECTED':
        return { label: 'Numbering tự động', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200' };
      case 'FLOATING_IMAGE':
        return { label: 'Ảnh trôi nổi', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-200' };
      case 'INVALID_QUESTION_KEYWORD':
        return { label: 'Sai từ khóa câu', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      case 'INVALID_ANSWER_KEYWORD':
        return { label: 'Sai từ khóa đáp án', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      case 'QUESTION_ANSWER_SAME_LINE':
        return { label: 'Dính câu & đáp án', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/80 dark:text-purple-200' };
      case 'STICKY_QUESTION':
        return { label: 'Dính 2 câu hỏi', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/80 dark:text-purple-200' };
      case 'PART3_ANSWER_TOO_LONG':
        return { label: 'Phần III > 4 ký tự', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      case 'PART3_NOT_NUMBER':
        return { label: 'Phần III không phải số', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200' };
      case 'NO_CORRECT_ANSWER':
        return { label: 'Thiếu đáp án đúng', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      case 'NO_TF_MARKED':
        return { label: 'Chưa đánh dấu Đúng', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200' };
      case 'UNRESOLVED_ANSWER':
        return { label: 'Đáp án bị ?', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/80 dark:text-rose-200' };
      default:
        return { label: 'Lỗi định dạng', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

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
    formData.append('numberingMode', numberingMode);
    formData.append('p1StartQuestion', p1StartQuestion.toString());
    formData.append('p2StartQuestion', p2StartQuestion.toString());
    formData.append('p3StartQuestion', p3StartQuestion.toString());
    formData.append('p4StartQuestion', p4StartQuestion.toString());
    formData.append('selectedParts', JSON.stringify(selectedParts));
    formData.append('questionPrefixFormat', questionPrefixFormat);
    formData.append('p1QuestionFormat', showAdvancedPrefix ? p1QuestionFormat : questionPrefixFormat);
    formData.append('p2QuestionFormat', showAdvancedPrefix ? p2QuestionFormat : questionPrefixFormat);
    formData.append('p3QuestionFormat', showAdvancedPrefix ? p3QuestionFormat : questionPrefixFormat);
    formData.append('p4QuestionFormat', showAdvancedPrefix ? p4QuestionFormat : questionPrefixFormat);
    formData.append('answerLabelFormat', answerLabelFormat);

    try {
      const response = await fetch(`${apiUrl}/api/v1/exams/preview`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Có lỗi xảy ra khi kết nối máy chủ');
      const data = await response.json();
      if (!data.success) {
        setValidationErrors(data.errors || []);
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
    formData.append('numberingMode', numberingMode);
    formData.append('p1StartQuestion', p1StartQuestion.toString());
    formData.append('p2StartQuestion', p2StartQuestion.toString());
    formData.append('p3StartQuestion', p3StartQuestion.toString());
    formData.append('p4StartQuestion', p4StartQuestion.toString());
    formData.append('selectedParts', JSON.stringify(selectedParts));
    formData.append('useHeader', useHeader.toString());
    formData.append('useFooter', useFooter.toString());
    formData.append('department', department);
    formData.append('school', school);
    formData.append('examName', examName);
    formData.append('schoolYear', schoolYear);
    formData.append('subject', subject);
    formData.append('duration', duration);
    formData.append('questionPrefixFormat', questionPrefixFormat);
    formData.append('p1QuestionFormat', showAdvancedPrefix ? p1QuestionFormat : questionPrefixFormat);
    formData.append('p2QuestionFormat', showAdvancedPrefix ? p2QuestionFormat : questionPrefixFormat);
    formData.append('p3QuestionFormat', showAdvancedPrefix ? p3QuestionFormat : questionPrefixFormat);
    formData.append('p4QuestionFormat', showAdvancedPrefix ? p4QuestionFormat : questionPrefixFormat);
    formData.append('answerLabelFormat', answerLabelFormat);
    formData.append('zipFileName', zipFileName || 'Bo_De_Thi.zip');
    formData.append('examFilePrefix', examFilePrefix || 'Ma_de_');
    formData.append('excelFileName', excelFileName || 'Dap_an_excel.xlsx');

    try {
      const response = await fetch(`${apiUrl}/api/v1/exams/mix-multi`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Định dạng file chưa chuẩn hoặc phát hiện lỗi đáp án!');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      const downloadName = zipFileName ? (zipFileName.endsWith('.zip') ? zipFileName : `${zipFileName}.zip`) : 'Bo_De_Thi.zip';
      a.download = downloadName;
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
              Trộn Đề Thi Trắc Nghiệm Chuẩn 2025
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

        {/* STEP PROGRESS INDICATOR */}
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
            <span className="hidden sm:inline">2. Cấu hình &amp; Đồng bộ</span>
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
                  Tải lên một hoặc nhiều file đề thi gốc để thuật toán bóc tách công thức toán học và hình ảnh.
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

              {/* CHECKLIST 8 LỖI THƯỜNG GẶP */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="w-full p-4 bg-slate-50/80 dark:bg-slate-800/40 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      Checklist kiểm tra đề thi (Tránh 8 lỗi thường gặp &amp; Chuẩn Bộ GD&amp;ĐT 2025)
                    </span>
                  </div>
                  {showChecklist ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {showChecklist && (
                  <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">1. Xóa đầu/cuối:</span>
                      <span>Xóa tiêu đề Sở/Trường và chữ ký giáo viên ở cuối đề thi trước khi nạp file.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">2. Không dùng Bảng:</span>
                      <span>Không để câu hỏi hoặc đáp án trong Table hoặc Textbox (thuật toán tự động canh dòng Smart Layout).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">3. Từ khóa câu &amp; đáp án:</span>
                      <span>Bắt đầu bằng <code>Câu 1.</code> (có dấu . hoặc : liền sau), các đáp án <code>A. B. C. D.</code> (có dấu . liền sau).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">4. Xuống dòng (Enter):</span>
                      <span>Enter xuống dòng trước khi gõ các đáp án A., và Enter sau đáp án D trước khi gõ câu hỏi tiếp theo.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">5. Tắt Auto-Numbering:</span>
                      <span>Bôi đen đề thi, tắt tính năng Numbering tự động của Word (chọn None) và gõ tay A., B., C., D.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">6. Đúng / Sai (Phần II):</span>
                      <span>Bắt buộc 4 ý <code>a) b) c) d)</code> (dấu ngoặc đơn), gạch chân (Ctrl+U) ý Đúng.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">7. Trả lời ngắn (Phần III):</span>
                      <span>Đặt sau <code>A.</code>, nội dung là <strong>số có độ dài không quá 4 ký tự</strong> (VD: A. 12 hoặc A. 12,5).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">8. Ảnh Inline With Text:</span>
                      <span>Hình ảnh phải chuyển sang chế độ "In Line with Text" để không bị xô lệch khi hoán vị.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">9. Tự luận (Phần IV):</span>
                      <span>Bắt đầu bằng <code>Câu 1.</code>, <code>Bài 1.</code> (kể cả có thang điểm <code>Câu 1 (2,0 điểm):</code>), các ý con dạng <code>1. 2.</code> hoặc <code>a. b.</code></span>
                    </div>
                  </div>
                )}
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

          {/* BƯỚC 2: CẤU HÌNH ĐỀ THI & ĐỒNG BỘ ĐỊNH DẠNG */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Bước 2: Cấu hình Đề thi &amp; Tùy chọn Đồng bộ</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Thiết lập số lượng mã đề con và tùy chỉnh đồng nhất định dạng ký hiệu câu, đáp án.
                </p>
              </div>

              {/* CẤU TRÚC ĐỀ THI (CHỌN CÁC PHẦN) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Cấu trúc Đề thi (Chọn các phần có trong đề)</span>
                  </h4>
                  <span className="text-xs text-slate-500">Tick chọn những phần xuất hiện trong file đề gốc</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 1, name: 'Phần I', label: 'Trắc nghiệm 4 lựa chọn', desc: '4 phương án A, B, C, D' },
                    { id: 2, name: 'Phần II', label: 'Trắc nghiệm Đúng / Sai', desc: '4 ý con a), b), c), d)' },
                    { id: 3, name: 'Phần III', label: 'Trả lời ngắn (Điền số)', desc: 'Đáp án số tối đa 4 ký tự' },
                    { id: 4, name: 'Phần IV', label: 'Tự luận', desc: 'Barem điểm chi tiết' },
                  ].map(p => {
                    const isChecked = selectedParts.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => togglePart(p.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isChecked
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-extrabold uppercase tracking-wider ${isChecked ? 'text-blue-700 dark:text-blue-300' : 'text-slate-400'}`}>
                            {p.name}
                          </span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <div className="font-bold text-xs leading-snug">{p.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{p.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* THÔNG SỐ HOÁN VỊ */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Thông số sinh mã đề</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                </div>
              </div>

              {/* QUY TẮC ĐÁNH SỐ CÂU HỎI */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Quy tắc Đánh số Câu hỏi trong Đề thi</span>
                  </h4>
                  <span className="text-xs text-slate-500">Chọn đánh số nối tiếp liên tục hoặc độc lập từng phần</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setNumberingMode('continuous')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      numberingMode === 'continuous'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="numberingMode"
                        checked={numberingMode === 'continuous'}
                        onChange={() => setNumberingMode('continuous')}
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="font-bold text-xs sm:text-sm">Đánh số nối tiếp toàn bài</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                      Các phần đánh số liên tục từ câu đầu đến câu cuối (ví dụ: Phần I từ 1-12, Phần II nối tiếp từ 13-16...).
                    </p>
                  </div>

                  <div
                    onClick={() => setNumberingMode('per_part')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      numberingMode === 'per_part'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="numberingMode"
                        checked={numberingMode === 'per_part'}
                        onChange={() => setNumberingMode('per_part')}
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="font-bold text-xs sm:text-sm">Đánh số riêng lẻ cho từng phần</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                      Mỗi phần bắt đầu đánh số lại độc lập (ví dụ: Phần I từ Câu 1, Phần II từ Câu 1, Phần III từ Câu 1...).
                    </p>
                  </div>
                </div>

                {/* CHI TIẾT SỐ BẮT ĐẦU */}
                {numberingMode === 'continuous' ? (
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Toàn bài bắt đầu từ câu số:
                      </label>
                      <span className="text-[11px] text-slate-400">Mặc định: Câu 1</span>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={startQuestion}
                      onChange={(e) => setStartQuestion(parseInt(e.target.value) || 1)}
                      className="w-full sm:w-32 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Số câu bắt đầu cho từng phần đã chọn:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedParts.includes(1) && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">Phần I bắt đầu từ:</label>
                          <input
                            type="number"
                            min="1"
                            value={p1StartQuestion}
                            onChange={(e) => setP1StartQuestion(parseInt(e.target.value) || 1)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                          />
                        </div>
                      )}
                      {selectedParts.includes(2) && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Phần II bắt đầu từ:</label>
                          <input
                            type="number"
                            min="1"
                            value={p2StartQuestion}
                            onChange={(e) => setP2StartQuestion(parseInt(e.target.value) || 1)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                          />
                        </div>
                      )}
                      {selectedParts.includes(3) && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase">Phần III bắt đầu từ:</label>
                          <input
                            type="number"
                            min="1"
                            value={p3StartQuestion}
                            onChange={(e) => setP3StartQuestion(parseInt(e.target.value) || 1)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                          />
                        </div>
                      )}
                      {selectedParts.includes(4) && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Phần IV bắt đầu từ:</label>
                          <input
                            type="number"
                            min="1"
                            value={p4StartQuestion}
                            onChange={(e) => setP4StartQuestion(parseInt(e.target.value) || 1)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* TÙY CHỌN ĐỒNG BỘ ĐỊNH DẠNG CÂU & ĐÁP ÁN */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Tùy chọn Đồng bộ Định dạng Ký hiệu</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedPrefix(!showAdvancedPrefix)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    {showAdvancedPrefix ? 'Đồng bộ chung tất cả' : 'Tùy chỉnh riêng từng phần'}
                  </button>
                </div>

                {/* Định dạng tiền tố câu */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Định dạng số câu trong đề thi con:
                  </label>
                  {!showAdvancedPrefix ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'dot', label: 'Dấu chấm (Câu 1.)', desc: 'Chuẩn quy định Bộ GD&ĐT 2025' },
                        { id: 'colon', label: 'Dấu hai chấm (Câu 1:)', desc: 'Phổ biến nhiều trường THPT' },
                        { id: 'keep', label: 'Giữ nguyên đề gốc', desc: 'Không thay đổi ký hiệu gốc' },
                      ].map(opt => (
                        <div
                          key={opt.id}
                          onClick={() => setQuestionPrefixFormat(opt.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            questionPrefixFormat === opt.id
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-xs">{opt.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      {[
                        { id: 1, title: 'Phần I', val: p1QuestionFormat, setter: setP1QuestionFormat },
                        { id: 2, title: 'Phần II', val: p2QuestionFormat, setter: setP2QuestionFormat },
                        { id: 3, title: 'Phần III', val: p3QuestionFormat, setter: setP3QuestionFormat },
                        { id: 4, title: 'Phần IV', val: p4QuestionFormat, setter: setP4QuestionFormat },
                      ].filter(p => selectedParts.includes(p.id)).map(p => (
                        <div key={p.id} className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase">{p.title}</label>
                          <select
                            value={p.val}
                            onChange={(e) => p.setter(e.target.value as any)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-semibold outline-none"
                          >
                            <option value="dot">Câu X.</option>
                            <option value="colon">Câu X:</option>
                            <option value="keep">Giữ gốc</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Định dạng nhãn chữ cái đáp án */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Định dạng chữ cái phương án đáp án (A. B. C. D. / a) b) c) d)):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'bold_all', label: 'In đậm toàn bộ', example: 'A. B. C. D. / a) b) c) d)', desc: 'Rõ nét, dễ đọc nhất' },
                      { id: 'bold_char', label: 'Chỉ đậm chữ cái', example: 'A. B. C. D.', desc: 'Dấu chấm không đậm' },
                      { id: 'regular', label: 'In thường không đậm', example: 'A. B. C. D.', desc: 'Chữ mảnh thanh lịch' },
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setAnswerLabelFormat(opt.id as any)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          answerLabelFormat === opt.id
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-xs">{opt.label}</div>
                        <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 my-0.5">{opt.example}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{opt.desc}</div>
                      </div>
                    ))}
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
                        Môn Thi
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
                        Thời Gian Làm Bài
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
                        Phát hiện {validationErrors.length} điểm cần chỉnh sửa ở file Word
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

                  <p className="text-xs text-rose-700 dark:text-rose-300 mb-4 font-medium">
                    &bull; <strong>Chính sách kiểm định nghiêm ngặt:</strong> Bạn cần sửa triệt để các lỗi này trong file Word gốc trước khi được phép xem trước ma trận và tải bộ đề ở Bước 3.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(showAllErrors ? validationErrors : validationErrors.slice(0, 4)).map((err: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-rose-900/50 shadow-xs overflow-hidden flex flex-col"
                      >
                        <div className="px-4 py-2.5 bg-rose-50/60 dark:bg-rose-950/50 border-b border-rose-100 dark:border-rose-900/40 flex items-start gap-2 justify-between">
                          <div className="flex items-start gap-2 truncate">
                            <span className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md shrink-0">
                              {err.file}
                            </span>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                              {err.location}
                            </p>
                          </div>
                          {err.type && (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${getErrorBadge(err.type).color}`}>
                              {getErrorBadge(err.type).label}
                            </span>
                          )}
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
                  <span>Kiểm định &amp; Xem trước Ma trận</span>
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 3: MA TRẬN, PREVIEW CHI TIẾT & TÙY BIẾN TÊN FILE */}
          {step === 3 && previewData && (
            <div className="space-y-8 animate-fade-in-up">
              {/* SUCCESS NOTICE */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                  <strong>Kiểm định thành công 100%!</strong> Tất cả câu hỏi đều có đáp án chuẩn mực, không phát hiện lỗi định dạng. Bạn có thể đối chiếu ma trận và tùy chỉnh tên file bên dưới.
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
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      Đã xác thực
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
                              {previewData.matrixLabels?.[qIdx] || `Câu ${startQuestion + qIdx}`}
                            </td>
                            {previewData.matrix.map((examObj: any, eIdx: number) => {
                              const ansVal = examObj[qIdx];
                              const isEssay = ansVal === 'TL';
                              return (
                                <td
                                  key={eIdx}
                                  className={`px-4 py-2.5 font-bold ${
                                    isEssay 
                                      ? 'text-amber-600 dark:text-amber-400 font-extrabold'
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

              {/* DETAILED REPRESENTATIVE EXAM PREVIEW (PHÂN BIỆT RÕ 4 PHẦN) */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    Xem trước nội dung chi tiết &amp; Đáp án đúng (Mã đề {startCode})
                  </h4>
                </div>

                <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-2 custom-scrollbar bg-slate-50/80 dark:bg-slate-800/30 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {previewData.previewExam.map((q: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-3"
                    >
                      {/* Header câu hỏi kèm Badge phần */}
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-relaxed grow">
                          {q.question}
                        </p>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0 ${
                          q.part === 1
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : q.part === 2
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : q.part === 3
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {q.part === 1 ? 'Phần I' : q.part === 2 ? 'Phần II (Đ/S)' : q.part === 3 ? 'Phần III (Điền số)' : 'Phần IV (Tự luận)'}
                        </span>
                      </div>

                      {/* PHẦN I: Trắc nghiệm 4 lựa chọn */}
                      {q.part === 1 && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.answers.map((ans: any, aIdx: number) => (
                              <div
                                key={aIdx}
                                className={`text-xs sm:text-sm p-3 rounded-xl border flex items-center justify-between ${
                                  ans.isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span><span className="font-bold">{ans.label}</span> {ans.text}</span>
                                {ans.isCorrect && (
                                  <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-md shrink-0 ml-2">
                                    ĐÚNG
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-xs font-bold text-slate-500">Đáp án chuẩn:</span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-extrabold">
                              {q.correctAnswer}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* PHẦN II: Trắc nghiệm Đúng / Sai */}
                      {q.part === 2 && (
                        <div className="space-y-2">
                          <div className="space-y-1.5">
                            {q.answers.map((ans: any, aIdx: number) => (
                              <div
                                key={aIdx}
                                className={`text-xs sm:text-sm p-2.5 rounded-xl border flex items-center justify-between ${
                                  ans.isCorrect
                                    ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800'
                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <span className="text-slate-800 dark:text-slate-200">
                                  <span className="font-bold">{ans.label}</span> {ans.text}
                                </span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                  ans.isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}>
                                  {ans.isCorrect ? 'ĐÚNG' : 'SAI'}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-1 text-xs">
                            <span className="font-bold text-slate-500">Kết quả tổng hợp:</span>
                            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              {q.correctAnswer}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* PHẦN III: Trả lời ngắn (Điền số) */}
                      {q.part === 3 && (
                        <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                          <span className="text-xs text-purple-950 dark:text-purple-200">
                            Thí sinh điền kết quả vào phiếu trả lời:
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-bold">Đáp án đúng:</span>
                            <span className="px-3 py-1 rounded-lg bg-purple-600 text-white text-sm font-extrabold font-mono">
                              {q.correctAnswer}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* PHẦN IV: Tự luận */}
                      {q.part === 4 && (
                        <div className="space-y-2 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                          {q.answers && q.answers.length > 0 && (
                            <div className="space-y-1 mb-2">
                              {q.answers.map((item: any, itIdx: number) => (
                                <div key={itIdx} className="text-xs text-slate-800 dark:text-slate-200 pl-2">
                                  <span className="font-bold text-amber-700 dark:text-amber-400">{item.label}</span> {item.text}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
                            <Check className="w-3.5 h-3.5 text-amber-600" />
                            <span className="font-semibold">{q.correctAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* TÙY CHỈNH TÊN FILE XUẤT BẢN (CHỐNG GHI ĐÈ KHI TRỘN NHIỀU MÔN) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Tùy chỉnh Tên File Xuất Bản (Chống trùng lặp &amp; ghi đè khi trộn nhiều môn)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Tên gói nén ZIP (.zip)
                    </label>
                    <input
                      type="text"
                      value={zipFileName}
                      onChange={(e) => setZipFileName(e.target.value)}
                      placeholder="Bo_De_Thi.zip"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Tiền tố file đề Word (.docx)
                    </label>
                    <input
                      type="text"
                      value={examFilePrefix}
                      onChange={(e) => setExamFilePrefix(e.target.value)}
                      placeholder="Ma_de_"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block">&rarr; {examFilePrefix}101.docx</span>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Tên file Excel ma trận (.xlsx)
                    </label>
                    <input
                      type="text"
                      value={excelFileName}
                      onChange={(e) => setExcelFileName(e.target.value)}
                      placeholder="Dap_an_excel.xlsx"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>
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
                  <span>Tải Xuống Trọn Bộ Đề ({zipFileName || 'ZIP'})</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
