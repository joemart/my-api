import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import styles from "@/styles/WoW/index.module.scss"
import { GetServerSideProps } from "next"

type SortTypes = string | number
type SortWoW = <T extends SortTypes>(a: T, b: T) => number | undefined


const WoW = () => {

    const [select, setSelect] = useState("")
    const { data } = useSession()
    const url = `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US`

    const getWoWdata = fetch(url, {
        headers: {
            "Authorization": `Bearer ${data?.accessToken}`
        }
    }).then(async r => await r.json()).then(async r => {
        // console.log("Fetched")
        return await r
    })

    const { data: wowData, isLoading } = useQuery({
        queryKey: ["characters"],
        queryFn: async () => await getWoWdata,
        staleTime: Infinity
    })

    //returns sorted array
    const sortData = (property: string) => {

        return wowData.wow_accounts[0].characters.sort((a: { [key: string]: { name: string } }, b: { [key: string]: { name: string } }) => {
            if (property == "name" || property == "level")
                return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0
            return a[property]?.name > b[property]?.name ? 1 : a[property]?.name < b[property]?.name ? -1 : 0
        })
    }

    // type SelectDataType = ["name", "level", "playable_race", "playable_class", "gender", "faction","realm"]
    const selectData = [
        { value: "name", text: "Name" },
        { value: "level", text: "Level" },
        { value: "realm", text: "Realm" },
        { value: "playable_race", text: "Player Race" },
        { value: "playable_class", text: "Player Class" },
        { value: "gender", text: "Gender" },
        { value: "faction", text: "Faction" },

    ]

    const displayData = ({
        name,
        level,
        realm: { name: realm },
        playable_class: { name: playerClass },
        playable_race: { name: playerRace },
        gender: { name: g },
        faction: { name: f }
    }: {
        name: string,
        level: number,
        realm: { name: string },
        playable_class: { name: string },
        playable_race: { name: string },
        gender: { name: "Male" | "Female" },
        faction: { name: "Horde" | "Alliance" }

    }): any => {
        const arrData = [name, level, realm, playerClass, playerRace, g, f]

        return selectData.map((v: { value: string, text: string }, i: number) => {

            return <div key={i} className={`${styles["select"]} ${select == v.value ? styles["select_active"] : ""}`}>{v.text}: {arrData[i]}</div>
        })
    }



    const WoWChars = !isLoading ? <>{

        sortData(select).map((v: any,
            i: number) => {
            return <div key={i} className={styles["section_container_character_item"]}> <div>{displayData(v)}</div>
                <br />
            </div>
        })
    }</> : <>Loading...</>

    const WoWSelect = <select value={select} onChange={e => setSelect(e.target.value)}>
        <option value="name">Name</option>
        <option value="level">Level</option>
        <option value="realm">Realm</option>
        <option value="playable_race">Player Race</option>
        <option value="playable_class">Playable Class</option>
        <option value="gender">Gender</option>
        <option value="faction">Faction</option>
    </select>

    return <section className={styles["section"]}>
        <div className={styles["section_normal"]} />
        <div className={styles["section_saturation"]} />
        <div className={styles["section_soft_light"]} />

        <div className={styles["section_container"]}>
            World of warcraft characters
            <div className={styles["section_container_select"]}>
                Sort: {WoWSelect}
            </div>
            <div className={styles["section_container_character"]}>
                {WoWChars}
            </div>
        </div>

    </section>
}



WoW.getLayout = function getLayout(page: React.ReactNode) {
    return page
}

export default WoW