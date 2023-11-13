import { useSession, signIn, signOut } from "next-auth/react"

declare module "next-auth" {

    interface Session {
        accessToken?: string
    }
}

export default function Component() {
    const { data } = useSession()
    const { accessToken } = data

    return <div>Access Token: {accessToken}</div>
}