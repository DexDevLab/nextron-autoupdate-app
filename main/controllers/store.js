import _ from "lodash";
import { instantiateElectronStore } from "../helpers/utils";

// Store data Controller
export const store = {
  GET: async (args) => {
    const store = await instantiateElectronStore();
    const data = await store.get(args);
    if (!_.isUndefined(data)) {
      return {
        status: 200,
        data: data,
      };
    } else {
      return {
        status: 500,
        data: `Method store.GET failed: ${data}`,
      };
    }
  },
  POST: async (args) => {
    const keys = Object.keys(args);
    if (keys.length > 1) {
      return {
        status: 414,
        data: `Method store.POST failed: Only 1 key is allowed. Found keys: ${keys.join(", ")}`,
      };
    }
    const store = await instantiateElectronStore();
    store.set(args);
    const hasKey = store.has(keys[0]);
    if (hasKey) {
      const data = await store.get(keys[0]);
      if (_.isEqual(args[keys[0]], data)) {
        return {
          status: 200,
          data: data,
        };
      }
    }
    return {
      status: 500,
      data: `Method store.POST failed: Cannot write Store`,
    };
  },
  DELETE: async (args) => {
    const store = await instantiateElectronStore();
    store.delete(args);
    const hasKey = store.has(args);
    if (!hasKey) {
      return {
        status: 200,
        data: !hasKey,
      };
    }
    return {
      status: 500,
      data: `Method store.DELETE failed`,
    };
  },
};
