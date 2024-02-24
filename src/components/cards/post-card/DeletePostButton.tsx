import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/post.action";
import { Dispatch, SetStateAction } from "react";

export default function DeletePostButton({
  postId,
  path,
  onMoreButtonOpen,
}: {
  postId: string;
  path: string;
  onMoreButtonOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const onDeleteHandler = async () => {
    await deletePost(postId, path);
    onMoreButtonOpen(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex w-full items-center gap-x-2 rounded-md p-3 text-red-500 hover:bg-[#25252d] sm:w-40 sm:p-2 sm:text-sm">
          <Trash size={18} absoluteStrokeWidth /> Delete
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-80 bg-[#1f1f23]">
        <DialogHeader>
          <DialogTitle className="text-md mb-2 text-center">
            Are you sure to delete this post?
          </DialogTitle>
          <div className="flex w-full justify-center gap-x-4">
            <Button onClick={onDeleteHandler} variant="destructive">
              Delete
            </Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
