'use client';

import { useState, useRef } from 'react';
import { UploadCloud, FileText, Loader2, Settings, FileCheck2, Info, CheckCircle2, AlertTriangle, Tags, ShieldAlert, FileWarning, Eye, AlertOctagon, Download, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export default function ExamGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [numExams, setNumExams] = useState(4);
  const [startCode, setStartCode] = useState(101);
  const [startQuestion, setStartQuestion] = useState(1);

  const [showAdvanced, setShowAdvanced] = useState(false);
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const handleFileProcess = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.docx')) {
      alert('Hệ thống chỉ chấp nhận file Word định dạng .docx');
      return;
    }
    setFile(selectedFile);
    setValidationErrors([]);
    setPreviewData(null);
    setStep(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loadingState === 'none' && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePreview = async () => {
    if (!file) return;
    setLoadingState('previewing');
    setValidationErrors([]);
    setPreviewData(null);

    const formData = new FormData();
    formData.append('file', file);
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
        setValidationErrors(data.errors);
      } else {
        setPreviewData(data);
        setStep(2);
      }
    } catch (error: any) { alert(error.message); }
    finally { setLoadingState('none'); }
  };

  const handleDownloadZip = async () => {
    if (!file) return;
    setLoadingState('downloading');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('numExams', numExams.toString());
    formData.append('startCode', startCode.toString());
    formData.append('startQuestion', startQuestion.toString());

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
      a.href = downloadUrl; a.download = 'Bo_De_Thi.zip';
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingState('none');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans relative">

      {/* MODAL OVERLAY KHÓA MÀN HÌNH */}
      {loadingState !== 'none' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200">
            <Loader2 className="animate-spin h-14 w-14 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">
              {loadingState === 'previewing' ? 'Đang kiểm tra dữ liệu...' : 'Đang đóng gói file ZIP...'}
            </h3>
            <p className="text-slate-500 mt-2 text-sm text-center leading-relaxed">
              Quá trình này có thể mất vài giây, vui lòng không đóng trình duyệt.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl w-full space-y-8">

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
              Exam Generator
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500 font-medium">
              Tự động hoán vị câu hỏi, đáp án và xuất ma trận Excel
            </p>
          </div>

          {/* BƯỚC 1: CẤU HÌNH & UPLOAD */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Vùng Cấu hình Cơ bản */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Số lượng đề</label>
                  <input type="number" min="1" max="24" value={numExams} onChange={(e) => setNumExams(parseInt(e.target.value))}
                    className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Mã bắt đầu</label>
                  <input type="number" min="1" value={startCode} onChange={(e) => setStartCode(parseInt(e.target.value))}
                    className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Câu bắt đầu</label>
                  <input type="number" min="1" value={startQuestion} onChange={(e) => setStartQuestion(parseInt(e.target.value))}
                    className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 sm:text-sm" />
                </div>
              </div>

              {/* Vùng Cấu hình Header (Accordion) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 transition-colors focus:outline-none"
                >
                  <span className="font-semibold text-slate-700 text-sm flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Cấu hình Tiêu đề File (Tùy chọn)
                  </span>
                  {showAdvanced ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>

                {showAdvanced && (
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border-t border-slate-200 animate-in slide-in-from-top-2">
                    {/* Hàng 1 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Sở / Phòng Giáo Dục</label>
                      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Tên Trường</label>
                      <input type="text" value={school} onChange={(e) => setSchool(e.target.value)}
                        className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                    </div>

                    {/* Hàng 2 */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Tên Kì Kiểm Tra</label>
                      <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)}
                        className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Năm Học</label>
                      <input type="text" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)}
                        className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                    </div>

                    {/* Hàng 3 */}
                    <div className="grid grid-cols-2 gap-4 sm:col-span-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Môn học</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                          className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Thời gian</label>
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                          className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Đề thi gốc (.docx)</label>
                <div
                  onClick={() => { if (fileInputRef.current) { fileInputRef.current.value = ''; fileInputRef.current.click(); } }}
                  onDragOver={handleDragOver} onDrop={handleDrop}
                  className={`mt-1 flex flex-col justify-center items-center px-6 pt-10 pb-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 
                    ${file ? 'border-green-400 bg-green-50 hover:bg-green-100' : 'border-slate-300 hover:border-blue-400 bg-white'}`}
                >
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileCheck2 className="mx-auto h-12 w-12 text-green-500 mb-3" />
                      <span className="font-bold text-green-700 text-center text-lg">{file.name}</span>
                      <span className="text-sm font-medium text-green-600 mt-2 bg-white px-3 py-1 rounded-full shadow-sm border border-green-200">
                        Nhấn để đổi file khác
                      </span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto h-14 w-14 mb-4 text-slate-400" />
                      <div className="flex text-base text-slate-600 justify-center font-semibold">
                        <span className="text-blue-600 hover:text-blue-500">Tải file lên</span>
                        <p className="pl-1 font-medium">hoặc kéo thả vào vùng này</p>
                      </div>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept=".docx" className="hidden" onChange={handleFileChange} />
                </div>
              </div>

              {/* BẢNG BÁO LỖI (NẾU CÓ) */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 animate-in fade-in">
                  <div className="flex items-center mb-4">
                    <AlertOctagon className="h-6 w-6 text-red-600 mr-2" />
                    <h3 className="text-lg font-bold text-red-800">Phát hiện {validationErrors.length} lỗi định dạng</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-red-700">
                    {validationErrors.map((err, idx) => (
                      <li key={idx} className="font-medium leading-relaxed">{err}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-red-600 italic">
                    * Vui lòng mở file Word, sửa lại các vị trí trên và tải lên lại.
                  </p>
                </div>
              )}

              <button
                onClick={handlePreview}
                disabled={!file}
                className={`w-full flex items-center justify-center py-4 px-4 rounded-xl shadow-md text-lg font-bold text-white transition-all 
                  ${!file ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
              >
                <Eye className="mr-2 h-6 w-6" />
                Kiểm tra File & Xem trước
              </button>
            </div>
          )}

          {/* BƯỚC 2: MÀN HÌNH PREVIEW & DOWNLOAD */}
          {step === 2 && previewData && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">

              <div className="bg-green-50 p-4 rounded-xl border border-green-200 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 shrink-0" />
                <p className="text-sm text-green-800 font-medium">
                  File hợp lệ! Dữ liệu đã được bóc tách thành công. Vui lòng kiểm tra lại Ma trận và Cấu trúc đề bên dưới trước khi tải xuống.
                </p>
              </div>

              {/* PREVIEW MA TRẬN ĐÁP ÁN */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" /> Ma trận đáp án (Minh họa)
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200 text-sm text-center">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200">Câu</th>
                        {previewData.matrix.map((_: any, i: number) => (
                          <th key={i} className="px-4 py-3 font-semibold text-slate-700">Mã {startCode + i}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {previewData.matrix[0].slice(0, 10).map((_: any, qIdx: number) => (
                        <tr key={qIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2 font-medium text-slate-900 border-r border-slate-200">Câu {startQuestion + qIdx}</td>
                          {previewData.matrix.map((examObj: any, eIdx: number) => (
                            <td key={eIdx} className={`px-4 py-2 font-bold ${examObj[qIdx] === '?' ? 'text-red-500 bg-red-50' : 'text-blue-600'}`}>
                              {examObj[qIdx]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {previewData.matrix[0].length > 10 && (
                        <tr>
                          <td colSpan={numExams + 1} className="px-4 py-3 text-slate-500 italic bg-slate-50">
                            ... và {previewData.matrix[0].length - 10} câu nữa (Xem đầy đủ trong file Excel)
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PREVIEW CẤU TRÚC ĐỀ (TEXT MINH HỌA) */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" /> Cấu trúc Đề thi (Trích đoạn Mã {startCode})
                </h4>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 h-64 overflow-y-auto text-sm space-y-6 shadow-inner">
                  {previewData.previewExam.slice(0, 5).map((q: any, idx: number) => (
                    <div key={idx} className="space-y-2 pb-4 border-b border-slate-200 last:border-0">
                      <p className="font-semibold text-slate-800 whitespace-pre-wrap">{q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                        {q.answers.map((ans: string, aIdx: number) => {
                          const isCorrect = ans.startsWith(q.correctAnswer);
                          return (
                            <div key={aIdx} className={`px-3 py-1.5 rounded-md border ${isCorrect ? 'bg-green-100 border-green-300 font-bold text-green-800' : 'bg-white border-slate-200 text-slate-700'}`}>
                              {ans} {isCorrect && ' ✓'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {previewData.previewExam.length > 5 && (
                    <div className="text-center text-slate-500 italic pt-2">... còn tiếp ...</div>
                  )}
                </div>
              </div>

              {/* CÁC NÚT ĐIỀU KHIỂN */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 flex items-center justify-center py-3.5 px-4 border border-slate-300 rounded-xl shadow-sm text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Sửa cấu hình / Tải file khác
                </button>
                <button
                  onClick={handleDownloadZip}
                  className="flex-2 flex items-center justify-center py-3.5 px-4 rounded-xl shadow-md text-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2 h-6 w-6" />
                  Xác nhận Trộn & Tải File ZIP
                </button>
              </div>

            </div>
          )}

        </div>

        {/* VÙNG THÔNG TIN QUY TẮC CHI TIẾT (GIỮ NGUYÊN BÊN DƯỚI) */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200 space-y-8">
          <div className="flex items-center border-b border-slate-100 pb-5">
            <Info className="h-7 w-7 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-slate-800">Tài liệu Đặc tả & Hướng dẫn làm sạch dữ liệu</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* CỘT 1 */}
            <div className="space-y-8">
              <div>
                <h4 className="flex items-center font-bold text-slate-800 mb-3 text-lg">
                  <FileWarning className="h-5 w-5 text-amber-500 mr-2" />
                  Làm sạch dữ liệu ban đầu
                </h4>
                <p className="text-sm text-slate-600 bg-amber-50 p-4 rounded-xl border border-amber-100 leading-relaxed">
                  Loại bỏ toàn bộ Header/Footer của file gốc, chỉ giữ lại nội dung lõi của đề thi để Parser xử lý chính xác nhất.
                </p>
              </div>

              <div>
                <h4 className="flex items-center font-bold text-slate-800 mb-3 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Cấu trúc 3 phần chuẩn 2025
                </h4>
                <div className="space-y-4 text-sm text-slate-700 bg-slate-50 p-5 rounded-xl border border-slate-100 leading-relaxed">
                  <div>
                    <strong className="text-blue-700">Phần I (Nhiều lựa chọn):</strong> Nhận diện qua <code className="bg-white px-1.5 py-0.5 rounded border">Câu X.</code>, đáp án <code className="bg-white px-1.5 py-0.5 rounded border">A., B., C., D.</code> Gạch chân hoặc bôi đỏ (màu cụ thể) để xác định đáp án đúng.
                  </div>
                  <div>
                    <strong className="text-blue-700">Phần II (Đúng/Sai):</strong> Các ý <code className="bg-white px-1.5 py-0.5 rounded border">a), b), c), d)</code> nằm dưới mỗi câu. Gạch chân để xác định câu đúng. <i>(Lưu ý: Tính năng hoán vị ý a,b,c,d đang cập nhật).</i>
                  </div>
                  <div>
                    <strong className="text-blue-700">Phần III (Trả lời ngắn):</strong> Kết quả đi sau chữ <code className="bg-white px-1.5 py-0.5 rounded border">A.</code> với độ dài tối đa 4 ký tự.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center font-bold text-slate-800 mb-3 text-lg">
                  <Tags className="h-5 w-5 text-blue-500 mr-2" />
                  Phân nhóm & Cấu hình trộn (&lt;gX#Y&gt;)
                </h4>
                <div className="space-y-4 text-sm text-slate-700 bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-relaxed">
                  <p>
                    <strong className="text-red-600">Tính năng ghim:</strong> Sử dụng dấu <code className="bg-white font-bold px-1.5 py-0.5 rounded border">#</code> trước các lựa chọn không muốn hoán vị (VD: <code className="bg-white px-1.5 py-0.5 rounded border">#C. Cả A và B đều đúng</code>). Thuật toán sẽ loại trừ nó khỏi mảng hoán vị.
                  </p>
                  <ul className="space-y-3 mt-3">
                    <li><span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">&lt;g3&gt; Trộn Full:</span> Hoán vị cả câu hỏi lẫn đáp án. Khuyến khích format lại thành list đáp án rời (mỗi đáp án 1 dòng).</li>
                    <li><span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">&lt;g2&gt; Chỉ trộn đáp án:</span> Giữ nguyên thứ tự câu, chỉ đảo vị trí A, B, C, D. Cực kỳ chuẩn xác cho bài đọc hiểu đục lỗ.</li>
                    <li><span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">&lt;g1&gt; Chỉ trộn câu:</span> Giữ nguyên thứ tự A, B, C, D.</li>
                    <li><span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">&lt;g0&gt; Đóng băng:</span> Không trộn gì cả. Dành cho bài nghe (phải theo thứ tự audio).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CỘT 2 */}
            <div>
              <h4 className="flex items-center font-bold text-red-600 mb-4 text-lg">
                <ShieldAlert className="h-6 w-6 mr-2" />
                8 "Red Flags" (Lỗi vi phạm định dạng)
              </h4>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200 space-y-4">
                <p className="text-sm text-red-800 font-semibold mb-3">
                  Cần bóc tách hoặc làm sạch trước khi tải lên. Nếu vi phạm, Parser sẽ bỏ qua hoặc sinh lỗi:
                </p>
                <ul className="text-sm text-slate-800 space-y-3.5 leading-relaxed">
                  <li><strong className="text-red-700">Lỗi 1 (Dữ liệu trong Table):</strong> Dữ liệu phải là text thuần. Các đáp án nằm trong bảng biểu (Table) của Word sẽ làm thuật toán đọc bị lỗi.</li>
                  <li><strong className="text-red-700">Lỗi 2 (Sai từ khóa Câu):</strong> Cú pháp bắt buộc là <code className="bg-white px-1 border rounded">Câu X.</code> hoặc <code className="bg-white px-1 border rounded">Câu X:</code>. Thiếu dấu câu hoặc chèn thêm ký tự phân loại (VD: Câu 1 (NB):) hệ thống sẽ không nhận diện được.</li>
                  <li><strong className="text-red-700">Lỗi 3 (Sai từ khóa Đáp án):</strong> Cú pháp bắt buộc là <code className="bg-white px-1 border rounded">A., B., C., D.</code> Thiếu dấu chấm (VD: B) hoặc dư khoảng trắng (VD: D .) đều làm fail thuật toán tách đáp án.</li>
                  <li><strong className="text-red-700">Lỗi 4 (Thiếu ngắt dòng nội bộ):</strong> Bắt buộc phải có ký tự xuống dòng (Enter) để tách biệt giữa nội dung câu hỏi và khối đáp án.</li>
                  <li><strong className="text-red-700">Lỗi 5 (Dính dòng giữa các câu):</strong> Bắt buộc phải Enter phân tách giữa đáp án cuối cùng của câu trước và từ khóa của câu sau. (Lỗi ảo ảnh thị giác trên Word).</li>
                  <li><strong className="text-red-700">Lỗi 6 (Auto-numbering):</strong> Không dùng tính năng đánh số tự động của MS Word. Thuật toán cần đọc các ký tự tĩnh gõ bằng tay.</li>
                  <li><strong className="text-red-700">Lỗi 7 (Nhận diện nhầm từ khóa):</strong> Các đơn vị như <code className="bg-white px-1 border rounded">A. (Ampe)</code>, đvC. hay tên riêng rất dễ đánh lừa thuật toán. Cách xử lý: Ép xuống dòng hoặc xóa dấu chấm.</li>
                  <li><strong className="text-red-700">Lỗi 8 (Hình ảnh lộn xộn):</strong> Bắt buộc mọi hình ảnh phải thiết lập chế độ <strong>Inline with Text</strong>. Nếu để floating, mã XML của ảnh sẽ trôi dạt, dẫn đến cắt dán mảng làm bay mất ảnh.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* VÙNG TÓM TẮT NHANH */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">Quy tắc Upload & Tính năng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="flex items-center font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4 mr-1.5" /> Chuẩn định dạng yêu cầu:
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                <li>Bắt đầu câu hỏi bằng <strong>Câu X:</strong> hoặc <strong>Question X:</strong></li>
                <li>Bắt đầu đáp án bằng <strong>A. B. C. D.</strong></li>
                <li>Hệ thống <strong>tự động dò đáp án đúng</strong> nếu chữ được bôi màu (Đỏ, Xanh...) hoặc gạch chân.</li>
                <li>Sử dụng thẻ <strong>&lt;g3&gt;</strong>, <strong>&lt;g3#1&gt;</strong> để nhóm các câu không đảo.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="flex items-center font-semibold text-amber-600">
                <AlertTriangle className="h-4 w-4 mr-1.5" /> Lưu ý & Hạn chế hiện tại:
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                <li><span className="font-medium">Nhiều đáp án trên 1 dòng:</span> Hệ thống sẽ <strong>bỏ qua việc hoán đổi A,B,C,D</strong> ở câu này để bảo vệ định dạng Tab và công thức. (Vị trí câu hỏi vẫn bị hoán đổi).</li>
                <li><span className="font-medium">Table (Bảng):</span> Không hỗ trợ đọc đáp án nếu bạn đưa A, B, C, D vào trong cấu trúc Table.</li>
                <li><span className="font-medium">Hình ảnh bị trôi:</span> Nhớ bấm phím Enter để hình ảnh nằm riêng một dòng độc lập với chữ.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
