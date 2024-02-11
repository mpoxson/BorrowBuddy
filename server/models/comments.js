module.exports = (sequelize, DataTypes) => {
    
    const comments = sequelize.define("comments", {
        comment_id: {
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
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        comment_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return comments;
};
