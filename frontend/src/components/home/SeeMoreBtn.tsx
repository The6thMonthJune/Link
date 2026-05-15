interface SeeMoreBtnProps {
  onClick: () => void;
}

function SeeMoreBtn({ onClick }: SeeMoreBtnProps) {
    return (
    <button onClick={onClick} className="w-[44px] h-[44px] flex flex-row gap-1.5 cursor-pointer 
    rounded-full items-center justify-center bg-[#FFFFFF]">
      <div className="w-[5px] h-[5px] bg-icon-primary rounded-full"></div>
      <div className="w-[5px] h-[5px] bg-icon-primary rounded-full"></div>
      <div className="w-[5px] h-[5px] bg-icon-primary rounded-full"></div>
    </button>
    );
}

export default SeeMoreBtn;