import { IPC } from "./ipc";

export async function testIpc() {
  const data = await IPC.ASYNC("prisma-test-get", { user: "DCL" });
  return data;
}
