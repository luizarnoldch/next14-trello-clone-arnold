import React, { Suspense } from "react";
import ActivityList from "./_components/activity-list";
import OrganizationAvatar from "../_components/organization-avatar";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subcription";

// export const dynamic = "force-dynamic";
const AcitivityPage = async ({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) => {
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <OrganizationAvatar orgId={organizationId} isSubscribed={isSubscribed} />
      <Separator className="my-3" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList orgId={organizationId} />
      </Suspense>
    </div>
  );
};

export default AcitivityPage;
