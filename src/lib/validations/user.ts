import * as z from "zod";

export const UserValidator = z.object({
  _image_url: z.string().url().nonempty(),
  _name: z.string().min(3).max(30),
  _bio: z.string().max(1000),
});
