import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Auth-Security <onboarding@resend.dev>"
const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function sendTwoFactorTokenMail(email: string, token: string){
    await resend.emails.send({
        from: FROM,
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`
    })
}

export async function sendVerificationMail(
    email : string,
    token : string
){
    const confirmLink = `${DOMAIN}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from : FROM,
        to : email,
        subject : "Verify your email",
        html : `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    })

}

export async function sendPasswordResetEmail(
    email : string,
    token : string
){
    const resetLink = `${DOMAIN}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: FROM,
        to: email,
        subject: "Reset your password",
        html : `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })
}