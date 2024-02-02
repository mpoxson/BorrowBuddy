# BorrowBuddy

Need to have Node.js installed
Project uses react

cd borrow-buddy
npm start

EXTENSIONS FOR DEVS:
ES7+
Prettier
Postman

## Install MySQL Workbench:
- download MySql from website
- Typical install
- run configurator
- "password": "xiachen123",
- "database": "borrowbuddy" (change windows service name)
- all other options stay the same, execute
- download workbench

### --------------------------------v1--------------------------

### Server/backend(Express.js):

I have create two simple tables "products" and "users" in backend. The goal is to create a system that can be connected to MySQL Workbench for managing user and product data.

## Usage

- install MySQL Workbench `https://www.youtube.com/watch?v=u96rVINbAUI`
- cd ../BorrowBuddy/server
- npm init
- npm install express cors mysql2
- npm install nodemon
- running `npm start`.

Once the server is running, you can interact with the API endpoints to manage users and products.(because frontend doesn't create, we can use `insomnia` or `postman` to test whether they can be connected to the frontend in the future)

## API Endpoints

- GET /api/users: Retrieve a list of all users.
- GET /api/products: Retrieve a list of all products.
- POST /api/users: Add a new user to the database.
- POST /api/products: Add a new product to the database.

### Client/frontend (React.js)
