import { GetServerSideProps } from "next"
import { getUrl } from "../../utils/url"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const url = getUrl();

    const linkReq = await fetch(`${url}/api/link`, {
        method: "POST",
        body: String(context.query.link!) //????
    })

    const data = await linkReq.json()

    return {
        redirect: {
            destination: data.link,
            permanent: false
        }
    }
}

const Link = () => {
    return
}

export default Link 