"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

type Props = {};

const MobileSidebar = (props: Props) => {
  const { onOpen, onClose, isOpen } = useMobileSidebar();
  const pathname = usePathname();

  // guaranteeing that is the 100% client component
  // and mounted to go further
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        onClick={onOpen}
        className="block lg:hidden"
        size={"sm"}
        variant={"ghost"}
      >
        <Menu />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="pt-12">
          <Sidebar storageKey="mobile-sidebar" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
