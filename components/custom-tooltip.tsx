import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "./ui/tooltip";

import React from "react";

type Props = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  offset?: number;
  innerText: string;
};

const CustomTooltip = ({
  children,
  side = "bottom",
  offset = 4,
  innerText,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={3}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={offset}
          className="text-xs max-w-[200px] italic"
        >
          {innerText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
