import styles from "@/styles/Navbar/index.module.scss"
import Link from "next/link"
import type { SignOutParams, SignOutResponse } from "next-auth/react"
import { useSession } from "next-auth/react"

type NavbarProps = {
    signOut: <R extends boolean = true>(options?: SignOutParams<R> | undefined) => Promise<R extends true ? undefined : SignOutResponse>,
}



const Navbar = ({ signOut }: NavbarProps) => {

    const { status } = useSession()

    return <>
        <section className={styles["section"]}>
            <Link href={"/"} className={styles["section_Link"]}>Home</Link>
            {status == "authenticated" ? <button onClick={() => signOut()}>Sign out</button> : <p></p>}
        </section>
    </>
}

export default Navbar