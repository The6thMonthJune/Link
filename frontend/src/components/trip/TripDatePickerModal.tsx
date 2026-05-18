import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TripDatePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (startDate: Date, endDate: Date) => void;
}   

function TripDatePickerModal({ isOpen, onClose, onConfirm }: TripDatePickerModalProps) {
    
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const prevMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const getMonthDates = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevLast = new Date(year, month, 0).getDate();

        const prev = Array.from({ length: firstDay }, (_, i) => ({
            date: new Date(year, month - 1, prevLast - firstDay + i + 1),
            isCurrentMonth: false,
        }));

        const current = Array.from({ length: totalDays }, (_, i) => ({
            date: new Date(year, month, i + 1),
            isCurrentMonth: true,
        }));

        const total = prev.length + current.length;
        const remaining = total & 7 === 0 ? 0 : 7 - (total % 7);
        const next = Array.from({length: remaining}, (_, i) => ({
            date: new Date(year, month + 1, i + 1),
            isCurrentMonth: false,
        }));

        return [...prev, ...current, ...next];
        };

        const isStart = (date: Date) => startDate?.toDateString() === date.toDateString();
        const isEnd = (date: Date) => endDate?.toDateString() === date.toDateString();
        const isInRange = (date: Date) => {
            if (!startDate || !endDate) return false;
            return date > startDate && date < endDate;
        };

        const formatDate = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

        if (!isOpen) return null;

        return(
            <>
                <div className='fixed inset-0 bg-black/50 z-[60px]' onClick={onClose} />

                <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[391px] bg-white rounded-t-2xl z-[70px] px-6 py-6'>
                    <button onClick={onClose} className='absolute top-4 right-4'>
                        <X size={20} />
                    </button>

                    <div className='text-center mb-6'>
                        <p className='text-[16px] font-semibold'>
                            <span className='text-primary'>여행 기간</span>을 선택해주세요    
                        </p>
                        <p className='text-[12px] text-text-muted mt-1'>기간은 나중에 수정 할 수 있어요 </p>
                    </div>
                </div>
            </>
        )
    }
