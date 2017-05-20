
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let win;

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  }
]

function createWindow() {
  win = new BrowserWindow({ width: 400, height: 300});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quite();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
