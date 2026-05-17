import group41 from '../../assets/Group 41.png';
import image186 from '../../assets/image 186.png';

function EmptyTripView({ isExpanded }: {isExpanded: boolean}) {
    return (
        <div className={`flex flex-col items-center text-center gap-[20px] ${isExpanded ? 'mt-[96px]' : 'mt-[138px]'}`}>
            <div className='grid place-items-center'>
                <img src={group41} alt="Empty Trip" className='col-start-1 row-start-1' />
                <img src={image186} alt="Empty Trip" className='col-start-1 row-start-1 z-10' />
            </div>
            <div>
                <p className='font-normal text-[16px]'> 아직 생성된 여행 계획이 없어요</p>
                <p className='text-[12px] text-text-muted'> 약속 조각을 생성해요</p>
            </div>
        </div>
    );
}

export default EmptyTripView;