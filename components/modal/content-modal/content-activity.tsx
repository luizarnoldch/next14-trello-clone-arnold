import { Activity as AcivityIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Log } from "@prisma/client";
import ActivityItem from "@/components/activity-item";

type Props = { logs: Log[] };

const ContentActivity = ({ logs }: Props) => {
  return (
    <div className="flex w-full gap-3 text-neutral-700 ">
      <AcivityIcon size={25} />
      <div className="flex flex-col justify-start gap-2 ">
        <span className="text-sm font-semibold">Activity</span>
        <ol className="flex flex-col gap-3">
          {logs.map((log) => (
            <ActivityItem key={log.id} log={log} />
          ))}
        </ol>
      </div>
    </div>
  );
};

ContentActivity.Skeleton = function ActivitySkeleton() {
  // TODO : Dont forget to add skeleton component for activity tab
  return (
    <div className="flex w-full gap-3 text-neutral-700 ">
      <Skeleton className="w-6 h-6 bg-neutral-700/20" />
      <div className="flex flex-col justify-start gap-2 w-full ">
        <span className="text-sm font-semibold">Activity</span>

        <ul className="flex flex-col gap-3 w-full">
          <li>
            <Skeleton className="bg-neutral-700/20 h-10 w-full" />
          </li>
          <li>
            <Skeleton className="bg-neutral-700/20 h-10 w-full" />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ContentActivity;
