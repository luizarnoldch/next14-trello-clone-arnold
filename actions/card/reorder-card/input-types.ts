import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { ReorderCardSchema } from "./schema";

export type InputType = z.infer<typeof ReorderCardSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
