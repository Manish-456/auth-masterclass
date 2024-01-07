import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

interface BackButtonProps {
    backButtonLabel: string;
  backButtonHref: string;
}

export function BackButton({
    backButtonHref,
    backButtonLabel
} : BackButtonProps) {
  return (
    <Button
    variant={"link"}
    className='font-normal w-full'
    size={"sm"}
    asChild>
        <Link href={backButtonHref}>
      {backButtonLabel}
        </Link>
    </Button>
  )
}
