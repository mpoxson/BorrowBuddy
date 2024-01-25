# BorrowBuddy

Need to have Node.js installed
Project uses react

cd borrow-buddy
npm start

EXTENSIONS FOR DEVS:
ES7+
Prettier


----------------------v1-------------------
server/backend:
I have create two simple tables "products" and "users" in backend. The goal is to create a system that can be connected to MySQL Workbench for managing user and product data.

Usage
install MySQL Workbench `https://www.youtube.com/watch?v=u96rVINbAUI`
cd server
npm init
running `npm start`. 
Once the server is running, you can interact with the API endpoints to manage users and products.(because frontend doesn't create, we can use insomnia to test whether they can be connected to the frontend in the future )


API Endpoints
GET /api/users: Retrieve a list of all users.
GET /api/products: Retrieve a list of all products.
POST /api/users: Add a new user to the database.
POST /api/products: Add a new product to the database.