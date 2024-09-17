import { z } from "zod";
import { CardContent } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { ReorderContentSchema } from "./schema";

export type InputType = z.infer<typeof ReorderContentSchema>;
export type ReturnType = ActionState<InputType, CardContent[]>;
