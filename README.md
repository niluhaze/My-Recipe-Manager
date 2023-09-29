How to set up this project and run it in a development environment:
I reccommend using VSCode, as I have used a VSCode plugin for testing of the backend server (more on that below).
Assuming you already have git, MongoDB(7.0.1), and node.js installed:

1. Open a new folder for the project in VSCode.
2. Open the console in that folder and run "git clone https://github.com/niluhaze/My-Recipe-Manager.git".
3. Set up a MongoDB instance, e.g. using MongoDB Compass
    (I named the database "recipe-manager" with a collection "recipes")
    https://downloads.mongodb.com/compass/mongodb-compass-1.40.2-win32-x64.exe
4. If neccessary, edit the url of your database in the ./backend/.env file.
4. Included in the root of the repo is some test data (test-data.json) take this and use MongoDB Compass to import it into the database.
5. In VSCode: Open a terminal in the folder "backend" and run "npm install" to install the backend packages.
6. Run "npm run devStart" to start the backend server.
7. Open a second terminal in the folder "frontend" and again run "npm install".
8. Run "npm run dev" to start the frontend dev server.