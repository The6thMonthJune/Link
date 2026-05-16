import { useState } from "react";

interface CalendarProps {
  onclickDate: (date: Date) => void;
}

function Calendar({ onclickDate}: CalendarProps) {

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);

    const getWeekDates = () => {
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay()); // 이번 주 일요일

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(sunday);
            date.setDate(sunday.getDate() + i);
            return date;
        });
    };

    // --- 이번 달 전체 배열 ---------------
    const getMonthDates = () => {
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 이번 달 1일의 요일
        const totalDaysOfMonth = new Date(year, month + 1, 0).getDate(); // 이번 달의 마지막 날짜

        const blanks = Array.from({ length: firstDayOfMonth }, () => null); // 1일 전 빈 칸
        const days = Array.from({ length: totalDaysOfMonth }, (_, i) => new Date(year, month, i + 1)); // 이번 달 날짜

        return [...blanks, ...days];
    }

    const dates = isExpanded ? getMonthDates() : getWeekDates();
 
  return (
        <div onClick={() => setIsExpanded(!isExpanded)} className={`w-full h-[200px] rounded-lg bg-[#FFFFFF] p-4 ${isExpanded ? 'h-auto' : 'h-[200px]'} transition-all duration-300 ease-in-out overflow-hidden`}>
            
            {/* 헤더 — 항상 표시 */}
            <div className="grid grid-cols-7 text-center text-sm mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 text-center text-sm">
               {dates.map((date, i) => (
                    <div key = {i}
                    className={`py-1 rounded-full 
                    ${date && date.toDateString() === today.toDateString() ? 'bg-primary text-white' : 'hover:bg-gray-200'}
                    `}
                    >
                        {date ? date.getDate() : ''}
                    </div>
                ))}
            </div>

            {/* 확장/축소 표시 인디케이터 (선택) */}

        </div>
  );
}

export default Calendar;