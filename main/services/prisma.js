import { PrismaClient } from "../../resources/generated/prisma";
import { logger } from "../helpers/utils";

// Call ORM client once
const prisma = new PrismaClient();

// Prisma ORM core function. Calls database and return query.
export const prismaService = async ({ table, fn, args }) => {
  try {
    const query = await prisma[table][fn](args);
    return {
      status: 200,
      data: query,
    };
  } catch (error) {
    await logger(`Error: Prisma Service - ${error}`);
    await prisma.$disconnect();
    return {
      status: error.code || error.errorCode || 500,
      data: "Error: Prisma Error",
    };
  } finally {
    await prisma.$disconnect();
  }
};
