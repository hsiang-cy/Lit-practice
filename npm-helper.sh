#!/bin/bash

# 讀取 .env 檔案，並將其內容載入環境變數
export $(grep -v '^#' .env | xargs)

# 決定要使用的 NPM URL
function set_npm_url() {
  if [ "$NODE_ENV" = 'production' ]; then
    NPM_URL=$NPM_URL_PROD
  else
    NPM_URL=$NPM_URL_DEV
  fi
}

# 確認是否有登入
function npm_login() {
  NPM_CONFIG_PATH=~/.npmrc

  if [ ! npm whoami --registry=$NPM_URL >/dev/null 2>&1 ]; then
    npm login --registry=$NPM_URL
  fi
}

case $1 in
  "version")
    VERSION="patch"

    OPTIND=2
    while getopts "v:" opt; do
      case $opt in
        v)
          VERSION=$OPTARG
          ;;
        *)
          ;;
      esac
    done

    bash -c "npm version --no-git-tag-version $VERSION"
    ;;

  "publish")
    TAG="latest"

    set_npm_url
    npm_login

    OPTIND=2
    while getopts "t:" opt; do
      case $opt in
        t)
          TAG=$OPTARG
          ;;
        *)
          ;;
      esac
    done

    bash -c "npm publish --registry=$NPM_URL --tag $TAG"
    ;;

  *)
    echo ""
    echo "Usage:"
    echo "${0} [version | publish]"
    echo ""
    echo "發佈"
    echo ""
    echo "  ${0} publish"
    echo "    發佈到 saico npm"
    echo ""
    echo "  ${0} publish -t beta"
    echo "    發佈到 saico npm 並指定 tag"
    echo ""
    echo "更新版號"
    echo "  ${0} version"
    echo "    自動提升小版號"
    echo ""
    echo "  ${0} version -v 1.2.3"
    echo "    指定版號"
    ;;
esac
