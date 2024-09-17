import React from "react";

import { clerkClient } from "@clerk/nextjs";

type Props = { children: React.ReactNode };
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const organization = await clerkClient.organizations.getOrganization({
    organizationId,
  });

  return {
    title: organization.slug?.toUpperCase() || "Anonymous",
  };
}

const OrganizationIdLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default OrganizationIdLayout;
