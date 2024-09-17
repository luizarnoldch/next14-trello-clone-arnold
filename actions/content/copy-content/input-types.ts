import { z } from "zod";
import { CardContent } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { CopyContentSchema } from "./schema";

export type InputType = z.infer<typeof CopyContentSchema>;
export type ReturnType = ActionState<InputType, CardContent>;
