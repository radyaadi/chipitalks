import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  pathLink: string;
  profileImage: string;
  name: string;
  timestamp?: string | undefined;
  text?: string | undefined;
}
export default function UserHighlight({
  pathLink,
  profileImage,
  name,
  timestamp,
  text,
}: Props) {
  return (
    <Link href={pathLink} className="flex gap-x-2 hover:bg-[#25252d]">
      <div className="py-5 pl-5">
        <Avatar className="h-11 w-11 lg:h-12 lg:w-12">
          <AvatarImage className="object-cover" src={profileImage} />
          <AvatarFallback>
            <div className="relative h-11 w-11 rounded-full bg-gray-600 lg:h-12 lg:w-12"></div>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="border-w-border flex w-full flex-col border-b-[1px] py-5 pr-5">
        <p>
          <span className="font-bold">{name}</span> {text && <>{text}</>}
        </p>
        {timestamp && (
          <p className="text-sm text-[#909098]">{formatDate(timestamp)} ago</p>
        )}
      </div>
    </Link>
  );
}
