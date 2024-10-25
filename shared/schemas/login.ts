import { z } from "zod";

export default z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(5),
});
