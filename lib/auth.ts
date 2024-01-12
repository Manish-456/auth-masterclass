import { auth } from "@/auth"

export const currentUser = async() => {
    const data = await auth();

    return data?.user
}

export const currentUserRole = async() => {
    const data = await auth();

    return data?.user.role
}