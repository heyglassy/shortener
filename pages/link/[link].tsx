import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const url = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000'

    const linkReq = await fetch(`${url}/api/link`, {
        method: "POST",
        body: String(context.query.link!) //????
    })

    const link = await linkReq.json()

    return {
        redirect: {
            destination: link.link,
            permanent: false
        }
    }
}

const Link = () => {
    return (
        <div>
            <h1>ree</h1>
        </div>
    )
}

export default Link 