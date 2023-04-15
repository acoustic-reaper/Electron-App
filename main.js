// Importing app, BrowserWindow, ipcMain, Tray from Electron
const { app, BrowserWindow, ipcMain, Tray } = require("electron");
// Importing io from socket.io-client
const io = require("socket.io-client");
// Importing join from path
const { join } = require("path");
// Importing exec from child_process which shall be used for shutdown, logoff etc
const { exec } = require("child_process");
// Importing prompt to take user input
const prompt = require("electron-prompt");
// Importing file system to read and write text files
const fs = require("fs");

// The game begins here
// Initializing empty window
let win = null;

// Creating function to create a new window
function createWindow() 
{
  // Assigning new window to win
  win = new BrowserWindow({
    // Setting the default properties of new window
    x: 860,
    y: 210,
    width: 413,
    height: 400,
    resizable: false,
    icon: __dirname + "./icons8-shutdown-50.png",
    webPreferences: {
      // Connecting preload file
      preload: join(__dirname, "preload.js"),
    },
  });

  // Loading index.html
  win.loadFile("index.html");

  // Making tray to allow application to run in background
  let tray = new Tray("icons8-shutdown-50.png");
  tray.setToolTip("Remote-Shutdown-Application\nStatus: Running");
  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });

  // Configuring window to never quit, i.e. always run in background
  win.on("close", (ev) => {
    ev.sender.hide();
    ev.preventDefault();
  });

  // Functionality : Refresh
  ipcMain.on('refresh', (e) => {
    display(win);
  })

  // Embedding functionality : Edit Username via ipcMain
  // ipcMain receives data from front-end and saves in the text files
  ipcMain.on("cmd", (e, arg) => {
    // If user wishes to change username
    if (arg === "editusername") 
    {
      // Taking input from promt
      prompt({
        title: "Edit Window",
        label: "Enter New Username",
        placeholder: "New Username",
        inputAttrs: {
          type: "text",
        },
        type: "input",
      })
      .then((r) => {
        if (r === null) {
          console.log("user cancelled");
        } 
        else {
          // Writing input into text file
          try {
            fs.writeFileSync("username.txt", r, "utf-8");
            display(win);
          } catch (e) {
            alert("Failed to save the file !");
          }
        }
      })
      .catch(console.error);
    } 
    // If user wishes to change access code
    else if (arg === "editaccesscode") 
    {
      // Taking input from promt
      prompt({
        title: "Edit Window",
        label: "Enter New Access Code",
        placeholder: "New Access Code",
        inputAttrs: {
          type: "text",
        },
        type: "input",
      })
      .then((r) => {
        if (r === null) {
          console.log("user cancelled");
        } 
        else {
          try {
            // Writing input into text file
            fs.writeFileSync("accesscode.txt", r, "utf-8");
            display(win);
          } catch (e) {
            alert("Failed to save the file !");
          }
        }
      })
      .catch(console.error);
    }
  });
}
// Createwindow function ends here

// function to display currently set username and accesscode onto front-end
function display(window) {
  // Reading data from text files
  var username = fs.readFileSync("username.txt", "utf-8");
  var accesscode = fs.readFileSync("accesscode.txt", "utf-8");
  // Sending data to ipcRenderer via preload.js
  window.webContents.send("display", username, accesscode);
}


// App starts here
app.whenReady().then(() => {
  // Creating first window
  createWindow();

  // Configuring remote server to receive requests
  const socket = io("https://remote-server-new.onrender.com");
  socket.on("remote", (data) => {
    // Handle the incoming control message as necessary
    console.log(`Received control message: ${data}`);
    // Reading user data from text files
    var username = fs.readFileSync("username.txt", "utf-8");
    var accesscode = fs.readFileSync("accesscode.txt", "utf-8");

    // If username and accesscode from server match current user's data,
    // Then process the server's request
    if (data[0] === username && data[1] === accesscode) {
      // Shutdown
      if (data[2] === "shutdown") {
        //code to shutdown : '/p' means shutdown immediately
        function shutdown(callback) {
          exec("shutdown /p", function (error, stdout, stderr) {
            callback(stdout);
          });
        }
        shutdown(function (output) {
          console.log(output);
        });
      } 
      // Restart
      else if (data[2] === "restart") {
        // '/r' means restart
        function restart(callback) {
          exec("shutdown /r", function (error, stdout, stderr) {
            callback(stdout);
          });
        }
        restart(function (output) {
          console.log(output);
        });
      } 
      // Hibernate
      else if (data[2] == "hibernate") {
        // '/h' means hibernate
        function hibernate(callback) {
          exec("shutdown /h", function (error, stdout, stderr) {
            callback(stdout);
          });
        }
        hibernate(function (output) {
          console.log(output);
        });
      } 
      // Logoff
      else if (data[2] === "logoff") {
        function logoff(callback) {
          // '/l' means logoff
          exec("shutdown /l", function (error, stdout, stderr) {
            callback(stdout);
          });
        }
        logoff(function (output) {
          console.log(output);
        });
      }
    }
  });
  // Socket function ends here


  // Functionality that starts app automatically on device startup
  app.setLoginItemSettings({
    openAtLogin: true
  })

  // Checking if activated and no window open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Functionality : App never quits, always runs in the background
app.on("before-quit", (e) => {
  win.hide();
  e.preventDefault();
});

// Functionality : Quit app from task manager
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
