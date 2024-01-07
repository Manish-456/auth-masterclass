"use server";

import { z } from "zod";
import { LoginSchema } from "@/schema";

type TLogin = z.infer<typeof LoginSchema>;

export async function login(values : TLogin){
    const validatedFields = LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {
            error : "Invalid fields!"
        }
    }

    return {
        success : "Email sent!"
    }
}