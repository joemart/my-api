import { useSession, signIn, signOut } from "next-auth/react"
import WoW from "./WoW"
import { useRouter } from "next/router"

export default function Component() {

    const { data: session, status } = useSession()
    const router = useRouter()


    if (session) {
        // console.log(session)
        return (
            <>
                {status == "authenticated" ? <>Signed in as {session.user!.name} <br /></> : <></>}
                <button onClick={() => signOut()}>Sign out</button>
                <img src={session.user?.image as string} alt="" />
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            {/* Not sure how to send different scopes through sign in, so I'll send all */}
            <button onClick={() => router.push("/auth/signin")}>Sign in</button>
        </>
    )
}

