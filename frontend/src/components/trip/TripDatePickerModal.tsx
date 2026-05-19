import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
        const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
        const next = Array.from({ length: remaining }, (_, i) => ({
            date: new Date(year, month + 1, i + 1),
            isCurrentMonth: false,
        }));

        return [...prev, ...current, ...next];
    };

    const handleDateClick = (date: Date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else {
            if (date < startDate) {
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    const isStart = (date: Date) => startDate?.toDateString() === date.toDateString();
    const isEnd = (date: Date) => endDate?.toDateString() === date.toDateString();
    const isInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    const formatDate = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

    if (!isOpen) return null;

    return (
        <>
            <div className='fixed inset-0 bg-black/50 z-[60]' onClick={onClose} />

            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] bg-white rounded-t-2xl z-[70] px-6 py-6'>

                <button onClick={onClose} className='absolute top-4 right-4'>
                    <X size={20} />
                </button>

                <div className='text-center mb-6'>
                    <p className='text-[16px] font-semibold'>
                        <span className='text-primary'>여행 기간</span>을 선택해 주세요
                    </p>
                    <p className='text-[12px] text-text-muted mt-1'>기간은 나중에 수정 할 수 있어요</p>
                </div>

                <div className='flex flex-row justify-between items-center mb-4'>
                    <p className='font-semibold text-[14px]'>
                        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                    </p>
                    <div className='flex flex-row gap-2'>
                        <button onClick={prevMonth}><ChevronLeft size={20} /></button>
                        <button onClick={nextMonth}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className='grid grid-cols-7 text-center text-[12px] mb-2 text-text-on-bg'>
                    {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className='grid grid-cols-7 text-center text-[14px]'>
                    {getMonthDates().map((item, i) => (
                        <button key={i}
                            onClick={() => item.isCurrentMonth && handleDateClick(item.date)}
                            className={`py-2 rounded-full
                                ${!item.isCurrentMonth ? 'text-text-muted' : ''}
                                ${isStart(item.date) || isEnd(item.date) ? 'bg-primary text-white' : ''}
                                ${isInRange(item.date) ? 'bg-primary/20 rounded-none' : ''}
                            `}>
                            {item.date.getDate()}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => startDate && endDate && onConfirm(startDate, endDate)}
                    disabled={!startDate || !endDate}
                    className='w-full mt-6 py-3 bg-primary text-white rounded-full disabled:opacity-40'>
                    {startDate && endDate
                        ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
                        : '날짜를 선택해 주세요'}
                </button>

            </div>
        </>
    );
}

export default TripDatePickerModal;
