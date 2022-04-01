
const { app, BrowserWindow } = require('electron')
const { showLoading, createWindow } = require('./set-window')
require('./message-handler')

// 任务栏右键菜单
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])

// app载入
app.whenReady().then(() => {
  createWindow(app)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('ready', () => {
  showLoading();
})

// 关闭所有窗口时（默认为退出程序，重写可修改默认行为）
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit()
})

