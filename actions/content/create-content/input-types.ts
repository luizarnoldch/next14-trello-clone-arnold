import { z } from "zod";
import { CardContent } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { CreateContentSchema } from "./schema";

export type InputType = z.infer<typeof CreateContentSchema>;
export type ReturnType = ActionState<InputType, CardContent>;
