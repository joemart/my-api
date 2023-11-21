import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

type SortWoW = {
    (a: string, b: string): string,
    (a: number, b: number): number

}

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


    const sortWoW = (a: any, b: any) => {
        if (typeof a == "string" && typeof b == "string") {
            if (a > b)
                return 1
            if (a < b)
                return -1
            return 0
        }
        if (typeof a == "number" && typeof b == "number")
            return a - b
    }

    const WoWChars = !isLoading ? <>{
        wowData.wow_accounts[0].characters.map(({
            name,
            level,
            realm: { name: realm },
            playable_class: { name: playerClass },
            playable_race: { name: playerRace },
            gender: { name: g },
            faction: { name: f }
        }: {
            name: string,
            level: number
            realm: { name: string },
            playable_class: { name: string },
            playable_race: { name: string },
            gender: { name: "Male" | "Female" },
            faction: { name: "Horde" | "Alliance" }

        },
            i: number) => {
            return <div key={i}>
                <div>Name: {name}</div>
                <div>Level: {level}</div>
                <div>Player Race: {playerRace}</div>
                <div>Gender: {g}</div>
                <div>Faction: {f}</div>
                <div>Realm: {realm}</div>
                <div>Player Class: {playerClass}</div>
            </div>
        })
    }</> : <>Loading...</>

    return <section>WoW
        {WoWChars}
    </section>
}

export default WoW