import { ipcMain } from "electron";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const DiscordRpc: typeof import("discord-rpc") = require("discord-rpc");

const clientId = "1269746987784474626";
DiscordRpc.register(clientId);

const rpc = new DiscordRpc.Client({
  transport: "ipc",
});

rpc.on("ready", () => {
  rpc.setActivity({
    startTimestamp: new Date(),
    largeImageKey: "icon",
    // largeImageText: "Большая картинка",
    // smallImageKey: "icon",
    // smallImageText: "Маленькая картинка",
    instance: false,
  });
});

ipcMain.handle("other:toggleActivityInDiscord", (_e, value: boolean) => {
  if (value) rpc.login({ clientId }).catch(console.error);
  else rpc.destroy().catch(console.error);
});
