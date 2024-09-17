"use server";
import { auth } from "@clerk/nextjs";

import { db } from "../lib/db";

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }
  const subscription = await db.subscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
      stripeCustomerId: true,
    },
  });

  if (!subscription) {
    return false;
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! >= Date.now();

  return !!isValid;
};
