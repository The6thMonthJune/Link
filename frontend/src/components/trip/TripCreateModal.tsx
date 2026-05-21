import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import TripDatePickerModal from './TripDatePickerModal';
import bluestar from '../../assets/1blue.png';
import redstar from '../../assets/1red.png';

interface TripCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TripData = {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    members: string[];
};

// step 1~4에서 공통으로 쓰는 레이아웃 컴포넌트
// 별 위치와 제목 위치가 모든 step에서 동일하므로 여기서 한 번에 관리
// children에는 각 step의 입력창/버튼 등이 들어옴
function StepLayout({ title, children, onClick }: {
    title: React.ReactNode;   // JSX를 title로 받아야 <span>으로 특정 단어 색상 적용 가능
    children?: React.ReactNode;
    onClick?: () => void;     // step 1에서 화면 전체 클릭 시 다음 단계로 넘어가기 위해 사용
}) {
    return (
        // w-full: 부모 너비 전체 차지. onClick은 step 1에서만 전달됨
        <div className='w-full' onClick={onClick}>
            {/* 파란 별: absolute로 모달 컨테이너 기준 고정 위치에 배치
                rotate-[23.5deg]: 피그마 디자인 각도
                animate-[starFloat_3s_ease-in-out_infinite]: index.css에 정의한 위아래 부유 애니메이션 */}
            <img src={bluestar} alt=""
                className='absolute right-[52px] top-[199px] w-[130px] rotate-[23.5deg] animate-[starFloat_3s_ease-in-out_infinite]' />

            {/* 제목 텍스트: absolute로 고정 위치
                left-0 right-0 text-center: absolute 상태에서 가로 중앙 정렬하는 방법
                (left-0 right-0으로 너비를 부모 전체로 만들고 text-center로 텍스트 정렬) */}
            <p className='absolute top-[381px] left-0 right-0 text-center text-[20px] font-semibold'>{title}</p>

            {/* 빨간 별: 파란 별보다 0.8초 늦게 애니메이션 시작해서 엇박자 효과
                style의 animationDelay는 Tailwind로 표현할 수 없어서 인라인 스타일 사용 */}
            <img src={redstar} alt=""
                className='absolute left-[54px] top-[390px] w-[100px] -rotate-[21.05deg] animate-[starFloat_3s_ease-in-out_infinite]'
                style={{ animationDelay: '0.8s' }}
            />
            {children}
        </div>
    );
}

function TripCreateModal({ isOpen, onClose }: TripCreateModalProps) {
    const [step, setStep] = useState(1);
    // 여행 생성에 필요한 모든 데이터를 하나의 객체로 관리
    const [tripData, setTripData] = useState<TripData>({
        name: '',
        startDate: null,
        endDate: null,
        members: [],
    });
    // 중첩 바텀시트 모달들의 열림/닫힘 상태
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

    const nextStep = () => setStep((s) => s + 1);
    // Math.max로 step이 1 아래로 내려가지 않도록 방어
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    // 날짜를 "월.일" 형식으로 변환하는 유틸 함수
    const formatDate = (date: Date) => `${date.getMonth() + 1}.${date.getDate()}`

    // step 1 (대기화면)에서 5초 후 자동으로 step 2로 이동
    // step이 바뀔 때마다 실행되지만 step !== 1이면 바로 return
    // return의 clearTimeout: 컴포넌트가 사라지거나 step이 바뀌면 타이머 정리 (메모리 누수 방지)
    useEffect(() => {
        if (step !== 1) return;
        const timer = setTimeout(() => nextStep(), 5000);
        return () => clearTimeout(timer);
    }, [step]);

    // isOpen이 false면 아무것도 렌더링하지 않음 (모달 닫힌 상태)
    // 단, hooks는 이 조건 위에 있어야 함 (React 규칙: hooks는 조건부 return 이전에 호출)
    if (!isOpen) return null;

    return (
        <>
            {/* 배경 오버레이: 모달 뒤를 어둡게 처리
                fixed inset-0: 화면 전체를 덮음
                bg-black/50: 검정 50% 투명도
                z-40: 일반 콘텐츠 위, 모달 아래 */}
            <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />

            {/* 메인 바텀시트
                fixed bottom-0: 화면 하단에 고정
                left-1/2 -translate-x-1/2: fixed 요소를 가로 중앙에 정렬하는 방법
                  (left-1/2로 왼쪽 끝을 중앙으로 옮기고, -translate-x-1/2로 자기 너비의 절반만큼 왼쪽으로 당김)
                z-50: 오버레이(z-40) 위에 표시
                min-h-[70vh]: 최소 높이로 화면의 70%를 차지
                flex flex-col: 헤더/콘텐츠/progress bar를 세로로 배치 */}
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[391px] bg-white rounded-t-2xl z-50 px-[20px] pt-6 pb-10 min-h-[70vh] flex flex-col'>

                {/* 헤더 영역: 뒤로가기 버튼 + step 5의 "링크 생성" 타이틀 */}
                <div className='relative flex flex-row items-center h-10 mb-8'>
                    {/* step 1: 모달 닫기 / step 2 이상: 이전 단계로 이동 */}
                    {step >= 1 && (
                        <button onClick={step === 1 ? onClose : prevStep}>
                            <ChevronLeft size={44} className='text-icon-primary' />
                        </button>
                    )}
                    {/* step 5에서만 중앙에 타이틀 표시
                        absolute w-full text-center: 헤더 div 기준으로 가로 중앙 정렬
                        pointer-events-none: 텍스트가 버튼 클릭을 방해하지 않도록 */}
                    {step === 5 && (
                        <p className='absolute w-full text-center font-semibold text-[16px] pointer-events-none'>링크 생성</p>
                    )}
                </div>

                {/* 콘텐츠 영역: flex-1로 남은 공간을 모두 차지 */}
                <div className='flex flex-col items-center flex-1'>

                    {/* Step 1: 대기화면 — 화면 클릭 시 또는 5초 후 자동으로 step 2 이동 */}
                    {step === 1 && (
                        <StepLayout onClick={nextStep}
                            // animate-[fadeIn_1s_ease-in-out]: 텍스트만 페이드인 효과 (별은 항상 보임)
                            title={<span className='animate-[fadeIn_1s_ease-in-out]'>소중한 사람과 함께 <span className='text-primary'>링크</span>하기</span>} />
                    )}

                    {/* Step 2: 여행 이름 입력 */}
                    {step === 2 && (
                        <StepLayout onClick={nextStep}
                            title={<><span className='text-primary'>여행의 이름</span>을 작성해 주세요</>}>
                            {/* absolute top-[610px]: 별/텍스트 아래 고정 위치에 입력창 배치
                                outline-none: 포커스 시 기본 파란 테두리 제거 */}
                            <input
                                value={tripData.name}
                                onChange={(e) => setTripData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder='예) 부산 여행'
                                className='absolute top-[610px] w-[321px] h-[60px] border border-gray-200 px-4 py-3 text-[14px] text-left outline-none'
                            />
                            {/* disabled:opacity-40: 이름 미입력 시 버튼 흐리게 표시 */}
                            <button onClick={nextStep} disabled={!tripData.name}
                                className='absolute top-[700px] w-[321px] py-3 bg-primary text-white rounded-full disabled:opacity-40'>
                                다음
                            </button>
                        </StepLayout>
                    )}

                    {/* Step 3: 날짜 선택 버튼 — 클릭 시 TripDatePickerModal 열림 */}
                    {step === 3 && (
                        <StepLayout title={<><span className='text-primary'>여행 날짜</span>를 선택해 주세요</>}>
                            {/* 날짜 선택 전: "날짜 선택" 텍스트 / 선택 후: 선택된 날짜 범위 표시 */}
                            <button onClick={() => setIsDatePickerOpen(true)}
                                className='absolute top-[610px] w-[321px] border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-left'>
                                {tripData.startDate && tripData.endDate
                                    ? `${formatDate(tripData.startDate)} ~ ${formatDate(tripData.endDate)}`
                                    : '날짜 선택'}
                            </button>
                            {/* 날짜 미선택 시 비활성화 */}
                            <button onClick={nextStep} disabled={!tripData.startDate || !tripData.endDate}
                                className='absolute top-[700px] w-[321px] py-3 bg-primary text-white rounded-full disabled:opacity-40'>
                                다음
                            </button>
                        </StepLayout>
                    )}

                    {/* Step 4: 멤버 추가 — 클릭 시 TripMemberModal 열림 (미구현) */}
                    {step === 4 && (
                        <StepLayout title={<><span className='text-primary'>여행 멤버</span>를 추가해 주세요</>}>
                            <button onClick={() => setIsMemberModalOpen(true)}
                                className='absolute top-[610px] w-[321px] border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-text-muted text-left'>
                                멤버 추가하기
                            </button>
                            <button onClick={nextStep}
                                className='absolute top-[700px] w-[321px] py-3 bg-primary text-white rounded-full'>
                                다음
                            </button>
                        </StepLayout>
                    )}

                    {/* Step 5: 최종 요약 화면 — 입력한 정보 확인 및 생성 */}
                    {step === 5 && (
                        <div className='flex flex-col items-center gap-6 w-full'>
                            <img src={bluestar} alt="" className='w-[80px]' />
                            <p className='text-[16px] font-semibold'>
                                <span className='text-primary'>여행</span>을 생성할까요?
                            </p>
                            <img src={redstar} alt="" className='w-[50px]' />
                            {/* 각 항목의 "변경하기" 버튼으로 해당 step으로 직접 이동 */}
                            <div className='w-full flex flex-col gap-3'>
                                <div className='flex flex-row justify-between items-center border border-gray-200 rounded-lg px-4 py-3'>
                                    <p className='text-[14px]'>✏️ {tripData.name}</p>
                                    <button onClick={() => setStep(2)} className='text-[12px] text-text-muted'>변경하기</button>
                                </div>
                                <div className='flex flex-row justify-between items-center border border-gray-200 rounded-lg px-4 py-3'>
                                    <p className='text-[14px]'>
                                        📅 {tripData.startDate && tripData.endDate
                                            ? `${formatDate(tripData.startDate)} ~ ${formatDate(tripData.endDate)}`
                                            : '미선택'}
                                    </p>
                                    <button onClick={() => setStep(3)} className='text-[12px] text-text-muted'>변경하기</button>
                                </div>
                                <div className='flex flex-row justify-between items-center border border-gray-200 rounded-lg px-4 py-3'>
                                    <p className='text-[14px]'>👤 나 외 {tripData.members.length}명</p>
                                    <button onClick={() => setStep(4)} className='text-[12px] text-text-muted'>변경하기</button>
                                </div>
                            </div>
                            <button onClick={onClose} className='w-full py-3 bg-primary text-white rounded-full'>
                                생성하기
                            </button>
                        </div>
                    )}
                </div>

                {/* 하단 progress bar: step 2부터 표시 (step 1은 대기화면이라 숨김)
                    Array.from({ length: 4 }): 4칸짜리 배열 생성
                    i < step - 1: 현재 step보다 이전 칸은 primary 색, 이후 칸은 회색 */}
                {step > 1 && (
                    <div className='flex flex-row gap-1 mt-6'>
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i < step - 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* 날짜 선택 중첩 모달: z-[60]/z-[70]으로 메인 모달(z-40/z-50) 위에 표시
                onConfirm: 날짜 확정 시 tripData 업데이트 후 모달 닫고 다음 step으로 이동 */}
            {isDatePickerOpen && (
                <TripDatePickerModal
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    onConfirm={(start, end) => {
                        setTripData((prev) => ({ ...prev, startDate: start, endDate: end }));
                        setIsDatePickerOpen(false);
                        nextStep();
                    }}
                />
            )}

            {/* 멤버 추가 중첩 모달 (미구현) */}
            {isMemberModalOpen && (
                <div>{/* TripMemberModal — 나중에 */}</div>
            )}
        </>
    );
}

export default TripCreateModal;
