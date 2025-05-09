#!/bin/bash

# 讀取 .env 檔案，並將其內容載入環境變數
export $(grep -v '^#' .env | xargs)

# 確認是否有buildx的環境
function check_buildx() {
  if [ "$(docker buildx ls | grep -a 'mybuilder')" == '' ]; then
    docker buildx create --name mybuilder --platform linux/arm64,linux/amd64 --use
  fi

  printf "Buildx environment is ready\n"
}

# 確認docker是否有登入
function docker_login() {
  DOCKER_CONFIG_PATH=~/.docker/config.json

  # HARBOR_URL%%/* => 取得HARBOR_URL的domain(從後面開始尋找 / 並刪除 / 後面的字串)
  # grep -o "${HARBOR_URL%%/*}" => 取得docker config.json中的domain
  # ex: harbor.com/project => harbor.com
  if [ ! -f "$DOCKER_CONFIG_PATH" ] || [ "$(cat $DOCKER_CONFIG_PATH | grep -o "${HARBOR_URL%%/*}")" == '' ]; then
    docker login "${HARBOR_URL%%/*}"
  fi

  printf "Docker login is ready\n"
}

# 決定要使用的 NPM URL
function set_npm_url() {
  if [ "$NODE_ENV" = 'production' ]; then
    NPM_URL=$NPM_URL_PROD
  else
    NPM_URL=$NPM_URL_DEV
  fi

  printf "NPM_URL: $NPM_URL\n"
}


# 確認是否有登入NPM URL
function npm_login() {
  NPM_CONFIG_PATH=~/.npmrc
  # $() => 會替換成指令執行後的結果
  # //[^*]* => // 開頭，* 結尾，中間數量不限
  # sed 's/\///g' => 刪除全部 / 字元，替換成空字串
  # ex: //npm.pkg.github.com => npm.pkg.github.com
  URL_PART=$(echo $NPM_URL | grep -o '//[^*]*' | sed 's/\///g')

  # > /dev/null 2>&1 => 將執行結果輸出到 /dev/null(會丟棄所有輸出)
  # 2>&1 => 將標準錯誤輸出(2)到標準輸出(1)
  if [ ! npm whoami --registry=$NPM_URL >/dev/null 2>&1 ]; then
    npm login --registry=$NPM_URL
  fi

  # 取得NPM_TOKEN
  # grep -a $URL_PART => 取得包含 $URL_PART 的行
  # grep -a "_authToken" => 取得包含 _authToken 的行
  # awk -F'"' '{print $2}' => 以 " 為分隔符號，取得第二個欄位
  NPM_TOKEN=$(grep -a $URL_PART $NPM_CONFIG_PATH | grep -a "_authToken" | awk -F'"' '{print $2}')
  if [ -z "$NPM_TOKEN" ]; then
    printf "NPM_TOKEN not found\n"
    exit 1
  fi

  printf "NPM login is ready\n"
}

# 產生 .npmrc.example
function generate_npmrc() {
  local npm_tag_1
  local npm_url_part=$(echo $NPM_URL | grep -o '//[^*]*' | sed 's/\///g')

  if [[ "$NPM_TAG_1" ]]; then
    npm_tag_1=$NPM_TAG_1
  else
    npm_tag_1="@saico"
  fi

  local npm_tag_2=$(echo $npm_package_name | grep -o '@[^/]*')

  touch .npmrc.example && echo -e "engine-strict=true\nregistry=https://registry.npmjs.com" >> ./.npmrc.example \
  && echo -e "\n${npm_tag_1}:registry=${NPM_URL}" >> ./.npmrc.example \
  && echo -e "\n${npm_tag_2}:registry=${NPM_URL}" >> ./.npmrc.example \
  && echo -e "\n//${npm_url_part}/:_authToken=${NPM_TOKEN}" >> ./.npmrc.example

  printf ".npmrc.example is ready\n"
}

# 建立 Docker Image
function build_docker_image() {
  local build_command="build"
  local platform=""
  local push_flag=""

  # 如果有傳入參數 "push"，則添加 --push
  if [ "$1" = 'push' ]; then
    push_flag="--push"
  fi

  # 如果有傳入參數 "both"，則使用 buildx build 並進行雙平台 build
  if [ "$2" = 'both' ]; then
    build_command="buildx build"
    platform="--platform linux/arm64,linux/amd64"
  fi

  # grep -o '[0-9]\+' => 取得數字陣列
  # head -1 => 取得第一個
  docker $build_command -t $HARBOR_URL"-"$NODE_ENV":"$npm_package_version -t $HARBOR_URL"-"$NODE_ENV":latest" \
    --no-cache --force-rm \
    $platform $push_flag \
    --build-arg NODE_VERSION=$(echo $npm_package_engines_node | grep -o '[0-9]\+' | head -1) \
    --build-arg NPM_ENV=$NODE_ENV \
    --build-arg NPM_PACKAGE=$npm_package_name \
    --build-arg NPM_PACKAGE_VERSION=$npm_package_version .
}

function remove_npmrc() {
  rm -rf .npmrc.example
}

# Main script
check_buildx
docker_login
set_npm_url
npm_login
generate_npmrc
build_docker_image $1 $2
remove_npmrc