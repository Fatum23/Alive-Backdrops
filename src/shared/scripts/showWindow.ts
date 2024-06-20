import { getCurrent } from "@tauri-apps/api/window";

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => getCurrent().show(), 500);
});
