import {config as dotenvConfig} from 'dotenv';

dotenvConfig({path: '.env'})

export default () => ({
    environment: process.env.NODE_ENV || 'dev',
    database: {
        type: process.env.DB_CONNECTION,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["dist/migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: false,
    }
});