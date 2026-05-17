import { useState, useRef, useEffect } from "react";

interface CalendarProps {
    onclickDate: (date: Date) => void;
    isExpanded: boolean;
    onExpandChange: (expanded: boolean) => void;
}

function Calendar({ onclickDate, isExpanded, onExpandChange }: CalendarProps) {

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const startYRef = useRef<number | null>(null);  // useState 대신 useRef — 클로저 stale 방지
    const isExpandedRef = useRef(false);            // useEffect 안에서 최신값 참조용

    const SWIPE_THRESHOLD = 30;

    const handleDragStart = (y: number) => {
        startYRef.current = y;
    };

    const handleDragEnd = (y: number) => {
        if (startYRef.current === null) return;
        const deltaY = y - startYRef.current;
        if (deltaY > SWIPE_THRESHOLD && !isExpandedRef.current) {
            onExpandChange(true);
            isExpandedRef.current = true;
        }
        if (deltaY < -SWIPE_THRESHOLD && isExpandedRef.current) {
            onExpandChange(false);
            isExpandedRef.current = false;
        }
        startYRef.current = null;
    };

    useEffect(() => {
        const onMouseUp = (e: MouseEvent) => handleDragEnd(e.clientY);
        const onTouchEnd = (e: TouchEvent) => handleDragEnd(e.changedTouches[0].clientY);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, []);


    // --- 이번 달 전체 배열 ---------------
    const getMonthDates = () => {
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysOfMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const prevDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
            date: new Date(year, month - 1, prevMonthLastDay - firstDayOfMonth + i + 1),
            isCurrentMonth: false,
        }));

        const currentDays = Array.from({ length: totalDaysOfMonth }, (_, i) => ({
            date: new Date(year, month, i + 1),
            isCurrentMonth: true,
        }));

        const total = prevDays.length + currentDays.length;
        const remainingCells = total % 7 === 0 ? 0 : 7 - (total % 7);  // reamainingCells 오타도 수정
        const nextDays = Array.from({ length: remainingCells }, (_, i) => ({
            date: new Date(year, month + 1, i + 1),
            isCurrentMonth: false,
        }));

        return [...prevDays, ...currentDays, ...nextDays];
    };


    const getWeekDates = () => {
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(sunday);
            date.setDate(sunday.getDate() + i);
            return { date, isCurrentMonth: true };  // 객체로 변경
        });
    };


    const dates = isExpanded ? getMonthDates() : getWeekDates();

    return (
        <div
            draggable={false}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
            onMouseDown={(e) => handleDragStart(e.clientY)}
            onDragStart={(e) => e.preventDefault()}
            className={`w-full rounded-lg p-4 select-none overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[600px]' : 'max-h-[200px]'}`}
        >

            {/* 헤더 — 항상 표시 */}
            <div className="grid grid-cols-7 text-center text-[12px] mb-2 gap-6 text-text-on-bg">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="font-medium text-text-on-bg">
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 text-center text-[14px] gap-6 font-semibold text-text-primary">
                {dates.map((item, i) => (
                    <div key={i}
                        className={`py-1 rounded-full
                            ${item.date.toDateString() === today.toDateString() ? 'bg-secondary text-white' : ''}
                            ${!item.isCurrentMonth ? 'text-text-muted font-normal' : ''}
                        `}
                    >
                        {item.date.getDate()}
                    </div>
                ))}
            </div>

            {/* 확장/축소 표시 인디케이터 (선택) */}

        </div>
    );
}

export default Calendar;