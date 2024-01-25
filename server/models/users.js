module.exports=(sequelize,DataTypes)=>{

    const users=sequelize.define("users",{
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_state:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_zipcode:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_phone:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_profile:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_password:{
            type:DataTypes.STRING,
            allowNull:false,
        }     
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return users;
}