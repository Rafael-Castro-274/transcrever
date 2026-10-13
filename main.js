const { app, BrowserWindow, protocol, net, session, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

// Esquema próprio "app://" com origem fixa e segura: assim o cache do modelo
// de voz (Cache API) persiste entre execuções e microfone/WASM funcionam.
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true },
}]);

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1060,
    height: 880,
    minWidth: 700,
    minHeight: 560,
    backgroundColor: '#161310',
    autoHideMenuBar: true,
    title: 'Transcrever',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: { contextIsolation: true },
  });
  win.loadURL('app://local/index.html');
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  protocol.handle('app', (request) => {
    const u = new URL(request.url);
    let p = decodeURIComponent(u.pathname);
    if (p === '/' || p === '') p = '/index.html';
    const file = path.normalize(path.join(__dirname, p));
    if (!file.startsWith(__dirname)) {
      return new Response('forbidden', { status: 403 });
    }
    return net.fetch(pathToFileURL(file).toString());
  });

  session.defaultSession.setPermissionRequestHandler((wc, permission, callback) => {
    callback(permission === 'media');
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => app.quit());
