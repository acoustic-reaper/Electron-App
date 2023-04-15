// Importing contextBridge and ipcRenderer from electron
const { contextBridge, ipcRenderer } = require('electron')

// Exposing functions in main
contextBridge.exposeInMainWorld('electronAPI', {
    // Function to set data in text files
    set_data: (data) => ipcRenderer.send('cmd', data),
    // Function to display data onto frontend
    display_data: (callback) => ipcRenderer.on('display', callback),
    // Function to refresh
    refresh: () => ipcRenderer.send('refresh'),
})