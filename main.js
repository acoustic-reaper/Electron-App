const { app, BrowserWindow, ipcMain, Menu, dialog, Tray } = require('electron');
const io = require('socket.io-client');
const mongoose = require('mongoose');
const { join } = require('path');
const { exec } = require ('child_process');

let ACCESS_CODE = null;
// const shutdown = require('electron-shutdown-command');

// var AutoLaunch = require('auto-launch');
// var autoLauncher = new AutoLaunch({
//     name: "MyApp"
// });
// // Checking if autoLaunch is enabled, if not then enabling it.
// autoLauncher.isEnabled().then(function(isEnabled) {
//   if (isEnabled) return;
//    autoLauncher.enable();
// }).catch(function (err) {
//   throw err;
// });


// app.post()
let menu = Menu.buildFromTemplate([])
Menu.setApplicationMenu(menu)
let win= null;
function createWindow () {
  win = new BrowserWindow({
    x : 860,
    y : 210,
    width: 413,
    height: 400,
    resizable:false,
    icon: __dirname + './icons8-shutdown-50.png',
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html');

  let tray = new Tray('icons8-shutdown-50.png');

  tray.setToolTip("Remote-Shutdown-Application\nStatus: Running");
  tray.on('click', ()=>{
    win.isVisible()? win.hide():win.show();
  })
  // const contents = win.webContents;
  // console.log(contents);
  
    // const choice = dialog.showMessageBoxSync(win, {
    //   type: 'question',
    //   buttons: ['Confirm Changes', 'Go Back'],
    //   title: 'Confirm Changes',
    //   message: 'Access code will be changed now.',
    //   defaultId: 0,
    //   cancelId: 1
    // })

    // console.log(choice);
    // BrowserWindow({icon:'./icons8shut'});
  //   win.on('closed', function () {
  //   win = null
  // })
    // let x = win.webContents;
    // x.on('')
  win.on('close', ev => {
    ev.sender.hide();
    ev.preventDefault();
  })
  }


  

app.whenReady().then(() => {
  createWindow()
  const socket = io('https://remote-server-new.onrender.com');
  socket.on('remote', (data) => {
    // Handle the incoming control message as necessary
    console.log(`Received control message: ${data}`);
    if (data === 'shutdown') {
        //code to shutdown
        // shutdown.shutdown(); 
        function shutdown(callback){
          exec('shutdown /p', function(error, stdout, stderr){ callback(stdout); });
      }
      shutdown(function(output){
        console.log(output);
      });
}
    else if (data === 'restart')
    {
      function shutdown(callback){
        exec('shutdown /r', function(error, stdout, stderr){ callback(stdout); });
    }
    shutdown(function(output){
      console.log(output);
    });
    }
    else if (data == 'hibernate')
    {
      function shutdown(callback){
        exec('shutdown /h', function(error, stdout, stderr){ callback(stdout); });
    }
    shutdown(function(output){
      console.log(output);
    });
    }
    else if (data === 'logoff')
    {
      function shutdown(callback){
        exec('shutdown /l', function(error, stdout, stderr){ callback(stdout); });
    }
    shutdown(function(output){
      console.log(output);
    });
    }
});
  // app.setLoginItemSettings({
  //   openAtLogin: false   
  // })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('before-quit', (e) => {
  win.hide();
  e.preventDefault();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
}
})

