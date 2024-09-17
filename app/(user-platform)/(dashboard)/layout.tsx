import React from "react";
import Sidebar from "../_components/sidebar";

type Props = { children: React.ReactNode };

const OrganizationLayout = ({ children }: Props) => {
  return (
    <main className="max-w-7xl px-4 pt-5 mx-auto">
      <div className="flex gap-4">
        <div className="w-64 md:block hidden shrink-0">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
