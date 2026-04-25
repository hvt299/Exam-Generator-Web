'use client';

import { useState, useRef } from 'react';
import { UploadCloud, FileText, Loader2, Settings, FileCheck2, Info, CheckCircle2, AlertTriangle, Tags, ShieldAlert, Eye, AlertOctagon, Download, RefreshCw, BookOpen, X, Sparkles } from 'lucide-react';

export default function ExamGenerator() {
  const [files, setFiles] = useState<File[]>([]);
  const [numExams, setNumExams] = useState(4);
  const [startCode, setStartCode] = useState(101);
  const [startQuestion, setStartQuestion] = useState(1);

  const [useHeader, setUseHeader] = useState(true);
  const [useFooter, setUseFooter] = useState(true);
  const [department, setDepartment] = useState('SỞ GD&ĐT...');
  const [school, setSchool] = useState('TRƯỜNG THPT...');
  const [examName, setExamName] = useState('KIỂM TRA CUỐI KÌ I');
  const [schoolYear, setSchoolYear] = useState('NĂM HỌC 2025 - 2026');
  const [subject, setSubject] = useState('Toán');
  const [duration, setDuration] = useState('90 phút');

  const [loadingState, setLoadingState] = useState<'none' | 'previewing' | 'downloading'>('none');
  const [step, setStep] = useState<1 | 2>(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rules' | 'features' | 'limitations'>('rules');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const handleFilesProcess = (selectedFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    Array.from(selectedFiles).forEach(f => {
      if (f.name.endsWith('.docx')) validFiles.push(f);
      else alert(`File ${f.name} bị từ chối vì không phải định dạng .docx`);
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setValidationErrors([]);
      setPreviewData(null);
      setStep(1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFilesProcess(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loadingState === 'none' && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesProcess(e.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, idx) => idx !== indexToRemove));
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
        method: 'POST', body: formData,
      });
      if (!response.ok) throw new Error('Có lỗi xảy ra khi kết nối máy chủ');
      const data = await response.json();
      if (!data.success) setValidationErrors(data.errors);
      else { setPreviewData(data); setStep(2); }
    } catch (error: any) { alert(error.message); }
    finally { setLoadingState('none'); }
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
        method: 'POST', body: formData,
      });
      if (!response.ok) throw new Error('Định dạng file không chuẩn hoặc có lỗi từ máy chủ!');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl; a.download = 'Bo_De_Thi.zip';
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) { alert(error.message); }
    finally { setLoadingState('none'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ExamGen <span className="text-blue-600 font-black">PRO</span></span>
          </div>
          <button
            onClick={() => setIsDocsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Hướng dẫn & Quy chuẩn
          </button>
        </div>
      </header>

      {/* OVERLAY LOADER */}
      {loadingState !== 'none' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200">
            <Loader2 className="animate-spin h-14 w-14 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">{loadingState === 'previewing' ? 'Đang phân tích dữ liệu...' : 'Đang đóng gói file ZIP...'}</h3>
            <p className="text-slate-500 mt-2 text-sm text-center">Vui lòng không đóng trình duyệt.</p>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">Hệ thống Trộn Đề Thông Minh</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Upload đề thi gốc, tự động hoán vị, dàn trang tối ưu và xuất ma trận Excel chỉ trong vài giây.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Vùng Cấu hình Cơ bản */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số lượng đề mã</label>
                    <input type="number" min="1" max="24" value={numExams} onChange={(e) => setNumExams(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mã bắt đầu</label>
                    <input type="number" min="1" value={startCode} onChange={(e) => setStartCode(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Câu bắt đầu</label>
                    <input type="number" min="1" value={startQuestion} onChange={(e) => setStartQuestion(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                  </div>
                </div>

                {/* Vùng Cấu hình Header & Footer */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-6 justify-between items-center">
                    <label className="flex items-center cursor-pointer group w-full sm:w-auto">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={useHeader} onChange={() => setUseHeader(!useHeader)} />
                        <div className={`block w-12 h-7 rounded-full transition-colors ${useHeader ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${useHeader ? 'transform translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-3 font-semibold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">Bổ sung Header (Tiêu đề)</span>
                    </label>

                    <label className="flex items-center cursor-pointer group w-full sm:w-auto">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={useFooter} onChange={() => setUseFooter(!useFooter)} />
                        <div className={`block w-12 h-7 rounded-full transition-colors ${useFooter ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${useFooter ? 'transform translate-x-5' : ''}`}></div>
                      </div>
                      <span className="ml-3 font-semibold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">Bổ sung Footer (HẾT)</span>
                    </label>
                  </div>

                  {useHeader && (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white animate-in slide-in-from-top-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Sở / Phòng GD</label>
                        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Tên Trường</label>
                        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Kì Kiểm Tra</label>
                        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Năm Học</label>
                        <input type="text" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)}
                          className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 sm:col-span-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Môn học</label>
                          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                            className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Thời gian</label>
                          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                            className="w-full border-b-2 border-slate-200 bg-transparent py-2 focus:border-blue-600 focus:outline-none transition-colors font-medium text-slate-800" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Vùng Upload Files */}
                <div>
                  <div
                    onClick={() => { if (fileInputRef.current) { fileInputRef.current.value = ''; fileInputRef.current.click(); } }}
                    onDragOver={handleDragOver} onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300
                      ${files.length > 0 ? 'border-blue-400 bg-blue-50/30 hover:bg-blue-50/50' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50 bg-white'}`}
                  >
                    {files.length > 0 ? (
                      <div className="w-full max-w-lg flex flex-col items-center">
                        <div className="bg-green-100 p-3 rounded-full mb-3">
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <span className="font-extrabold text-slate-800 text-xl mb-4">Đã nạp {files.length} Đề gốc</span>
                        <div className="w-full max-h-48 overflow-y-auto space-y-2.5 mb-5 px-2">
                          {files.map((f, i) => (
                            <div key={i} className="flex justify-between items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                              <div className="flex items-center truncate">
                                <span className="bg-slate-100 text-slate-500 font-mono text-xs px-2 py-1 rounded mr-3">#{i + 1}</span>
                                <span className="font-medium text-slate-700 truncate">{f.name}</span>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">+ Nhấn để nạp thêm file</span>
                      </div>
                    ) : (
                      <>
                        <div className="bg-slate-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="h-10 w-10 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-1">Kéo thả file Word vào đây</h4>
                        <p className="text-slate-500 text-sm font-medium">Hỗ trợ nhận diện nhiều đề gốc (.docx)</p>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept=".docx" multiple className="hidden" onChange={handleFileChange} />
                  </div>
                </div>

                {validationErrors.length > 0 && (
                  <div className="bg-red-50/80 p-6 rounded-2xl border border-red-200 animate-in fade-in">
                    <div className="flex items-center mb-4">
                      <AlertOctagon className="h-6 w-6 text-red-600 mr-2" />
                      <h3 className="text-lg font-bold text-red-800">Cần sửa {validationErrors.length} lỗi trong file gốc</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-2.5 text-sm text-red-700">
                      {validationErrors.map((err, idx) => (
                        <li key={idx} className="font-medium leading-relaxed">{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={handlePreview} disabled={files.length === 0}
                  className={`w-full py-4 px-6 rounded-2xl shadow-lg text-lg font-bold text-white transition-all transform flex items-center justify-center
                    ${files.length === 0 ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-slate-900 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]'}`}
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Phân tích File & Xem trước
                </button>
              </div>
            )}

            {step === 2 && previewData && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="bg-green-50 p-5 rounded-2xl border border-green-200 flex items-start sm:items-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 sm:mt-0 shrink-0" />
                  <p className="text-sm text-green-800 font-medium leading-relaxed">
                    Dữ liệu hoàn hảo! Thuật toán đã bóc tách thành công. Kiểm tra nhanh Ma trận bên dưới và tải File ZIP.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" /> Trích xuất Ma trận (Mô phỏng)
                  </h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-sm text-center">
                      <thead className="bg-slate-50/80">
                        <tr>
                          <th className="px-4 py-4 font-bold text-slate-700 border-r border-slate-200 uppercase tracking-wider text-xs">Câu</th>
                          {previewData.matrix.map((_: any, i: number) => (
                            <th key={i} className="px-4 py-4 font-bold text-slate-700 uppercase tracking-wider text-xs">Mã {startCode + i}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {previewData.matrix[0].slice(0, 10).map((_: any, qIdx: number) => (
                          <tr key={qIdx} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200">{startQuestion + qIdx}</td>
                            {previewData.matrix.map((examObj: any, eIdx: number) => (
                              <td key={eIdx} className={`px-4 py-3 font-bold ${examObj[qIdx] === '?' ? 'text-red-500' : 'text-blue-700'}`}>
                                {examObj[qIdx]}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {previewData.matrix[0].length > 10 && (
                          <tr>
                            <td colSpan={numExams + 1} className="px-4 py-4 text-slate-400 font-medium bg-slate-50">
                              ... ({previewData.matrix[0].length - 10} câu còn lại xem chi tiết trong file Excel)
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                  <button onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center py-4 px-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                    <RefreshCw className="mr-2 h-5 w-5" /> Quay lại cấu hình
                  </button>
                  <button onClick={handleDownloadZip}
                    className="flex-2 flex items-center justify-center py-4 px-4 rounded-2xl shadow-lg shadow-blue-500/30 text-lg font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-[0.98]">
                    <Download className="mr-2 h-6 w-6" /> Tải Xuống Bộ Đề (ZIP)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-6 text-center border-t border-slate-200 bg-white mt-auto">
        <p className="text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} ExamGen PRO. Hệ thống trộn đề thi trắc nghiệm tiên tiến nhất.
        </p>
      </footer>

      {/* MODAL HƯỚNG DẪN */}
      {isDocsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
           <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 shrink-0">
              <h2 className="text-2xl font-extrabold text-slate-800 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600" /> Tài liệu Đặc tả & Hướng dẫn
              </h2>
              <button onClick={() => setIsDocsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* TAB HEADERS */}
            <div className="flex border-b border-slate-200 px-6 bg-slate-50 overflow-x-auto custom-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab('rules')}
                className={`py-3 px-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'rules' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                <CheckCircle2 className="w-4 h-4 inline-block mr-1.5 mb-0.5" /> Quy tắc & Cấu trúc
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-3 px-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'features' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                <Sparkles className="w-4 h-4 inline-block mr-1.5 mb-0.5" /> Tính năng Nổi bật
              </button>
              <button
                onClick={() => setActiveTab('limitations')}
                className={`py-3 px-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'limitations' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                <AlertTriangle className="w-4 h-4 inline-block mr-1.5 mb-0.5" /> Hạn chế & Cảnh báo (Red Flags)
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar grow bg-white">
              {/* NỘI DUNG TAB 1: QUY TẮC & CẤU TRÚC */}
              {activeTab === 'rules' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">1. Cấu trúc 3 Phần chuẩn Bộ GD 2025</h3>
                    <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed shadow-sm">
                      <div><strong className="text-blue-700">Phần I (Trắc nghiệm):</strong> Nhận diện qua từ khóa <code className="bg-white px-1.5 py-0.5 border rounded text-slate-900 font-bold">Câu X.</code> hoặc <code className="bg-white px-1.5 py-0.5 border rounded text-slate-900 font-bold">Question X:</code>. Theo sau là 4 đáp án <code className="bg-white px-1.5 py-0.5 border rounded font-bold">A. B. C. D.</code> (bắt buộc có dấu chấm).</div>
                      <hr className="border-slate-200" />
                      <div><strong className="text-blue-700">Phần II (Đúng/Sai):</strong> Các ý <code className="bg-white px-1.5 py-0.5 border rounded text-slate-900 font-bold">a) b) c) d)</code> (bắt buộc đóng ngoặc tròn) nằm dưới mỗi câu.</div>
                      <hr className="border-slate-200" />
                      <div><strong className="text-blue-700">Phần III (Trả lời ngắn):</strong> Chỉ gõ duy nhất 1 đáp án đi sau chữ <code className="bg-white px-1.5 py-0.5 border rounded text-slate-900 font-bold">A.</code> (Ví dụ: <code>A. 12,5</code>).</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">2. Cách Đánh Dấu Đáp Án Đúng</h3>
                    <p className="text-sm text-slate-600 mb-2">Hệ thống nhận diện đáp án đúng qua định dạng của file Word. Bạn phải làm 1 trong 2 cách sau:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 bg-green-50/50 p-4 rounded-xl border border-green-200">
                      <li><strong className="text-green-800">Bôi màu chữ:</strong> Hỗ trợ các mã màu: <strong>Đỏ</strong> (Red, #FF0000, #C00000, #EE0000), <strong>Xanh lá</strong> (Green, #00B050, #008000), và <strong>Xanh dương</strong> (Blue, #0000FF, #0070C0).</li>
                      <li><strong className="text-green-800">Gạch chân chữ (Underline):</strong> Bôi đen văn bản đáp án và nhấn <kbd className="bg-white border rounded shadow-sm px-1.5 font-mono text-xs text-slate-600">Ctrl + U</kbd>.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">3. Phân Nhóm & Ghim Đáp Án</h3>
                    <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200 text-sm text-slate-700 space-y-3">
                      <p>Dùng thẻ <code className="font-bold text-purple-700 bg-white px-1 border rounded">&lt;gX&gt;</code> đặt ở đầu đoạn văn để cấu hình luật trộn cho các câu bên dưới:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><code className="font-bold">&lt;g3&gt;</code>: Trộn Full (Hoán vị cả câu hỏi lẫn đáp án). Đây là mặc định.</li>
                        <li><code className="font-bold">&lt;g2&gt;</code>: Chỉ trộn đáp án, giữ nguyên thứ tự câu (Chuẩn cho bài Đọc hiểu).</li>
                        <li><code className="font-bold">&lt;g1&gt;</code>: Chỉ trộn câu, giữ nguyên thứ tự A,B,C,D.</li>
                        <li><code className="font-bold">&lt;g0&gt;</code>: Đóng băng hoàn toàn (Dành cho bài nghe Audio).</li>
                      </ul>
                      <p className="pt-2 border-t border-purple-100"><strong className="text-purple-900">Tính năng Ghim:</strong> Đặt dấu <code className="bg-white font-bold px-1.5 py-0.5 rounded border text-red-600">#</code> ngay trước ký tự đáp án (VD: <code>#D. Tất cả đều đúng</code>) để đáp án này không bao giờ bị đổi vị trí.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* NỘI DUNG TAB 2: TÍNH NĂNG */}
              {activeTab === 'features' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
                      <strong className="block text-blue-900 text-lg mb-2">Smart Layout 4-2-1</strong>
                      <p className="text-sm text-slate-700 leading-relaxed">Thuật toán tự động đo chiều dài đáp án và dàn trang bằng thẻ Tab chuẩn Word. Giúp xếp 4 đáp án/dòng, 2 đáp án/dòng thẳng tắp, cực kì tiết kiệm giấy.</p>
                    </div>
                    <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 hover:shadow-md transition-shadow">
                      <strong className="block text-indigo-900 text-lg mb-2">Hỗ trợ Nhiều Đề Gốc</strong>
                      <p className="text-sm text-slate-700 leading-relaxed">Cho phép upload cùng lúc nhiều file gốc. Thuật toán Round-Robin sẽ tự động chia đều số lượng mã đề cần trộn cho từng đề gốc.</p>
                    </div>
                    <div className="bg-teal-50 p-5 rounded-2xl border border-teal-100 hover:shadow-md transition-shadow">
                      <strong className="block text-teal-900 text-lg mb-2">Ma trận Excel Tự Động</strong>
                      <p className="text-sm text-slate-700 leading-relaxed">Tự động xuất bảng Excel đối chiếu các mã đề cực kì trực quan, tương thích tuyệt đối với các ứng dụng, máy quét chấm thi phổ biến.</p>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 hover:shadow-md transition-shadow">
                      <strong className="block text-amber-900 text-lg mb-2">Tàng Hình Header</strong>
                      <p className="text-sm text-slate-700 leading-relaxed">Tự động chèn bảng Header 2 cột chuẩn form Bộ Giáo Dục, viền vô hình, canh lề hoàn hảo không làm xô lệch bất kỳ dòng chữ nào trong file.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* NỘI DUNG TAB 3: HẠN CHẾ & RED FLAGS */}
              {activeTab === 'limitations' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                    <h3 className="text-red-800 font-bold text-lg mb-3 flex items-center">
                      <ShieldAlert className="w-5 h-5 mr-2" /> Vùng Cảnh Báo (Red Flags)
                    </h3>
                    <p className="text-sm text-red-700 mb-4 leading-relaxed font-medium">
                      Đây là trình phân tích cấu trúc văn bản XML, do đó nó <strong>rất nhạy cảm với các lỗi định dạng</strong>. Vui lòng tuân thủ tuyệt đối các nguyên tắc sau để tránh lỗi hệ thống:
                    </p>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-red-900">
                      <li>Tuyệt đối không sử dụng <strong>Bảng biểu (Table)</strong>, <strong>Textbox</strong> hoặc <strong>SmartArt</strong> để chứa nội dung câu hỏi hay đáp án. Hệ thống sẽ bỏ qua chúng.</li>
                      <li>Hình ảnh đính kèm bắt buộc phải được thiết lập ở chế độ <strong>"In line with text"</strong> (Cùng dòng với văn bản).</li>
                      <li>Tuyệt đối <strong>không được dùng phím Enter</strong> để ngắt dòng giữa chừng bên trong một đáp án. (Nếu đáp án dài, hãy cứ gõ liên tục để Word tự động rớt dòng).</li>
                      <li>Lỗi đánh số tự động (Auto-Numbering): Đôi khi tính năng Auto-Numbering của Word làm ẩn ký tự A, B, C trong lõi XML. Khuyến cáo nên gõ tay chữ A., B., C., D.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
              <button onClick={() => setIsDocsOpen(false)} className="px-8 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md">
                Đã hiểu & Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
