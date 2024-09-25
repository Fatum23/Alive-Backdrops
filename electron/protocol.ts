import { app, protocol } from "electron";

app.whenReady().then(() => {
  protocol.registerFileProtocol("fs", (req, callback) => {
    const filePath = decodeURI(req.url.replace("fs://", ""));
    callback(filePath);
  });
});
