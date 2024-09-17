import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
