import styles from "@/styles/Home/index.module.scss"
import { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import MyCustomLoader from "./imageLoader/CustomLoader"
import { useSession, signIn } from "next-auth/react"

import D3BG from "/public/D3BackgroundCard.png"
import D3FG from "/public/D3Foreground.png"
import SC2BG from "/public/SC2BackgroundCard.png"
import SC2FG from "/public/SC2Foreground.png"
import WoWBG from "/public/WoWBackgroundCard.png"
import WoWFG from "/public/WoWForeground.png"


type Card = {
    backgroundImg: StaticImageData,
    foregroundImg: StaticImageData,
    url: string,
    text?: string
}

const Imgs = [
    { b: D3BG, f: D3FG, url: "/D3", text: "Under construction" },
    { b: SC2BG, f: SC2FG, url: "/SC2", text: "Under construction" },
    { b: WoWBG, f: WoWFG, url: "/WoW" }
]

const Card = ({ backgroundImg, foregroundImg, url, text }: Card) => {
    const router = useRouter()

    return <div className={styles["card"]} onClick={() => !text ? router.push(url) : ""}>
        <MyCustomLoader className={styles["card_b"]} src={backgroundImg}></MyCustomLoader>
        <MyCustomLoader className={styles["card_f"]} src={foregroundImg}></MyCustomLoader>
        <div className={styles["card_text"]}>{text}</div>
    </div>
}

const Cards = () => {
    return <>
        {Imgs.map((v, i) => <Card key={i} backgroundImg={v.b} foregroundImg={v.f} url={v.url} text={v.text}></Card>)}
    </>
}

const Section_Container = () => {
    return <div className={styles["section_container"]}>
        <h1>Welcome to my Blizzard API!</h1>
        <h3>This API uses the Next-Auth OAuth 2.0 to access the information and display it. You MUST have a blizzard account in the US in order for this to work.</h3>
        <button onClick={() => signIn()}>Sign In</button>
    </div>
}

const Home = () => {
    const { status } = useSession()

    return <section className={styles["section"]}>
        <div className={styles["section_color"]} />
        {status == "unauthenticated" ? <Section_Container /> : <Cards />}
    </section>
}

Home.getLayout = function getLayout(page: React.ReactNode) {
    return page
}

export default Home