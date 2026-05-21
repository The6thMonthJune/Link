import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TripDatePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    // 날짜 확정 시 부모(TripCreateModal)에 선택된 시작/종료일을 전달하는 콜백
    onConfirm: (startDate: Date, endDate: Date) => void;
}

function TripDatePickerModal({ isOpen, onClose, onConfirm }: TripDatePickerModalProps) {

    // 현재 보고 있는 달 (월 이동 버튼으로 변경됨)
    const [currentMonth, setCurrentMonth] = useState(new Date());
    // 날짜 범위 선택 상태: 시작일과 종료일
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // new Date(year, month - 1, 1): 이전 달 1일로 이동
    // new Date(year, month + 1, 1): 다음 달 1일로 이동
    const prevMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    // 캘린더 그리드에 표시할 날짜 배열을 생성하는 함수
    // 7열 그리드이므로 이전 달 / 현재 달 / 다음 달 날짜로 빈칸을 채워서 총 7의 배수 개수로 반환
    const getMonthDates = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // 이번 달 1일이 무슨 요일인지 (0=일, 1=월, ..., 6=토)
        // 이 값이 곧 1일 앞에 채워야 할 이전 달 날짜 개수
        const firstDay = new Date(year, month, 1).getDay();

        // 이번 달의 마지막 날짜 (28~31)
        // new Date(year, month + 1, 0): 다음 달 0일 = 이번 달 마지막 날
        const totalDays = new Date(year, month + 1, 0).getDate();

        // 이전 달의 마지막 날짜 (이전 달 빈칸에 표시할 날짜 계산용)
        // new Date(year, month, 0): 이번 달 0일 = 이전 달 마지막 날
        const prevLast = new Date(year, month, 0).getDate();

        // 이전 달 날짜: 1일 앞 빈칸을 채움 (isCurrentMonth: false → 흐리게 표시, 클릭 불가)
        const prev = Array.from({ length: firstDay }, (_, i) => ({
            date: new Date(year, month - 1, prevLast - firstDay + i + 1),
            isCurrentMonth: false,
        }));

        // 이번 달 날짜: 1일부터 마지막 날까지 (isCurrentMonth: true → 클릭 가능)
        const current = Array.from({ length: totalDays }, (_, i) => ({
            date: new Date(year, month, i + 1),
            isCurrentMonth: true,
        }));

        // 이전 달 + 이번 달 합산 후, 7의 배수가 되도록 다음 달 날짜로 나머지 채움
        const total = prev.length + current.length;
        const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
        const next = Array.from({ length: remaining }, (_, i) => ({
            date: new Date(year, month + 1, i + 1),
            isCurrentMonth: false,
        }));

        return [...prev, ...current, ...next];
    };

    // 날짜 클릭 시 범위 선택 로직
    // 상태 머신: (시작일 없음 또는 이미 범위 완성) → 시작일 설정 → 종료일 설정
    const handleDateClick = (date: Date) => {
        if (!startDate || (startDate && endDate)) {
            // 아직 시작일이 없거나, 이미 범위가 완성된 상태 → 새 시작일 설정
            setStartDate(date);
            setEndDate(null);
        } else {
            // 시작일만 있는 상태 → 종료일 설정
            if (date < startDate) {
                // 시작일보다 이전 날짜를 클릭하면 시작일을 교체 (종료일은 그대로 null)
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    // 특정 날짜가 시작일/종료일/범위 내인지 확인하는 헬퍼 함수
    // toDateString()으로 비교: 시간 정보 없이 날짜만 비교 (예: "Thu Jul 10 2025")
    const isStart = (date: Date) => startDate?.toDateString() === date.toDateString();
    const isEnd = (date: Date) => endDate?.toDateString() === date.toDateString();
    const isInRange = (date: Date) => {
        if (!startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    // 확정 버튼에 표시할 날짜 텍스트: "7월 15일" 형식
    const formatDate = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

    // isOpen이 false면 아무것도 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <>
            {/* 중첩 배경 오버레이: 메인 모달(z-40) 위에 표시되도록 z-[60]
                클릭 시 날짜 선택 모달만 닫힘 (메인 TripCreateModal은 유지) */}
            <div className='fixed inset-0 bg-black/50 z-[60]' onClick={onClose} />

            {/* 중첩 바텀시트: 메인 모달(z-50) 위에 표시되도록 z-[70]
                left-1/2 -translate-x-1/2: fixed 요소를 가로 중앙에 정렬하는 방법 */}
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] bg-white rounded-t-2xl z-[70] px-6 py-6'>

                {/* 우측 상단 X 버튼: absolute로 시트 내 고정 위치에 배치 */}
                <button onClick={onClose} className='absolute top-4 right-4'>
                    <X size={20} />
                </button>

                {/* 헤더: 제목 + 안내 문구 */}
                <div className='text-center mb-6'>
                    <p className='text-[16px] font-semibold'>
                        <span className='text-primary'>여행 기간</span>을 선택해 주세요
                    </p>
                    <p className='text-[12px] text-text-muted mt-1'>기간은 나중에 수정 할 수 있어요</p>
                </div>

                {/* 월 이동 헤더: 현재 년/월 텍스트 + 이전/다음 버튼 */}
                <div className='flex flex-row justify-between items-center mb-4'>
                    <p className='font-semibold text-[14px]'>
                        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                    </p>
                    <div className='flex flex-row gap-2'>
                        <button onClick={prevMonth}><ChevronLeft size={20} /></button>
                        <button onClick={nextMonth}><ChevronRight size={20} /></button>
                    </div>
                </div>

                {/* 요일 헤더: 7열 grid로 일~토 표시 */}
                <div className='grid grid-cols-7 text-center text-[12px] mb-2 text-text-on-bg'>
                    {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                {/* 날짜 그리드: getMonthDates()로 만든 배열을 7열 grid로 표시 */}
                <div className='grid grid-cols-7 text-center text-[14px]'>
                    {getMonthDates().map((item, i) => (
                        // relative: 내부의 absolute 배경 밴드와 z-10 버튼의 기준점
                        <div key={i} className='relative py-2'>

                            {/* 날짜 범위 배경 밴드 레이어
                                endDate가 있을 때만 표시 (범위가 완성된 경우에만)
                                시작일: 셀의 오른쪽 절반만 채움 (left-1/2 right-0)
                                종료일: 셀의 왼쪽 절반만 채움 (left-0 right-1/2)
                                범위 내: 셀 전체를 채움 (left-0 right-0)
                                → 시작일과 종료일 사이가 연결된 띠처럼 보임 */}
                            {(isStart(item.date) || isEnd(item.date) || isInRange(item.date)) && endDate &&(
                                <div className={`absolute top-1/2 -translate-y-1/2 h-[30px] bg-[#B8CCFF]
                                ${isStart(item.date) ? 'left-1/2 right-0' : ''}
                                ${isEnd(item.date) ? 'left-0 right-1/2' : ''}
                                ${isInRange(item.date) ? 'left-0 right-0' : ''}
                                `} />
                            )}

                            {/* 날짜 원 버튼
                                relative z-10: 위의 배경 밴드(absolute) 위에 표시되도록 z-index 설정
                                w-[30px] h-[30px] rounded-full: 원형 버튼
                                mx-auto: 셀 내 가로 중앙 정렬
                                isCurrentMonth가 false면 클릭 막음 (이전/다음 달 날짜는 선택 불가) */}
                            <button key={i}
                                onClick={() => item.isCurrentMonth && handleDateClick(item.date)}
                                className={`relative z-10 w-[30px] h-[30px] rounded-full mx-auto flex items-center justify-center
                                ${!item.isCurrentMonth ? 'text-text-muted' : ''}
                                ${isStart(item.date) || isEnd(item.date) ? 'bg-primary text-white' : ''}
                            `}>
                                {item.date.getDate()}
                            </button>
                        </div>
                    ))}
                </div>

                {/* 확정 버튼
                    날짜 미선택 시 disabled:opacity-40으로 흐리게 표시
                    날짜 선택 완료 시: "7월 15일 ~ 7월 20일" 형식으로 텍스트 변경
                    onConfirm: 부모에 시작/종료일 전달 → TripCreateModal에서 tripData 업데이트 후 다음 step 이동 */}
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
