export default function RV(str:string){

    const newStr = str.replace(/-.*?-/,"-")

    return newStr
}