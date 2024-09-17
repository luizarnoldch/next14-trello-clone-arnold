import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { UpdateCardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
