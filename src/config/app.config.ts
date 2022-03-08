export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DAB_PORT, 10) || 5432
    }
});