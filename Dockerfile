# 使用 ARG 定義基礎 Node 版本
ARG NODE_VERSION

# 階段 1: 建構階段
FROM node:${NODE_VERSION}-alpine AS build

# 設定工作目錄
WORKDIR /root/

# 定義環境變數
ARG NPM_PACKAGE
ARG NPM_PACKAGE_VERSION
ARG NPM_ENV

# 複製 .npmrc 配置檔案
COPY .npmrc.example .npmrc

# 安裝依賴並進行配置
RUN npm install ${NPM_PACKAGE}@${NPM_PACKAGE_VERSION} \
  && npm cache clean --force \
  && rm .npmrc \
  # modify ecosystem.config.js info
  && mv node_modules/${NPM_PACKAGE}/ecosystem.config.js.example ecosystem.config.js \
  && sed -i "/script/c\script: \'/root/node_modules/${NPM_PACKAGE}/dist/main.js\'," ecosystem.config.js

# 發布的 image 從 build 裡面複製需要的檔案 => 避免機密資料外洩
FROM node:${NODE_VERSION}-alpine

WORKDIR /root/

ARG NPM_PACKAGE_VERSION
ARG NPM_ENV

ENV TZ=Asia/Taipei
ENV npm_package_version=${NPM_PACKAGE_VERSION}
ENV NPM_ENV=${NPM_ENV}

COPY --from=build /root/*.json /root/
COPY --from=build /root/*.js /root/
COPY --from=build /root/node_modules /root/node_modules
COPY start-pm2.sh /root/start-pm2.sh

# 調整時區
RUN ln -snf /usr/share/zoneinfo/"$TZ" /etc/localtime && echo "$TZ" > /etc/timezone \
  && apk add --no-cache openssl \
  && npm install -g pm2 pm2-logrotate --no-audit --no-fund \
  && pm2 install pm2-logrotate \
  && npm cache clean --force

EXPOSE 3000

# 啟動服務
CMD ["/root/start-pm2.sh"]