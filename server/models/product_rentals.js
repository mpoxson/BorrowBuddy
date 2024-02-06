module.exports = (sequelize, DataTypes) => {
    
    const product_rentals = sequelize.define("product_rentals", {
        rental_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,//Set as primary key
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { //Set as foreign key
                model: 'users', // associated table name
                key: 'user_id' //Associated field name
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { //Set as foreign key
                model: 'products', // associated table name
                key: 'product_id' //Associated field name
            }
        },
        rental_start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rental_end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rental_is_return: {
            type: DataTypes.BOOLEAN, //Boolean is TINYINT(1) in MySQL
            allowNull: false,
        },
        rental_return_time: {
            type: DataTypes.DATE,
            allowNull: false, 
            //Default = sequelize.NOW when rental_is_return = 1 (true)?
        },
        rental_is_damage: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        rental_damage_text: {
            type: DataTypes.TEXT,
            allowNull: true, //Can be null if rental_is_damage = 0 (false)
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return product_rentals;
};
