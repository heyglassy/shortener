import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const link = await prisma.link.findUnique({
            where: {
                alias: req.body
            }
        })

        if (link) {
            res.setHeader('Cache-Control', 's-maxage=2592000000')
            res.status(200).json({ link: link.link })
        } else {
            res.status(200).json({ link: "/" })
        }

    } catch (e) {
        console.error(e)
    }
}