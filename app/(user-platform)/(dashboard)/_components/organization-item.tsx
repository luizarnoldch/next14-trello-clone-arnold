"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Activity, CreditCard, Settings, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrganizationList } from "@clerk/nextjs";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};
type Props = {
  isActive: boolean;
  isOpen: boolean;
  organization: Organization;
  onOpen: (id: string) => void;
};

const OrganizationItem = ({
  isActive,
  isOpen,
  onOpen,
  organization,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setActive } = useOrganizationList();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-5 h-5" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-5 h-5" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    if (!setActive) return;
    setActive({ organization: organization.id });
    router.replace(href);
  };
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={onOpen.bind(null, organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:no-underline hover:text-sky-700",
          isActive && !isOpen && "bg-sky-500/10 text-sky-700 "
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl}
              fill
              alt="avatar"
              className="rounded-lg border-none"
              sizes="15vw"
            />
          </div>
          <span>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="ml-5">
        {routes.map((route) => (
          <Button
            size={"sm"}
            key={route.href}
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full justify-start items-center flex gap-3 text-gray-500 hover:text-sky-700",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant={"ghost"}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default OrganizationItem;
