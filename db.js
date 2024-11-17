
const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(
//   'default_db', // Database name
//   'cloud_user', // Username
//   'ffsuR2M4p1!!', // Password
//   {
//     dialect: 'postgres',
//     host: 'ribuswiku.beget.app',
//     port: 5432, // Port
//   }
// );
// const {Sequelize} = require('sequelize')

// module.exports = new Sequelize(
//     process.env.DB_NAME, // Название БД
//     process.env.DB_USER, // Пользователь
//     process.env.DB_PASSWORD, // ПАРОЛЬ
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )


module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,

    }

)




// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// module.exports = new Sequelize('postgres://tt:71ixjgCKT8sUGCi6KVVeDvWYCxrDAXa@dpg-ciorqltph6eo8jakctjg-a/tt_ol66') // Example for postgres

// Option 2: Passing parameters separately (sqlite)



// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// module.exports = new Sequelize('postgres://tt:71ixjgCKT8sUGCi6KVVeDvWYCxrDAXa@dpg-ciorqltph6eo8jakctjg-a/tt_ol66') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
