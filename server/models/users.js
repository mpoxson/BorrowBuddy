module.exports = (sequelize, DataTypes) => {
    
    const users = sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Add unique constraint to make ensure email is unique 
        },
        user_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_profile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_profile_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

     // Add hook to check if email is unique before we creat a user info.
    users.beforeCreate(async (user, options) => {
        const existingUser = await users.findOne({ where: { user_email: user.user_email } });
        if (existingUser) {
            throw new Error('Email address is already registered');
        }
    });

    return users;
};
