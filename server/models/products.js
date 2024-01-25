module.exports=(sequelize,DataTypes)=>{

    const products=sequelize.define("products",{
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_price:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_available_time:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_image:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        product_is_rented:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        rentee_username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
 
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return products;
}