const express =require('express')
const app=express()

app.use(express.json());

const db=require('./models')

//Routers
const productsRouter=require('./routes/products')
app.use("/products",productsRouter);

const usersRouter=require('./routes/users')
app.use("/users",usersRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Server running on port 3001')
    })
    
})