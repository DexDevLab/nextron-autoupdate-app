import { prismaService } from "../services/prisma";

// Test Controller
export const test = {
  GET: async ({ user }) => {
    const data = await prismaService({
      table: "user",
      fn: "findMany",
      args: {
        where: {
          name: user,
        },
      },
    });
    if (data.status !== 200) {
      return {
        status: data.status || 500,
        data: `Method test.GET failed: ${data.data}`,
      };
    }
    return data;
  },
};
