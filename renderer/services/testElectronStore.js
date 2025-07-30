import { IPC } from "./ipc";

export async function testElectronStore() {
  await IPC.LOG("Testing Electron Store");
  const testResult = {};
  Object.assign(testResult, { test: {} });

  // Watch
  await IPC.LOG("Watch Electron Store");
  let watchCount = 0;
  window.ipc.watch("store-watch-storeAppTest-test", (message) => {
    const { status, data } = message;
    watchCount = data.watch;
    Object.assign(testResult.test, {
      watch: status === 200 ? "OK" : "Failed",
    });
  });

  // Set, Get and Unsubscribe
  await IPC.LOG("Set and Get Electron Store");
  for (let i = 1; i <= 5; i++) {
    // Set
    IPC.CALL("store-post", {
      key: "storeAppTest",
      value: { watch: i },
      watchers: "test",
    });
    // Get
    const data = await IPC.ASYNC('store-get', 'storeAppTest');
    
    Object.assign(testResult.test, {
      setGet: data.status === 200 ? "OK" : "Failed",
    });
    if (i === 3) {
      // Unsubscribe
      IPC.UNSUBSCRIBE("store-watch-storeAppTest-test");

      // Check if watch failed
      if (watchCount === 0) {
        Object.assign(testResult.test, {
          watch: "Failed",
        });
      }
    }
    if (i === 5) {
      // Unsubscribe result
      Object.assign(testResult.test, {
        unsubscribe: i > watchCount ? "OK" : "Failed",
      });
    }
  }

  // Delete
  await IPC.LOG("Delete Electron Store Key");

  const data = await IPC.ASYNC("store-delete", "storeAppTest");

  Object.assign(testResult.test, {
    delete: data.status === 200 ? "OK" : "Failed",
  });

  const testHasFailures = Object.values(testResult.test).includes("Failed");

  if (testHasFailures) {
    const failures = [];
    Object.entries(testResult.test).forEach((item) => {
      if (item[1] === "Failed") {
        failures.push(`'${item[0]}'`);
      }
    });
    await IPC.LOG(`Error: Electron Store Tests Failed:${failures.join(", ")}`);

    return {
      status: 416,
      data: {
        message: `Error: Electron Store Tests Failed:${failures.join(", ")}`,
        test: testResult.test,
      },
    };
  } else {
    return {
      status: 200,
      data: {
        message: "All Electron Store tests done",
        test: testResult.test,
      },
    };
  }
}
