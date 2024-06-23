import { app, net, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "fs",
    privileges: {
      bypassCSP: true,
      stream: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.handle("fs", function (request) {
    return net.fetch("file://" + request.url.slice("fs://".length));
  });
});
