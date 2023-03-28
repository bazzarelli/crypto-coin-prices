import Image from 'next/image'

export default function Spinner(): JSX.Element {
    return (
        <Image src="/wind-spinner.svg" alt="loading spinner" width={50} height={50} />
    )
}