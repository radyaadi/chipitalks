import FooterBar from "@/components/shared/FooterBar";
import TopBar from "@/components/shared/TopBar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="wrapper" className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b-[1px] border-[#31353f] bg-[#1f1f23] bg-opacity-80 backdrop-blur-sm">
        <TopBar />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <FooterBar />
      </footer>
    </div>
  );
}
