import { useState, useEffect } from 'react';

export default function EventModal({ isOpen, onClose, selectedDate, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        category: '일반'
    });

    useEffect(() => {
        if (isOpen && selectedDate) {
            // Set default start and end times based on the clicked date
            // Assuming selectedDate is a YYYY-MM-DD string
            setFormData({
                title: '',
                description: '',
                start_time: `${selectedDate}T09:00`,
                end_time: `${selectedDate}T10:00`,
                category: '일반'
            });
        }
    }, [isOpen, selectedDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
                <div className="border-b border-slate-200/50 bg-white/50 px-6 py-4 dark:border-white/5 dark:bg-slate-800/50">
                    <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">새 일정 추가</h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">캘린더에 새로운 이벤트를 등록합니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">일정 제목 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="생일 파티, 주간 회의..."
                                className="w-full rounded-xl border border-slate-200/80 bg-white/50 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">시작 일시 <span className="text-red-500">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="start_time"
                                    required
                                    value={formData.start_time}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200/80 bg-white/50 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">종료 일시 <span className="text-red-500">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="end_time"
                                    required
                                    value={formData.end_time}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200/80 bg-white/50 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">카테고리</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200/80 bg-white/50 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100"
                            >
                                <option value="일반">일반</option>
                                <option value="업무">업무</option>
                                <option value="개인">개인</option>
                                <option value="취미">취미</option>
                                <option value="중요">중요</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-600 dark:text-slate-300">상세 내용</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="AI 컴패니언이 분석할 수 있는 추가 문맥을 적어주세요."
                                className="w-full resize-none rounded-xl border border-slate-200/80 bg-white/50 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
                        >
                            저장하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
