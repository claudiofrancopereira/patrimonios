module.exports = [
  {
    name: "dbUsers",
    type: "postgres",
    database: "users",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    migrations: [process.env.TYPEORM_USERS_MIGRATIONS],
    entities: [process.env.TYPEORM_USERS_ENTITIES],
    cli: {
      "migrationsDir": process.env.TYPEORM_USERS_MIGRATIONS_DIR
    }
  },

  {
    name: "dbPatrimonios",
    type: "postgres",
    database: "patrimonios",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    migrations: [process.env.TYPEORM_PATRIMONIOS_MIGRATIONS],
    entities: [process.env.TYPEORM_PATRIMONIOS_ENTITIES],
    cli: {
      "migrationsDir": process.env.TYPEORM_PATRIMONIOS_MIGRATIONS_DIR
    }
  }
]