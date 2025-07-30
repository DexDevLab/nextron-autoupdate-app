import _ from "lodash";
import { IPC } from "./ipc";

export async function updateChecker() {
  let updateData = {
    statusCode: 102,
    latest: "",
    updateUrl: "",
  };
  try {
    const dbRequest = await IPC.ASYNC("prisma-launcher-get", {
      fn: "findMany",
      args: {
        where: {
          OR: [{ dataType: "currentVersion" }, { dataType: "updateUrl" }],
        },
      },
    });
    if (dbRequest.status !== 200) {
      updateData = {
        statusCode: dbRequest.status,
        errorMessage: dbRequest.data,
      };
      throw new Error();
    } else {
      // Latest version available
      // Update URL for manual download
      updateData = {
        latest: dbRequest.data[0].dataValue,
        updateUrl: dbRequest.data[1].dataValue,
      };
      // Running version
      const storeRequest = await IPC.ASYNC("store-get", "version");
      if (storeRequest.status !== 200) {
        updateData = {
          statusCode: storeRequest.status,
          errorMessage: storeRequest.data,
        };
        throw new Error();
      } else {
        updateData = {
          ...updateData,
          runningVersion: storeRequest.data
        }
        // Check if update URL is valid
        const updateUrlIsValid = !(
          _.isUndefined(updateData.updateUrl) ||
          _.isNull(updateData.updateUrl) ||
          _.isEmpty(updateData.updateUrl) ||
          updateData.updateUrl.length < 3
        );

        // If there is a valid update URL in database, it means download will be made manually
        if (updateUrlIsValid) {
          // Check if the running version is the latest
          console.log(52, updateData);
        }
      }
    }
  } catch (e) {
    return {
      status: updateData.statusCode || 500,
      data: `Update Check Failed: ${updateData?.errorMessage || e.message}`,
    };
  }

  //TODO If updateUrl is not empty, then the update is manual
  //TODO if the update is manual, then provide download link to click and close app to update

  //TODO else, do nothing bc update is automatic
}
