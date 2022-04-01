
const { app, Tray, nativeImage, Menu, BrowserWindow } = require('electron')
// const { createWindow } = require('./set-window')

// 通知栏图标列表
const trays = []
const setTray = (iconPath, createWindow) => {
  // 通知栏图标
  const icon = nativeImage.createFromPath(iconPath)
  const tray = new Tray(icon)
  // 通知栏右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      type: 'checkbox',
      label: '开机启动',
      checked: app.getLoginItemSettings().openAtLogin,
      click: () => {
        const openAtLogin = !app.getLoginItemSettings().openAtLogin
        if (!app.isPackaged) {
          app.setLoginItemSettings({
            openAtLogin: openAtLogin,
            path: process.execPath
          })
        } else app.setLoginItemSettings({ openAtLogin: openAtLogin })
      }
    },
    { label: '退出', role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
  // 通知栏tooltip
  tray.setToolTip('This is my application')
  // 通知栏点击事件
  tray.addListener('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    else app.focus()
  })

  trays.push(tray)
}

module.exports = {
  trays,
  setTray
}
