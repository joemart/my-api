import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import MyCustomLoader from "./imageLoader/CustomLoader"

export default function Component() {

    const { data: session, status } = useSession()
    const router = useRouter()


    if (session) {

        return (
            <>
                {status == "authenticated" ? <>Signed in as {session.user!.name} <br /></> : <></>}
                <button onClick={() => signOut()}>Sign out</button>
                <MyCustomLoader src={session.user?.image as string} />
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

