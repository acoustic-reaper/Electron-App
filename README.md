# Remote-Shutdown-Application (Desktop Appilcation)
Hi, this repo contains code of one of the two applications built for submission in Software Development PS under
Techshila, Inter Bhawan Tech Meet organized by Student's Technical Council, IIT Roorkee.
The task was to build a simple mobile application that can shutdown/hibernate/logoff/restart the user's PC remotely via an
access code. The basic architecture included a basic front-end (to gain access to PC), a backend (to handle routing, API's and
other business logic), and a desktop application(which would be installed on the PC and will have access to PC's processes).

This is The Desktop Application code written in ElectronJS:
## Here's how to test it (NodeJS should be installed on your system): 
(You may also need to run the mobile application in another PC to test the complete project, Link to mobile
application repository: https://github.com/acoustic-reaper/React-Native-Mobile-App).

## Step 1:
### Clone this repo in your own system using:
```
git clone https://github.com/acoustic-reaper/Electron-App.git
```

## Step 2:
```
cd ./Electron-App
```

## Step 3:
### Install the required Node dependencies using:
```
npm i
```

Now you are good to test the app

## Step 6
### Start the app by running
```
npm start
```
This should start the app in your PC.

Done. You are now good to test the app.
### Caution: 
The application is designed to run in the background. Therefore simply closing it will not work. You need to use Ctrl+C 
in your terminal to close the app.
## P.S. Suggestions will be appreciated. You are welcome to send pull requests.
