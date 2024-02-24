import Link from "next/link";

export default function FooterBar() {
  return (
    <div className="px-7 py-4 sm:px-9 sm:py-6">
      <p className="text-center text-sm text-[#909098]">
        ©2024 ChipiTalks. Created by{" "}
        <Link
          href="https://radya-profiles.netlify.app/"
          rel="noopener noreferrer"
          target="_blank"
          className="underline underline-offset-1 hover:text-white"
        >
          Radya Adi Anggara
        </Link>
        . The source code available on{" "}
        <Link
          href="https://github.com/radyaadi/chipitalks"
          rel="noopener noreferrer"
          target="_blank"
          className="underline underline-offset-1  hover:text-white"
        >
          GitHub
        </Link>
      </p>
    </div>
  );
}
