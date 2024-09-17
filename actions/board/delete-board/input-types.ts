import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/safe-create-action";
import { DeleteBoardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
