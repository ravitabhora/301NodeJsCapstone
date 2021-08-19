require('dotenv').config();

module.exports = {
    app: {
        port: process.env.DEV_APP_PORT || 3001,
        appName: process.env.APP_NAME || 'order-management-service',
        env: process.env.NODE_ENV || 'development',
    },
    winston: {
        logpath: '/app/logs/'
    }
}