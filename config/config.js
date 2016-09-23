module.exports = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
  morgan_log_level: process.env.MORGAN_LOG_LEVEL || 'dev',
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://127.0.0.01:27017/money'
};
