module.exports = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
  morgan_log_level: process.env.MORGAN_LOG_LEVEL || 'dev',
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/money',
};