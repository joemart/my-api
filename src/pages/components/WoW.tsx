import { GetServerSideProps } from "next"
import { useSession } from "next-auth/react"


const WoW = () => {

    const { data } = useSession()
    const url = `https://us.api.blizzard.com/data/wow/playable-class/1?namespace=static-us&access_token=${data?.accessToken}`

    const queryString = [...url.matchAll(/\?.*/g)]


    // const res = fetch(url).then(r => r.json())


    // res.then(r => console.log(r))

    return <div>WoW</div>
}

export default WoW