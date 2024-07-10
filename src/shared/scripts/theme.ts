const separateStylesheet = document.createElement("style");
document.head.appendChild(separateStylesheet);

let themeLoaded: boolean = false;
window.ipcRenderer.theme.onChange((_e, theme) => {
  document.documentElement.className = `theme-${theme}`;
  if (!themeLoaded) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        separateStylesheet.sheet!.insertRule(
          "* { transition: color 0.3s, background-color 0.3s !important; }",
          0
        );
        themeLoaded = true;
        window.ipcRenderer.invoke("window:theme");
      })
    );
  }
});
