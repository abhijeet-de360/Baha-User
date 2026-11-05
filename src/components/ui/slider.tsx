"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
    ? defaultValue
    : [typeof value === "number" ? value : typeof defaultValue === "number" ? defaultValue : 0];

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex w-full items-center"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow rounded-full bg-[#F0EBE1]"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="absolute h-full rounded-full bg-[#E11D48]"
          />
        </SliderPrimitive.Track>

        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot="slider-thumb"
            className="block h-4.5 w-4.5 rounded-full border-2 border-white bg-[#E11D48] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]/30 cursor-grab active:cursor-grabbing"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };

