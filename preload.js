const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('shutdown', {
    node: () => process.versions.node,
  shutdown: () => ipcRenderer.invoke('shutdown')
  // greeting: ()
})