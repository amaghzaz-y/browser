const { ipcMain, session } = require("electron");

function initEventsHandler(mainWin, browserView) {
  const winContent = mainWin.webContents;
  const browserContent = browserView.webContents;

  ipcMain.handle("toogle-dev-tool", () => {
    if (winContent.isDevToolsOpened()) {
      winContent.closeDevTools();
    } else {
      winContent.openDevTools({ mode: "detach" });
    }
  });

  ipcMain.handle("go-back", () => {
    browserContent.goBack();
  });

  ipcMain.handle("cookieviz-start", () => {});

  ipcMain.handle("cookie-update", () => {
    session.defaultSession.cookies
      .get({})
      .then((cookies) => {
        console.log(cookies);
        return cookies;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  ipcMain.handle("can-go-back", () => {
    return browserContent.canGoBack();
  });

  ipcMain.handle("go-forward", () => {
    browserContent.goForward();
  });

  ipcMain.handle("refresh", () => {
    browserContent.reload();
  });

  ipcMain.handle("can-go-forward", () => {
    return browserContent.canGoForward();
  });

  ipcMain.handle("go-to-page", (event, url) => {
    return browserContent.loadURL(url);
  });

  ipcMain.handle("current-url", () => {
    return browserContent.getURL();
  });
}

module.exports = { initEventsHandler };
