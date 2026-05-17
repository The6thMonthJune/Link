interface HamburgerMenuBtnProps {
  onClick: () => void;
}

function HamburgerMenuBtn({ onClick }: HamburgerMenuBtnProps) {
  return (
    <button onClick={onClick} className="w-[44px] h-[44px] flex flex-col gap-[3px] cursor-pointer rounded-full items-center justify-center bg-[#FFFFFF]">
      <div className=" w-[20px] h-[2px] bg-icon-primary rounded-sm"></div>
      <div className=" w-[20px] h-[2px] bg-icon-primary rounded-sm"></div>
      <div className=" w-[20px] h-[2px] bg-icon-primary rounded-sm"></div>
    </button>
  );
}

export default HamburgerMenuBtn;