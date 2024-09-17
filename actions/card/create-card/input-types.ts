import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { CreateCardSchema } from "./schema";

export type InputType = z.infer<typeof CreateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
