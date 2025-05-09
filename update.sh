#!/bin/bash

# 讀取 .env 檔案，並將其內容載入環境變數
export $(grep -v '^#' .env | xargs)

# 確定docker有登入可以執行後續的動作
function docker_login() {
  DOCKER_CONFIG_PATH=~/.docker/config.json

	# HARBOR_URL%%/* => 取得HARBOR_URL的domain(從後面開始尋找 / 並刪除 / 後面的字串)
  # grep -o "${HARBOR_URL%%/*}" => 取得docker config.json中的domain
  # ex: harbor.com/project => harbor.com
  if [ ! -f "$DOCKER_CONFIG_PATH" ] || [ "$(cat $DOCKER_CONFIG_PATH | grep -o "${HARBOR_URL%%/*}")" == '' ]; then
    docker login "docker-hub.saico.systems"
  fi

  printf "Docker login is ready\n"
}

# 拉取docker compose image
function pull_compose_images() {
	# 若是tag為latest，每次都一定會去拉取
	docker compose pull --policy=always
}

# 執行migration檢查
function migrate_check () {
  # 可傳入多個image
  run_migrations $MIGRATE_IMAGES

  if [ $? -eq 0 ]; then
    echo "Migration is finish"
  else
    exit 1
  fi

  return 0
}

# 更新docker compose
function upgrade() {
  docker compose down \
  && docker compose up -d

  printf "Upgrade is finish\n"
}

# 移除none image(因為latest tag會一直拉取，所以會有none image)
function remove_none_image() {
  docker image prune -f
}

function pull_migrate_images() {
  local images=("$@")

  for image in "${images[@]}"; do
    docker pull "$image"
  done
}

function run_migrations() {
  local images=("$@")

  pull_migrate_images "${images[@]}"

  for image in "${images[@]}"; do
    run_migrate "$image"
    if [ $? -ne 0 ]; then
      return 1
    fi
  done
}

function run_migrate() {
  local image="$1"

  # 將container的log輸出到stdout
  OUTPUT=$(docker run --rm --env-file .env "$image" 2>&1)
  EXIT_CODE=$?

  echo "$OUTPUT"

  if [ $EXIT_CODE -ne 0 ]; then
    echo "Migration failed for $image"
    return 1
  fi

  return 0
}

docker_login
pull_compose_images
migrate_check
upgrade
remove_none_image