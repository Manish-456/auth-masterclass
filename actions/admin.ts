"use server";

import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function admin() {
  const role = await currentUserRole();

  if(role !== UserRole.ADMIN){
    return {
        error: "Forbidden!"
    }
  }

  return {
    success: "Allowed"
  }
}
