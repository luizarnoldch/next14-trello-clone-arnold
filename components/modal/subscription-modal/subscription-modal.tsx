"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/stripe";
import toast from "react-hot-toast";

type Props = {};

const SubscriptionModal = (props: Props) => {
  const isOpen = useSubscriptionModal((state) => state.isOpen);
  const onClose = useSubscriptionModal((state) => state.onClose);

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-1">
        <div className="relative flex items-center justify-center aspect-video">
          <Image
            src={"/subscription.svg"}
            alt="hero"
            fill
            className=" object-cover"
          />
        </div>
        <div className="px-10 space-y-4">
          <DialogHeader className="w-full text-neutral-700">
            <DialogTitle className="text-2xl">
              Upgrade to Keeper PRO - Today
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Explore the full potential of Keeper with unlimited use.
          </DialogDescription>
        </div>
        <ul className="pl-10 space-y-2 list-inside list-disc marker:text-violet-500 text-sm text-neutral-700">
          <li>Unlimited Boards</li>
          <li>Unlimited Card and Content Creation</li>
          <li>Customer Support 7/24</li>
          <li>And More...</li>
        </ul>
        <div className="w-full px-10 py-4">
          <Button
            size={"sm"}
            variant={"primary"}
            className="w-full"
            onClick={() => execute({})}
            disabled={isLoading}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
