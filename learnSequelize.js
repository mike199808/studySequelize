const Sequelize = require('sequelize');

const sequelize = new Sequelize('test1','root','123456',{
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
})

// 测试是否连接成功
sequelize.authenticate()
    .then(() => {
        console.log('successfully');
    })
    .catch(err => {
        console.log(err);
    });

// 定义模型
const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type:Sequelize.STRING,
        allowNull: false
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false
    }
});

const information = sequelize.define('information',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    sex: {
        type:Sequelize.STRING,
        allowNull: false
    },
    // 与User关联的外键
    User_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },

});
// 同步数据到mysql
// User.sync();
// information.sync();

// 插入数据
// User.create({
//     account:'123',
//     password:'1234',
// }).then(result => {
//     console.log(result);
//     console.log('成功插入数据');
// }).catch(err => {
//     console.log(err);
// })

// information.create({
//     name:"xiaoming",
//     sex: 'male',
//     User_id: 1,
// }).then(result => {
//     console.log(result);
//     console.log('成功插入数据');
// }).catch(err => {
//     console.log(err);
// })

// 查询信息
// User.findAll({
//     where:{
//         account: '123'
//     }
// }).then(result =>{
//     console.log('查询结果：');
//     console.log(result);
// })
// information.findById(1)
//     .then(result =>{
//         console.log('查询结果：');
//         console.log(result.dataValues);
//     })

// 删除
// information.destroy({
//     where: {
//         name:'xiaoming'
//     }
// }).then(() => {
//     console.log('成功删除');
// }).catch((err) => {
//     console.log(err);
//     console.log('删除失败');
// })

// 更新信息

// User.update({

//     password:'mokaien',
// },{
//     where:{
//         account:'123'
//     }
// }).then(() => {
//     console.log('信息更新成功');
// }).catch((err) => {
//     console.log(err);
// })

// Users 与 information 进行多表查询
// information.belongsTo(User, { foreignKey:'User_id'})
// information.findOne({
//     where:{
//         id:1
//     },
//     include:[{
//         model:User,
//     }],
// }).then( result =>{
//     console.log(result);
// }).catch( err =>{
//   console.log(err);
// })

// 多表更新问题
// 好像没找到可以操作多表更新的api，查了下资料，决定用事务（transaction)解决。
// sequelize.transaction解决的优点是：把多个表的更新看成一个整体，要么ok一起更新，要么报错，全部回滚。

// (async function update(){
//     let t = await sequelize.transaction();
//     try{
//         await User.update({
//             password:'123456789'
//         },{
//             where:{
//                 account:'123'
//             },
//             transaction:t
//         })
//         await information.update({
//             id:2
//         },{
//             where:{
//                 name:'xiaoming'
//             },
//             transaction:t
//         })
//         await t.commit()
//         console.log('更新成功！！')

//     }catch(err){
//         await t.rollback()//失败后回滚，不更新
//         console.log(err);
//     }
// })()