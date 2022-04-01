
const { contextBridge, ipcRenderer } = require('electron')

// 渲染进程通信 → 向window添加属性
// 前端通过window.$electron访问属性
contextBridge.exposeInMainWorld('$electron', {
  versions: process.versions,
  // 接收消息方法
  onMessage: (msg, callback) => {
    ipcRenderer.on(msg, (event, arg) => {
      callback(event, arg)
    })
  },
  // 渲染进程发送消息方法
  sendMsg: (msg) => ipcRenderer.send('message', msg),
})