"use server";

import { z } from "zod";

import { SettingSchema } from "@/schema";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mail";
import bcrypt from 'bcryptjs';

type TSettings = z.infer<typeof SettingSchema>;

export async function settings(
    values: TSettings
){

   const user = await currentUser();

   if(!user) return {
    error: "Unauthorized"
   }

   const dbUser = await getUserById(user.id);

   if(!dbUser) return {
    error: "Unauthorized"
   }

   if(values.email && values.email !== user.email){
    const existingUser = await getUserByEmail(values.email);

    if(existingUser && existingUser.id !== user.id){
        return {
            error: "Email already in use!"
        }
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationMail(verificationToken.email, verificationToken.token);

    return {
        success: "Verification email sent!"
    }

   }

   if(user.isOAuth){
    values.email = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
    values.newPassword = undefined;
   }

   if(values.password && values.newPassword && dbUser.password){
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if(!passwordMatch){
        return {
            error: "Incorrect password!"
        }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
   }

   await db.user.update({
    where:{
        id: dbUser.id
    },
    data: {
        ...values
    }
   })

   return {
    success: "Settings updated!"
   }

}