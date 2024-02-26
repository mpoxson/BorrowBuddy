module.exports = (sequelize, DataTypes) => {
    
    const product_images = sequelize.define("product_images", {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id'
            }
        },
        image_order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_location: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return product_images;
};
