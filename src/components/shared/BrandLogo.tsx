import { MessageSquareHeart } from "lucide-react";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="#" className="inline-flex items-center gap-x-1">
      <MessageSquareHeart
        strokeWidth={2}
        absoluteStrokeWidth
        className="h-8 w-8 lg:h-9 lg:w-9"
      />
      <p className="mb-2 text-xl font-bold lg:mb-1 lg:text-2xl">ChipiChat</p>
    </Link>
  );
}
