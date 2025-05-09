#!/bin/sh

# 獲取 PM2_INSTANCES 環境變數，預設為 1
PM2_INSTANCES=${PM2_INSTANCES:-1}

# 修改 ecosystem.config.js 的 instances 欄位
sed -i "s/instances: [0-9]\+/instances: ${PM2_INSTANCES}/" /root/ecosystem.config.js

# 顯示設定的 instances
echo "Set PM2 instances to ${PM2_INSTANCES}"

# 印出 版本號 和 環境
echo "server version: ${npm_package_version}"
echo "env: ${NPM_ENV}"

# 配置 pm2-logrotate
pm2 set pm2-logrotate:retain 7

# 啟動 PM2 並指定環境
pm2-runtime start ecosystem.config.js --env ${NPM_ENV}
