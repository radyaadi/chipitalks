import NavLink from "./NavLink";

export default function BottomMenuBar() {
  return (
    <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between border-t-[1px] border-[#414853] bg-[#1f1f23] pb-3 pt-2 sm:hidden">
      <div className="mx-auto flex w-full max-w-md justify-between overflow-y-auto px-5">
        <NavLink />
      </div>
    </div>
  );
}
