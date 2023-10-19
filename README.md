How to set up this project and run it in a development environment:
I reccommend using VSCode, as I have used a VSCode extention for testing of the backend server (more on that below).
Assuming you already have git, MongoDB(7.0.1), and node.js(18.18.0) installed:

1.  Open a new folder for the project in VSCode.
2.  Open the console in that folder and run "git clone https://github.com/niluhaze/My-Recipe-Manager".
3.  Set up a MongoDB instance, e.g. using MongoDB Compass
    (I named the database "recipe-manager" with a collection "recipes")
    https://downloads.mongodb.com/compass/mongodb-compass-1.40.2-win32-x64.exe
4.  If neccessary, edit the url of your database in the ./backend/.env file.
5.  Included in the root of the repo is some test data (test-data.json). Take this and use MongoDB Compass to import it into the database.
6.  In VSCode: Open a terminal in the folder "backend" and run "npm install" to install the backend packages.
7.  Run "npm run devStart" to start the backend server.
8.  Open a second terminal in the folder "frontend" and run "npm install".
9.  Run "npm run dev" to start the frontend dev server.
10. Open "http://127.0.0.1:5173" in your browser and the fist page of the recipe list should load.

If needed, IPs and ports can be changed in the .env files in the frontend and backend folders,
just make sure they match up with each other and the CORS setting in the /backend/server.js file.

If you would like to test the backend, you can use the provided __route_test.rest and __route_test_404.rest files located in ./backend/routes
To run the queries defined in the files, you need to install the "REST Client" Extention by Huachao Mao from the VSCode marketplace.
If you have done so, you should see a "send request" button over each query which should result in a response from the server when clicked.
