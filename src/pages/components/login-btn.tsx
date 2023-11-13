import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {

    const { data: session, status } = useSession()



    if (session) {
        console.log(session)
        return (
            <>
                {status ? <>Signed in as {session.user!.name} <br /></> : <></>}
                <button onClick={() => signOut()}>Sign out</button>
                <img src={session.user?.image as string} alt="" />
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}