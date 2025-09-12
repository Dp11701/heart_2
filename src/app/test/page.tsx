"use client";
import { TextInput } from "@/components/Molecules/TextInput";
import React, { useState } from "react";

export default function Test() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TextInput
        placeholder="30"
        unit="cm"
        value={value ?? ""}
        setValue={(value) => setValue(value)}
      />
    </div>
  );
}
