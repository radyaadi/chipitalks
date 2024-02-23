import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="py-7 sm:py-9">
      <div className="px-7 sm:px-9 lg:px-14">
        <Link href="/home" className={buttonVariants({ variant: "outline" })}>
          Logiin
        </Link>
      </div>
      <div className="bg-[url('/bg-image.png')] bg-cover px-7 sm:px-9 lg:px-14">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos id
          molestias, rem animi fugit inventore odit quaerat excepturi expedita
          doloremque dolore iusto placeat est modi veritatis quidem perferendis
          blanditiis ipsam cum? Sunt dignissimos dolorum aliquid alias corporis
          dolorem illum ex corrupti reiciendis aspernatur, voluptate beatae
          neque labore accusamus cumque distinctio!
        </p>
      </div>
    </section>
  );
}
