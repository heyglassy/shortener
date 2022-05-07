import { PrismaClient } from "@prisma/client"
import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"

const prisma = new PrismaClient()

export const appRouter = trpc.router().query('alias-check', {
    input: z.object({
        name: z.string()
    }),
    async resolve({ input }) {
        const count = await prisma.link.count({
            where: {
                alias: input.name
            }
        })

        return { count }
    }
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null
})