"use client";

import { useRouter } from "next/navigation";

interface RegisterButtonProps {
  children: React.ReactNode;
}

export function RegisterButton({
  children,
}: RegisterButtonProps) {
  const router = useRouter();

  const onClick = () => router.push(`/auth/login`);


  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
