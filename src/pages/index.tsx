import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { useSession, signOut } from "next-auth/react"

export default function BattleNet() {

  const session = useSession()

  return (
    <>
      <Navbar signOut={signOut} />
      <Home />
    </>
  )
}