import BottomMenuBar from "@/components/navigations/BottomMenuBar";
import LeftMenuBar from "@/components/navigations/LeftMenuBar";
import TopBar from "@/components/shared/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b-[1px] border-[#31353f] bg-[#1f1f23] bg-opacity-80 backdrop-blur-sm sm:hidden">
        <TopBar />
      </header>
      <main className="relative">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col-reverse sm:flex-row">
          <LeftMenuBar />
          <BottomMenuBar />
          <div className="mx-auto mt-5 w-full max-w-4xl px-7 py-5 pb-20 sm:pb-0 lg:mt-8 2xl:py-7">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
