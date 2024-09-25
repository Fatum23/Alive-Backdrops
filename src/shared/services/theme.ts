const accentStylesheet = document.createElement("style");
document.head.appendChild(accentStylesheet);

const transitionStylesheet = document.createElement("style");
document.head.appendChild(transitionStylesheet);

let themeLoaded: boolean = false;
window.ipcRenderer.theme.onChange((_e, theme) => {
  window.ipcRenderer.theme.getAccent().then((accent) => {
    accentStylesheet.innerHTML = `html:not(.theme-custom) {--accent: ${accent};}`;
  });

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
        transitionStylesheet.sheet!.insertRule(
          "* { transition: color 0.3s, background 0.3s, border-color 0.3s; }",
          0
        );
        themeLoaded = true;
      })
    );
  }
});

window.ipcRenderer.theme.onAccentChange((_e, accent) => {
  accentStylesheet.innerHTML = `html:not(.theme-custom) {--accent: ${accent};}`;
});

const customThemeStylesheet = document.createElement("style");
document.head.appendChild(customThemeStylesheet);

window.ipcRenderer.theme.onCustomChange((_e, theme) => {
  if (theme) {
    customThemeStylesheet.innerHTML = `
    html.theme-custom {
      --default: ${theme.bg};
      --text: ${theme.text};
      --light: ${theme.primary};
      --dark: ${theme.secondary};
      --accent: ${theme.accent};
      --accent-hover: ${theme.accentHover};
      --link: ${theme.link};
    }`;
  } else {
    customThemeStylesheet.innerHTML = "";
  }
});
