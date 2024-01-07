import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  backButtonLabel: string;
  backButtonHref: string;
}

export function BackButton({
  backButtonHref,
  backButtonLabel,
}: BackButtonProps) {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  );
}
