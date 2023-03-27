import Head from 'next/head'

export default function HeadTag(): JSX.Element {
    return (
        <Head>
            <title>Crypto Coin prices</title>
            <meta name="description" content="Data fetching demo with Coin Gecko api" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}