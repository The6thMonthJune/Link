interface HamburgerMenuBtnProps {
  onClick: () => void;
}

function HamburgerMenuBtn({ onClick }: HamburgerMenuBtnProps) {
  return (
    <button onClick={onClick} className="w-[44px] h-[44px] flex flex-col gap-1.5 cursor-pointer rounded-full items-center justify-center bg-[#FFFFFF]">
      <div className=" w-6 h-0.5 bg-icon-primary"></div>
      <div className=" w-6 h-0.5 bg-icon-primary"></div>
      <div className=" w-6 h-0.5 bg-icon-primary"></div>
    </button>
  );
}

export default HamburgerMenuBtn;