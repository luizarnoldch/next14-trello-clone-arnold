import React from "react";

type Props = { children: React.ReactNode };

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-200">
      {children}
    </div>
  );
};

export default AuthLayout;
