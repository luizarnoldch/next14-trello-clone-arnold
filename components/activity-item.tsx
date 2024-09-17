import { format } from "date-fns";
import { generateLogMessage } from "@/config/generate-log-message";
import { Log } from "@prisma/client";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  log: Log;
  large?: boolean;
};

const ActivityItem = ({ log, large }: Props) => {
  return (
    <li className="flex items-center w-full gap-2">
      <Avatar className={cn("", large ? "w-10 h-10" : "w-6 h-6")}>
        <AvatarImage src={log.userImage} />
      </Avatar>
      <div
        className={cn("flex flex-col w-full", large ? "text-lg" : "text-xs")}
      >
        <p className=" space-x-2">
          <span className="font-bold">{log.userName}</span>
          <span>
            {generateLogMessage({
              action: log.action,
              entityTitle: log.entityTitle,
              entity: log.entity,
            })}
          </span>
        </p>
        <p className="italic font-light text-neutral-500">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
