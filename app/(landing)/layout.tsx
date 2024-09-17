import React from "react";
import { Navbar } from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[100vh] bg-[#3d348b] flex flex-col items-center justify-start">
      <Navbar />
      <main className="flex justify-center items-start h-full w-full">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;
