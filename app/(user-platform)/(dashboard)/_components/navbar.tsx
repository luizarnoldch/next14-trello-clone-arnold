import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BookmarkPlus } from "lucide-react";
import React from "react";
import MobileSidebar from "./mobile-sidebar";
import FormNewBoard from "@/components/form/form-new-board";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex w-full max-w-7xl mx-auto h-16 items-center shadow-sm justify-between px-4">
      <div className="flex items-center gap-1 md:gap-3 w-full">
        <MobileSidebar />
        <div className="items-center gap-6 hidden lg:flex w-full">
          <Logo black />
          <FormNewBoard side="bottom" align="start">
            <Button size={"sm"} className="rounded-lg" variant={"primary"}>
              Create New Board
            </Button>
          </FormNewBoard>
        </div>
        <FormNewBoard>
          <Button size={"sm"} variant={"primary"} className="block lg:hidden">
            <BookmarkPlus className="w-5" />
          </Button>
        </FormNewBoard>
      </div>
      <div className="flex items-center gap-2">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              avatarBox: {
                width: 30,
                height: 30,
              },
            },
          }}
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/select-org"
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
