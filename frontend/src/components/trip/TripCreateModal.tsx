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

function TripCreateModal({ isOpen, onClose }: TripCreateModalProps) {
    const [step, setStep] = useState(1);
    const [tripData, setTripData] = useState<TripData>({
        name: '',
        startDate: null,
        endDate: null,
        members: [],
    });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const formatDate = (date: Date) => `${date.getMonth() + 1}.${date.getDate()}`

    useEffect(() => {
        if (step !== 1) return;
        const timer = setTimeout(() => nextStep(), 5000);
        return () => clearTimeout(timer);
    }, [step]);


    if (!isOpen) return null;

    return (
        <>
            <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />

            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[391px] bg-white rounded-t-2xl z-50 px-[20px] pt-6 pb-10 min-h-[70vh] flex flex-col'>

                {/* 헤더 */}
                <div className='relative flex flex-row items-center h-10 mb-8'>
                    {step >= 1 && (
                        <button onClick={step === 1 ? onClose : prevStep}>
                            <ChevronLeft size={44} className='text-icon-primary' />
                        </button>
                    )}
                    {step === 5 && (
                        <p className='absolute w-full text-center font-semibold text-[16px] pointer-events-none'>링크 생성</p>
                    )}
                </div>

                {/* 콘텐츠 */}
                <div className='flex flex-col items-center flex-1'>

                    {/* Step 1: 대기화면 */}
                    {step === 1 && (
                        <div className='flex flex-col items-center gap-6 mt-8' onClick={nextStep}>
                            <img src={bluestar} alt=""
                                className='absolute right-[52px] top-[199px] w-[130px] rotate-[23.5deg] animate-[starFloat_3s_ease_in_out_infinite]'/>
                            <p className='absolute top-[381px] text-[20px] font-semibold animate-[fadeIn_1s_ease-in-out]'>
                                소중한 사람과 함께 <span className='text-primary'>링크</span>하기
                            </p>
                            <img src={redstar} alt="" 
                                className='absolute left-[54px] top-[378px] w-[100px] -rotate-[21.05deg] animate-[starFloat_3s_ease_in_out_infinite]'/>
                        </div>
                    )}

                    {/* Step 2: 여행 이름 입력 */}
                    {step === 2 && (
                        <div className='flex flex-col items-center gap-6 w-full'>
                            <img src={bluestar} alt="" className='w-[80px]' />
                            <p className='text-[16px] font-semibold'>
                                <span className='text-primary'>여행의 이름</span>을 작성해 주세요
                            </p>
                            <img src={redstar} alt="" className='w-[50px]' />
                            <input
                                value={tripData.name}
                                onChange={(e) => setTripData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder='여기 부산 여행'
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none'
                            />
                            <button
                                onClick={nextStep}
                                disabled={!tripData.name}
                                className='w-full py-3 bg-primary text-white rounded-full disabled:opacity-40'>
                                다음
                            </button>
                        </div>
                    )}

                    {/* Step 3: 날짜 선택 */}
                    {step === 3 && (
                        <div className='flex flex-col items-center gap-6 w-full'>
                            <img src={bluestar} alt="" className='w-[80px]' />
                            <p className='text-[16px] font-semibold'>
                                <span className='text-primary'>여행 날짜</span>를 선택해 주세요
                            </p>
                            <img src={redstar} alt="" className='w-[50px]' />
                            <button
                                onClick={() => setIsDatePickerOpen(true)}
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-left'>
                                {tripData.startDate && tripData.endDate
                                    ? `${formatDate(tripData.startDate)} ~ ${formatDate(tripData.endDate)}`
                                    : '날짜 선택'}
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={!tripData.startDate || !tripData.endDate}
                                className='w-full py-3 bg-primary text-white rounded-full disabled:opacity-40'>
                                다음
                            </button>
                        </div>
                    )}

                    {/* Step 4: 멤버 추가 */}
                    {step === 4 && (
                        <div className='flex flex-col items-center gap-6 w-full'>
                            <img src={bluestar} alt="" className='w-[80px]' />
                            <p className='text-[16px] font-semibold'>
                                <span className='text-primary'>여행 멤버</span>를 추가해 주세요
                            </p>
                            <img src={redstar} alt="" className='w-[50px]' />
                            <button
                                onClick={() => setIsMemberModalOpen(true)}
                                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-text-muted text-left'>
                                멤버 추가하기
                            </button>
                            <button
                                onClick={nextStep}
                                className='w-full py-3 bg-primary text-white rounded-full'>
                                다음
                            </button>
                        </div>
                    )}

                    {/* Step 5: 요약 */}
                    {step === 5 && (
                        <div className='flex flex-col items-center gap-6 w-full'>
                            <img src={bluestar} alt="" className='w-[80px]' />
                            <p className='text-[16px] font-semibold'>
                                <span className='text-primary'>여행</span>을 생성할까요?
                            </p>
                            <img src={redstar} alt="" className='w-[50px]' />
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

                {/* 하단 progress bar */}
                {step > 1 && (
                    <div className='flex flex-row gap-1 mt-6'>
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i < step - 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                )}
            </div>

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

            {isMemberModalOpen && (
                <div>{/* TripMemberModal — 나중에 */}</div>
            )}
        </>
    );
}

export default TripCreateModal;