
const { app, BrowserWindow, nativeImage } = require('electron')
const { trays, setTray } = require('./set-tray')
const path = require('path')

// 判断是否为开发环境
const isDev = process.env.IS_DEV == 'true' ? true : false

// assets目录路径需配合package.json > extraassets > to 打包路径(打包后固定在resources/路径后)
const iconPath = isDev ? 'app/assets/app.ico' : 'resources/assets/app.ico'

// loading窗口
let loading
// 所有窗口列表
const wins = []
// 窗口默认参数
const defaultWinOption = {
  width: 1000,
  height: 600
}

// 创建主窗口
const createWindow = () => {
  const win = new BrowserWindow({
    ...defaultWinOption,
    show: false,
    minWidth: 900,
    minHeight: 500,
    icon: nativeImage.createFromPath(iconPath),
    frame: false, // 无边框窗口(false:无边框, true:有)
    // transparent: true, // 透明窗口
    autoHideMenuBar: true,
    // setIgnoreMouseEvents: false,
    // skipTaskbar: true, // 隐藏任务栏图标
    backgroundColor: '#00FFFCFC', // 格式：#AARRGGBB setBackgroundColor可修改
    // opacity: 0.8, // 窗口透明度 setOpacity可修改（0.0 - 1.0）
    webPreferences: {
      // nodeIntegration: true,
      devTools: isDev ? true : false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 设置通知栏图标（第一次加载时创建通知栏图标，否则不重复创建）
  if (!trays.length) setTray(iconPath, createWindow)

  // 加载html页面
  // win.loadFile('index1.html')
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  )

  // 页面可加载时显示窗口（控制白屏）
  win.once('ready-to-show', () => {
    if (loading) {
      loading.hide()
      loading.close()
      loading = null
    }
    win.show()
  })

  // 窗口关闭时清除
  win.on('closed', () => {
    win.destroy()
    const delIndex = wins.findIndex(w => w.id === winId)
    if (delIndex > -1) wins.splice(delIndex, 1)
  })

  // 窗口取消最大化通知页面
  win.on('unmaximize', () => {
    const { sendMsg } = require('./message-handler')
    sendMsg(win, 'maxScreen', { handler: 'maxScreen', msg: false })
  })

  // 窗口最大化通知页面
  win.on('maximize', () => {
    const { sendMsg } = require('./message-handler')
    sendMsg(win, 'maxScreen', { handler: 'maxScreen', msg: true })
  })

  // 窗口移动通知页面
  win.on('will-move', () => {
    const { sendMsg } = require('./message-handler')
    sendMsg(win, 'winMove', { handler: 'winMove' })
  })

  // 窗口创建完成加入窗口列表
  const winId = win.id
  wins.push({ id: winId, win })
}

// 获取当前窗口
const getCurrWin = () => {
  // if (!wins.length) return {}
  // return wins[wins.length - 1].win
  const focusWin = BrowserWindow.getFocusedWindow() || {}
  return focusWin
}

// 应用启动loading窗口
const showLoading = () => {
  loading = new BrowserWindow({
    show: false,
    frame: false, // 无边框（窗口、工具栏等），只包含网页内容
    width: 256,
    height: 256,
    resizable: false,
    transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
    icon: nativeImage.createFromPath(iconPath),
  })
  loading.loadFile(isDev ? './app/loading.html' : path.join(__dirname, './loading.html'))
  loading.once('ready-to-show', () => {
    loading.show()
  })
}

// 关于窗口
const aboutWindow = (topWin) => {
  const about = new BrowserWindow({
    parent: topWin, // 子窗口
    modal: true, // 模态窗口
    width: 300,
    height: 200,
    icon: nativeImage.createFromPath(iconPath),
    autoHideMenuBar: true,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  about.setMenu(null)
  about.loadFile(isDev ? './app/about.html' : path.join(__dirname, './about.html'))
  about.show()

  about.on('close', () => topWin.show())
}

module.exports = {
  wins,
  getCurrWin,
  showLoading,
  createWindow,
  aboutWindow
}
