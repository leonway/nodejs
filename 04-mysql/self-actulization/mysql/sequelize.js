(async()=>{
  const Sequelize = require('sequelize')
  //建立连接
  const sequelize = new Sequelize('kkb','root','zxc77256',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false
  })

  //定义模型
  const Fruit = sequelize.define('Fruit',{
    id:{
      type:Sequelize.DataTypes.UUID,
      defaultValue:Sequelize.DataTypes.UUIDV1,
      primaryKey:true
    },
    name:{
      type:Sequelize.STRING(20),
      allowNull:false
    },
    price:{
      type:Sequelize.FLOAT,
      allowNull:false
    },
    stock:{
      type:Sequelize.INTEGER,
      defaultValue:0
    }
  },{
    tableName:'TBL_FRUIT'
  })

  //把模型同步到数据库
  let ret = await Fruit.sync({
    force:true//强制同步 即使模型变化
  })

  ret = await Fruit.create({
    name:'苹果',
    price:'3.5'
  })
  console.log('create',ret);

  const Op = Sequelize.Op
  ret = await Fruit.findAll({
    where:{
      price:{
        [Op.lt]:7,
        [Op.gt]:6
      }
    }
  })
  console.log('findAll',JSON.stringify(ret,'','\t'));
})()
