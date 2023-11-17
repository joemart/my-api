import Image, { type ImageLoader } from "next/image"
import { StaticImageData } from "next/image"



type MyCustomLoaderType = (props: CustomLoader) => React.ReactNode

type CustomLoader = {
    src: StaticImageData | string,
    className?: string,
    // width: number,
    // height: number
}

const MyImageLoader: ImageLoader = ({ src }) => {
    return src
}

/**
* Custom Image loader that is meant as a template.
* Change objectFit under 'style' to adjust how the image
* will be styled.
*
* Change the parent's element width and height to increase 
* or decrease the size of the image.
**/

const MyCustomLoader: MyCustomLoaderType = (props) => {
    return <Image

        loader={MyImageLoader}
        alt="Custom loader"
        {...props}
        sizes="100vw"
        unoptimized
        // fill
        style={{ objectFit: "cover" }}

    />
}

export default MyCustomLoader