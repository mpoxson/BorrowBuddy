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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP') //Set the default value to the current time
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Messages;
};