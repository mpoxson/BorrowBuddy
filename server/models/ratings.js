module.exports = (sequelize, DataTypes) => {
    
    const ratings = sequelize.define("ratings", {
        rating_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,//Set as primary key
            autoIncrement: true,
        },
        user_rated_id: { //id of user being rated!
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { //Set as foreign key
                model: 'users', // associated table name
                key: 'user_id' //Associated field name
            }
        },
        user_rating_id: { //id of user leaving the rating!
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { //Set as foreign key
                model: 'users', // associated table name
                key: 'user_id' //Associated field name
            }
        },
        rating_value: {
            type: DataTypes.TINYINT.UNSIGNED, //Keep between values 1-5
            allowNull: false,
        },
        rating_description: {
            type: DataTypes.TEXT,
            allowNull: true, //Description can be empty
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return ratings;
};
