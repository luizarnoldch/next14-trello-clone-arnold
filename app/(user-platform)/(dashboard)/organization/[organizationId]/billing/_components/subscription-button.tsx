"use client";

import { stripeRedirect } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import toast from "react-hot-toast";

type Props = { isSubscribed: boolean };

const SubscriptionButton = ({ isSubscribed }: Props) => {
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onOpen = useSubscriptionModal((state) => state.onOpen);

  const buttonClickHandler = () => {
    if (!isSubscribed) {
      onOpen();
    } else {
      execute({});
    }
  };
  return (
    <Button
      variant={"primary"}
      disabled={isLoading}
      onClick={buttonClickHandler}
    >
      {isSubscribed ? "Manage Your Account" : "Upgrage to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
