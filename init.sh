#!/bin/bash
# OS: Ubuntu 20.04

# Dockerのインストール
function install_docker() {
  sudo apt-get install -y \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io

  return 1
}


# Docker-composeのインストール
function install_docker_compose() {
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  sudo chmod +x /usr/local/bin/docker-compose

  sudo gpasswd -a $(whoami) docker

  return 1
}

# インストール時の確認
function get_confirm {
  while true; do
    echo -n "$* [y/n]: "
    read CONFIRM_RESULT
    case $CONFIRM_RESULT in
      [Yy]*)
        return 0
        ;;
      [Nn]*)
        return 1
        ;;
      *)
        echo "yまたはnを入力してください"
        ;;
    esac
  done
}


sudo apt-get update
sudo apt upgrade -y

# gitの設定
echo -n "Gitユーザー名: "
read GIT_USER_NAME

git config --global user.name $GIT_USER_NAME

echo -n "Emailアドレス: "
read GIT_USER_EMAIL

git config --global user.email $GIT_USER_EMAIL

#githooksの設定
git config core.hooksPath .githooks
chmod a+x .githooks/pre-commit

#Git管理下の.gitconfigを読み込む
git config include.path '../.gitconfig'

export LESSCHARSET=utf-8

if get_confirm "Dockerをインストールしますか？"; then
  echo "インストール中....."
  if install_docker; then
    echo "インストール完了"
  fi
else
  echo "キャンセルしました"
fi

if get_confirm "Docker Composeをインストールしますか？"; then
  echo "インストール中....."
  if install_docker_compose; then
    echo "インストール完了"
  fi
else
  echo "キャンセルしました"
fi

