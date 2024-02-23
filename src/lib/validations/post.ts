import * as z from "zod";

export const PostValidation = z.object({
  _post: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

export const CommentValidation = z.object({
  _comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
