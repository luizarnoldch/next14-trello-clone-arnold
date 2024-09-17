import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <nav className="w-full flex items-center max-w-7xl mx-auto h-20">
      <div className="ml-10 hidden md:block">
        <Logo />
      </div>
      <div className="w-full flex md:justify-end justify-between items-center gap-5 px-10 ">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link href={"/sign-in"}>Login</Link>
        </Button>
        <Button size={"sm"} variant={"destructive"} asChild>
          <Link href={"/sign-up"}>Try for Free </Link>
        </Button>
      </div>
    </nav>
  );
};
