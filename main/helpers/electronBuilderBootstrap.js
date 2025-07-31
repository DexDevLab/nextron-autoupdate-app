import { app } from "electron";
import fs from "fs";
import path from "path";

export function electronBuilderBootstrap() {
  const isProd = process.env.NODE_ENV === "production";

  const config = {
    provider: "github",
    url: "https://github.com/DexDevLab/nextron-autoupdate-app",
    useMultipleRangeRequest: false,
    channel: "latest",
    updaterCacheDirName: app.getName(),
    resourcePath: isProd ? process.resourcesPath : path.join(__dirname, '../resources')
  };

  let yaml = "";

  yaml += `provider: ${config.provider}\n`;
  yaml += `url: ${config.url}\n`;
  yaml += `useMultipleRangeRequest: ${config.useMultipleRangeRequest}\n`;
  yaml += `channel: ${config.channel}\n`;
  yaml += `updaterCacheDirName: ${config.updaterCacheDirName}`;

  let update_file = [path.join(config.resourcePath, "app-update.yml"), yaml];
  let dev_update_file = [
    path.join(config.resourcePath, "dev-app-update.yml"),
    yaml,
  ];
  let checkFiles = [update_file, dev_update_file];

  for (let file of checkFiles) {
    if (!fs.existsSync(file[0])) {
      fs.writeFileSync(file[0], file[1], () => {});
    }
  }
}
