const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('User', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,defaultValue:'User'},
    phone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    birthday: {type: DataTypes.STRING},
    Role: {type: DataTypes.STRING},

    type_dost: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    time: {type: DataTypes.STRING},
    all_price: {type: DataTypes.STRING},
})


const Categoria = sequelize.define('Categoria', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Basket_Item = sequelize.define('Basket_Item', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    opisaniye: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    all_price: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    ItemsId:{type: DataTypes.INTEGER}
})
const Order_item = sequelize.define('Order_item', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    opisaniye: {type: DataTypes.STRING},
    number: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    all_price: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
})
const Item = sequelize.define('Item', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    opisaniye: {type: DataTypes.STRING},
    kkal: {type: DataTypes.STRING},
    belki: {type: DataTypes.STRING},
    ziri: {type: DataTypes.STRING},
    uglevodi: {type: DataTypes.STRING},
    ves: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
})
const Order = sequelize.define('Order', {
    id:  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    all_price: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},

    
    type_dost: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    time: {type: DataTypes.STRING},

})




User.hasMany(Order, {as: 'Order'});
Order.belongsTo(User)

User.hasMany(Basket_Item, {as: 'Basket_Item'});
Basket_Item.belongsTo(User)

Order.hasMany(Order_item, {as: 'Order_item'});
Order_item.belongsTo(Order)

Categoria.hasMany(Item, {as: 'Item'});
Item.belongsTo(Categoria)

module.exports = {
User,
Order,
Basket_Item,
Order_item,
Categoria,
Item,
}
