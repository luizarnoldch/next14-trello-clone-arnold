import { z } from "zod";
import { CardContent } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { UpdateContentSchema } from "./schema";

export type InputType = z.infer<typeof UpdateContentSchema>;
export type ReturnType = ActionState<InputType, CardContent>;
