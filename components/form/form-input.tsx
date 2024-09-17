"use client";

import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { generateFunnyName } from "@/config/generate-funny-name";

type Props = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  customClasses?: string;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      required,
      disabled,
      customClasses,
      defaultValue = generateFunnyName(),
      errors,
      onBlur,
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
          <Input
            id={id}
            name={id}
            onBlur={onBlur}
            type={type}
            defaultValue={defaultValue}
            autoFocus={false}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            ref={ref}
            className={cn(
              "text-sm",
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

FormInput.displayName = "FormInput";
