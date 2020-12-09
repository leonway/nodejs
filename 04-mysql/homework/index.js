const Sequelize = require('sequelize')

const initModel = (seq)=>new Promise(async res=>{
  const User = seq.define('user',{
    // id:{
    //   type:Sequelize.INTEGER,
    //   autoIncrement:true,
    //   allowNull:false,
    //   primaryKey:true
    // },
    name:Sequelize.STRING
  })

  const Product = seq.define('product',{
    // id:{
    //   type:Sequelize.INTEGER,
    //   autoIncrement:true,
    //   allowNull:false,
    //   primaryKey:true
    // },
    title:Sequelize.STRING
  })

  Product.belongsTo(User)
  User.hasMany(Product)
  const result = await seq.sync()
  res({
    Product,
    User
  })
})

module.exports = {
  initModel
}
