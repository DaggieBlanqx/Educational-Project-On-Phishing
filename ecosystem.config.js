module.exports = {
  apps: [
    {
      name: 'Educational Project On Phishing',
      script: './evil-server.js',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules', 'public'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
