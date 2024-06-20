import { invoke } from "@tauri-apps/api/core";

document.addEventListener("DOMContentLoaded", async () => {
  invoke("build_tray");
});
