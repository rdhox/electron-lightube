# Electron-Lightube

**This project is in his early stage of developpement.** 
The goal of this project is to propose a light electron youtube client, wrote with Typescript and React, the project use Zustand to handle globals states, with the system of models, inspired by dvaJS. The front-end part is as much as possible separated from the electron part, to easily use the front for a web-site. I developped it for fun during the quarantine to discover how electron worked. I will try to continue to project and add some features when I'll find the time. Feel free to fork or make pull requests, I will answer as soon as possible. 

## How to run the project

Clone the project. There is a folder `main` for the electron part, and a `renderer` folder for the front-end part. Those two parts are independant.
Go to each of the folder and run `yarn` to install the dependencies.
To run the project, go first to the `renderer` folder, and run `yarn start`, and do the same with the `main` folder. The electron application will start. 


## Use as a web front-end
The renderer part can be used as a classic web react project. Just remove the `useEffect` on `MainLayout.tsx` to remove the link with electron.

## Download the application

To come.


