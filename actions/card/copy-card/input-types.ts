import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
