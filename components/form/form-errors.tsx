"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormErrors = ({ id, errors }: Props) => {
  if (!errors) return null;

  return (
    <div
      id={`error-${id}`}
      aria-live="assertive"
      className="text-xs md:text-sm text-rose-500 flex flex-row items-center gap-2 my-2"
    >
      <AlertTriangle className="w-4 " />
      <ul className="flex flex-col items-center gap-1">
        {errors[id]?.map((err: string) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrors;
