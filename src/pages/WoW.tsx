import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import styles from "@/styles/WoW/index.module.scss"

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
        console.log("Fetched")
        return await r
    })

    const { data: wowData, isLoading } = useQuery({
        queryKey: ["characters"],
        queryFn: async () => await getWoWdata
    })

    //returns sorted array
    const sortData = (property: string) => {

        return wowData.wow_accounts[0].characters.sort((a: { [key: string]: { name: string } }, b: { [key: string]: { name: string } }) => {
            if (property == "name" || property == "level")
                return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0
            return a[property]?.name > b[property]?.name ? 1 : a[property]?.name < b[property]?.name ? -1 : 0
        })
    }


    const WoWChars = !isLoading ? <>{

        sortData(select).map(({
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

        },
            i: number) => {
            return <><div key={i}>
                <div className={`${styles["select"]} ${select == "name" ? styles["select_active"] : ""}`}>Name: {name}</div>
                <div className={`${styles["select"]} ${select == "level" ? styles["select_active"] : ""}`}>Level: {level}</div>
                <div className={`${styles["select"]} ${select == "playable_race" ? styles["select_active"] : ""}`}>Player Race: {playerRace}</div>
                <div className={`${styles["select"]} ${select == "gender" ? styles["select_active"] : ""}`}>Gender: {g}</div>
                <div className={`${styles["select"]} ${select == "faction" ? styles["select_active"] : ""}`}>Faction: {f}</div>
                <div className={`${styles["select"]} ${select == "realm" ? styles["select_active"] : ""}`}>Realm: {realm}</div>
                <div className={`${styles["select"]} ${select == "playable_class" ? styles["select_active"] : ""}`}>Player Class: {playerClass}</div>
            </div>
                <br />
            </>
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

    return <section>WoW
        {WoWSelect}
        {WoWChars}
    </section>
}

export default WoW