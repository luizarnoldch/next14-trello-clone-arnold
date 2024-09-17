"use client";

import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { Textarea } from "../ui/textarea";

type Props = {
  id: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  customClasses?: string;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
  onClick?: () => void;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      label,
      rows = 3,
      placeholder,
      required,
      disabled,
      customClasses,
      defaultValue,
      errors,
      onBlur,
      onClick,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div>
        <div>
          {label ? (
            <Label htmlFor={id} className="text-neutral-700 font-semibold">
              {label}
            </Label>
          ) : null}
          <Textarea
            id={id}
            name={id}
            rows={rows}
            onBlur={onBlur}
            onClick={onClick}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            ref={ref}
            className={cn(
              "text-sm text-neutral-700 font-medium tracking-wider resize-none",
              customClasses,
              errors ? "border-rose-500/40" : ""
            )}
            aria-describedby={`error-${id}`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
