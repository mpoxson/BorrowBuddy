module.exports = (sequelize, DataTypes) => {
    
    const Conversations = sequelize.define("Conversations", {
        ConversationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'product_id'
            }
        },
        user_id1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        user_id2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        LastMessageTime: {
            type: DataTypes.DATE,
            allowNull: true, 
            //Default = sequelize.NOW when rental_is_return = 1 (true)?
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Conversations;
};
