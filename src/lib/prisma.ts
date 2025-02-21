import { PrismaClient } from "@prisma/client";

const primsaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof primsaClientSingleton>
} & typeof global;

const prisma = globalThis.prismaGlobal ?? primsaClientSingleton()

export default prisma

if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma