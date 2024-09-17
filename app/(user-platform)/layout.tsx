import React from "react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/tanstack-query-provider";

type Props = { children: React.ReactNode };

const UserPlatformLayout = ({ children }: Props) => {
  return (
    <>
      <ClerkProvider>
        <QueryProvider>
          <ModalProvider />

          <Toaster
            toastOptions={{
              className: "text-sm font-semibold",
              success: {
                style: {
                  background: "rgba(61,52,139,1)",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "rgba(154,14,36,1)",
                  color: "white",
                },
              },
            }}
          />
          {children}
        </QueryProvider>
      </ClerkProvider>
    </>
  );
};

export default UserPlatformLayout;
