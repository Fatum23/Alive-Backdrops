export const A = (props: JSX.IntrinsicElements["a"]) => {
  return (
    <a
      title={props.href}
      onClick={async (e) => {
        e.preventDefault();
        window.ipcRenderer.shell.openUrl(props.href!);
      }}
      {...props}
      className={`[transition:border_0.3s_!important] border-b-2 border-b-text hover:border-b-link ${props.className}`}
    >
      {props.children}
    </a>
  );
};
