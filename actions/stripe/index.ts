"use server";

import { revalidatePath } from "next/cache";

import { auth, currentUser } from "@clerk/nextjs";

import { safeCreateAction } from "@/lib/safe-create-action";

import { InputType, ReturnType } from "./input-types";
import { StripeRedirect } from "./schema";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user)
    return {
      error: "Unauthorized",
    };

  const callbackUrl = absoluteUrl(`/organization/${orgId}`);

  let url = "";

  try {
    const subscription = await db.subscription.findUnique({
      where: { orgId },
    });

    if (subscription && subscription.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: callbackUrl,
      });
      url = session.url;
    } else {
      const session = await stripe.checkout.sessions.create({
        customer_email: user.emailAddresses[0].emailAddress,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Membership - Keeper PRO",
                description: "Keeper PRO Membership for unlimited boards",
              },
              unit_amount: 500,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: { orgId },
        success_url: callbackUrl,
        cancel_url: callbackUrl,
      });

      url = session.url || "";
    }

    revalidatePath(`/organization/${orgId}`);
    return { data: url };
  } catch (error) {
    console.error(error);
    return {
      error: "Error creating Stripe session",
    };
  }
};

export const stripeRedirect = safeCreateAction(StripeRedirect, handler);
