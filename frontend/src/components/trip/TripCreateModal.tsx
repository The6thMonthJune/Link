import { useState } from 'react';
import TripDatePickerModal from './TripDatePickerModal';

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

    if (!isOpen) return null;

    return (
        <>
            {/* 모달 오버레이 */}
            <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />

            {/* 메인 바텀 시트 */}
            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[391px] max-h-[808px] bg-white rounded-t-2xl z-50 px-6 py-8'>

                {step === 1 && (
                    <div>
                        {/* TODO: 대기화면 */}
                        <button onClick={nextStep}>다음</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        {/* TODO 여행 이름 선택 */}
                        <input value={tripData.name} onChange={(e) => setTripData((prev) => ({ ...prev, name: e.target.value }))} />
                        <button onClick={nextStep}> 다음 </button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        {/* TODO: 날짜 선택 화면 */}
                        <button onClick = {() => setIsDatePickerOpen(true)}>날짜 선택</button>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        {/* TODO: 맴버 추가 버튼 */}
                        <button onClick={() => setIsMemberModalOpen(true)}>맴버 추가</button>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        {/* TODO: 최종 확인 화면 */}
                        <p>{tripData.name}</p>
                        <button onClick={onClose}> 생성하기 </button>
                    </div>
                )}

                {/* 맵버 추가 중첩 바텀시트 */}
                {isMemberModalOpen && (
                    <div> {/* TripMemberModal - 나중에 import*/} </div>
                )}

                {/* 맴버 추가 중첩 바텀시트 */}
                {isMemberModalOpen && (
                    <div> {/* TripMemberModal - 나중에 import */} </div>
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
        </>
    )
}

export default TripCreateModal;