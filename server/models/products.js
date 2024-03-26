module.exports = (sequelize, DataTypes) => {
    
    const products = sequelize.define("products", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,//Set as primary key
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_available_start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        product_available_end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { //Set as foreign key
                model: 'users', // associated table name
                key: 'user_id' // Associated field name
            }
        },
        product_is_rented: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rentee_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { //Set as foreign key
                model: 'users', // associated table name
                key: 'user_id' // Associated field name
            }
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return products;
};
