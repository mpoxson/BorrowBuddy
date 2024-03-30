module.exports = (sequelize, DataTypes) => {
    
    const Messages = sequelize.define("Messages", {
        MessageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ConversationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Conversations',
                key: 'ConversationID'
            }
        },
        SenderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        MessageText: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Timestamp: {
            type: DataTypes.DATE,
            allowNull: true, 
            //Default = sequelize.NOW when rental_is_return = 1 (true)?
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Messages;
};