import { z } from "zod";
import { CardContent } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { DeleteContentSchema } from "./schema";

export type InputType = z.infer<typeof DeleteContentSchema>;
export type ReturnType = ActionState<InputType, CardContent>;
