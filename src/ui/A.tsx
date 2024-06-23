export const A = (props: JSX.IntrinsicElements["a"]) => {
  return (
    <>
      <a
        {...props}
        title={props.href}
        className={props.className + " group"}
        onClick={async (e) => {
          e.preventDefault();
          await window.ipcRenderer.invoke("shell:open-url", props.href);
        }}
      >
        {props.children}
      </a>
      <span />
    </>
  );
};
