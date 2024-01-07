"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schema";

type TRegister = z.infer<typeof RegisterSchema>;

export async function register(values : TRegister){
    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {
            error : "Invalid fields!"
        }
    }

    return {
        success : "Email sent!"
    }
}