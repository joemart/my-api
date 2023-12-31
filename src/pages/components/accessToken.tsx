import { useSession, signIn, signOut } from "next-auth/react"

declare module "next-auth" {

    interface Session {
        accessToken?: string
    }
}

export default function Component() {
    const { data } = useSession()

    return <div>Access Token: {data?.accessToken}</div>
}