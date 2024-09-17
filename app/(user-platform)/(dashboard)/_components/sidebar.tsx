"use client";

import React from "react";
import Link from "next/link";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import OrganizationItem, { Organization } from "./organization-item";

type Props = {
  storageKey?: string;
};

const Sidebar = ({ storageKey = "desktop-sidebar" }: Props) => {
  const [isOpen, setIsOpen] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: selectedOrg, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(isOpen).reduce(
    (acc: string[], key: string) => {
      if (isOpen[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onOpen = (id: string) => {
    setIsOpen((curr) => ({ ...curr, [id]: !isOpen[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <div className="space-y-5">
        <div className="font-medium flex items-center justify-between px-1">
          <span className="text-gray-600 italic">Workspaces</span>
          <Button asChild variant="primary" size={"xs_rounded"}>
            <Link href={"/select-org"}>
              <Plus />
            </Link>
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-8 absolute bg-purple-900/30 top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <Skeleton className="h-8 w-[85%] ml-auto bg-sky-500/10" />
            <Skeleton className="h-8 w-[85%] ml-auto bg-sky-500/10" />
            <Skeleton className="h-8 w-[85%] ml-auto bg-sky-500/10" />
          </div>
          <div className="relative">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-8 absolute bg-purple-900/30 top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-8 absolute bg-purple-900/30 top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="font-medium flex items-center justify-between px-1">
        <span className="text-gray-600 italic">Workspaces</span>
        <Button asChild variant="primary" size={"xs_rounded"}>
          <Link href={"/select-org"}>
            <Plus />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <OrganizationItem
            key={organization.id}
            isActive={selectedOrg?.id === organization.id}
            isOpen={isOpen![organization.id]}
            organization={organization as Organization}
            onOpen={onOpen}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default Sidebar;
