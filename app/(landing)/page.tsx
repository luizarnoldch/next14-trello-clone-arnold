import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Gem } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-4  w-full h-full px-10 max-w-7xl ",
        textFont.className
      )}
    >
      <div className=" w-full min-h-[25vh] lg:min-h-[80vh]  relative col-span-3 lg:col-span-2 order-first lg:order-last row-span-2 lg:row-span-1">
        <Image
          src={"/landing.svg"}
          fill
          alt="landing page image"
          sizes="100vw"
          priority
        />
      </div>
      <div className="col-span-3 lg:col-span-1 flex flex-col gap-4 items-center lg:justify-center justify-start row-span-1">
        <div className="flex flex-col space-y-4">
          <div className="flex space-y-3 flex-col text-sm md:text-2xl lg:text-3xl text-center">
            <div className="flex justify-center items-center gap-2  border-none outline-none py-1 px-4 bg-gradient-to-l from-rose-500 text-[#3d348b] rounded uppercase">
              <Gem className="h-8 w-8 lg:h-10 lg:w-10 text-amber-300" />
              <span className="font-bold  font-serif ">Teamwork</span>
            </div>
            <span className="text-slate-100">Makes the Dreams</span>
            <span className="text-3xl md:text-6xl font-bold underline underline-offset-4 italic text-amber-300">
              Work
            </span>
          </div>
        </div>
        <hr className="w-1/2 mx-auto border-gray-500 " />
        <div className="text-slate-300 text-xs md:text-base lg:text-lg">
          Meet Keeper, your go-to solution for streamlined project management.
          Elevate collaboration, boost productivity, and stay organized
          effortlessly. Whether you&apos;re a startup or enterprise, Keeper
          adapts to your needs. Experience efficient project management -- start
          with Keeper today.
        </div>
        <Button className="mt-5" size={"lg"} asChild variant={"destructive"}>
          <Link href={"/sign-up"} className="text-sm md:text-base lg:text-lg">
            Get Started for Free
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
