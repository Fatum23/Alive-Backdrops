const separateStylesheet = document.createElement("style");
document.head.appendChild(separateStylesheet);

let themeLoaded: boolean = false;
window.ipcRenderer.theme.onChange((_e, theme) => {
  const classList = document.documentElement.classList;
  const classNames = document.documentElement.className;
  const getPrevTheme = (className: string) => className.includes("theme-");
  classNames.includes("theme-") &&
    classList.remove(
      classNames.split(" ").at(classNames.split(" ").findIndex(getPrevTheme))!
    );
  classList.add(`theme-${theme}`);
  if (!themeLoaded) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        separateStylesheet.sheet!.insertRule(
          "* { transition: color 0.3s, background-color 0.3s !important; }",
          0
        );
        themeLoaded = true;
      })
    );
  }
});
