// "dev": "node --watch server.js"

you can use -- watch in place of dependencie nodmon as well like to auto run when save the code

// we are writing in the scripts - build section that hey savella yoou can install npm packages in the backend folder and also in the frontend folder to install the dependencies in the backend and frontend folder

Q - why we have these two commands ,, "scripts": {
"dev": "nodemon src/server.js",
"start": "node src/server.js"
}, ?

ANS - Nodemon is only required during development to auto-restart the server.
In production, we run the app using node, so nodemon is placed in devDependencies to keep the production build lightweight.
