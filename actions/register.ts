"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mail";

type TRegister = z.infer<typeof RegisterSchema>;

export async function register(values : TRegister){
    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success) {
        return {
            error : "Invalid fields"
        }
    }
    const {email, name, password} = validatedFields.data    

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {
            error : "Email already in use!"
        }
    }

    await db.user.create({
        data : {
            name,
            email,
            password : hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationMail(verificationToken.email, verificationToken.token)

    return {success : "Confirmation email sent!"}
}