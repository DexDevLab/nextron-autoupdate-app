import { prismaService } from "../services/prisma";

// Launcher data Controller
export const launcher = {
  GET: async ({ fn, args }) => {
    const data = await prismaService({
      table: "launcher",
      fn: fn,
      args: { ...args },
    });
    if (data.status !== 200) {
      return {
        status: data.status || 500,
        data: `Method launcher.GET failed: ${data.data}`,
      };
    }
    return data;
  },
};
