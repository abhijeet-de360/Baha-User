"use client";

import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldTitle({
  className,
  ...props
}: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-title"
      className={cn("text-sm font-semibold text-[#292240]", className)}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("text-xs text-[#746B60]", className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn("text-xs text-red-500", className)}
      {...props}
    />
  );
}

export { Field, FieldTitle, FieldDescription, FieldError };

