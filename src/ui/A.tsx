export const A = (props: JSX.IntrinsicElements["a"]) => {
  return (
    <a
      {...props}
      title={props.href}
      className={`group transition-all duration-300 border-b-2 border-b-text hover:border-b-sky-400 ${props.className}`}
      onClick={async (e) => {
        e.preventDefault();
        window.ipcRenderer.shell.openUrl(props.href!);
      }}
    >
      {props.children}
    </a>
  );
};
