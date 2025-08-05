import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-30vh)]">
      <Loader2 size={100} className="animate-spin" />
    </div>
  );
}
