import React from "react";
import OrganizationAvatar from "../_components/organization-avatar";
import { checkSubscription } from "@/lib/subcription";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subscription-button";

const BillingPage = async ({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) => {
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <OrganizationAvatar orgId={organizationId} isSubscribed={isSubscribed} />
      <Separator className="my-3" />
      <SubscriptionButton isSubscribed={isSubscribed} />
    </div>
  );
};

export default BillingPage;
