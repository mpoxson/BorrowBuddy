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
- connect to the server using the name borrowbuddy and the password above
- create a new schema called "borrowbuddy"
- see below for the rest

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
- GET /api/product_rentals: Retrieve a list of all product rentals.
- GET /api/comments: Retrieve a list of all comments.
- GET /api/ratings: Retrieve a list of all ratings.
- POST /api/users: Add a new user to the database.
- POST /api/products: Add a new product to the database.
- POST /api/product_rentals: Add a new product rental to the database.
- POST /api/comments: Add a new comment to the database.
- POST /api/ratings: Add a new rating to the database.

### Client/frontend (React.js)
