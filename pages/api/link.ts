import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.link.findUnique({
            where: {
                alias: req.body
            }
        })

        if (data) {
            res.setHeader('Cache-Control', 's-maxage=2592000000')
            res.status(200).json({ link: data.link })
        } else {
            res.status(200).json({ link: "/" })
        }

    } catch (e) {
        console.error(e)
    }
}