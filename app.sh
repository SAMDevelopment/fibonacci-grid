#!/usr/bin/env bash
set -eo pipefail

#
# Variables
#
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NODE_SERVICE="vue-cli"

#
# Methods
#
function ownAllTheThings {
  docker-compose run --rm ${NODE_SERVICE} chown -R $(id -u):$(id -g) .
}

#
# Env variables
#
export $(cat ${ROOT_DIR}/.env | xargs)
if [[ -f ${ROOT_DIR}/.env.local ]]; then
  export $(cat ${ROOT_DIR}/.env.local | xargs)
fi

#
# Commands
#
if [[ $# -gt 0 ]]; then
  if [[ "$1" == "up" ]]; then
    shift 1
    docker-compose up -d "$@"

    echo ""
    echo "App server running on http://localhost:${APP_PORT}"
    echo "CLI UI running on http://localhost:${CLI_UI_PORT}"

  elif [[ "$1" == "setup" || "$1" == "update" ]]; then
    ./app.sh yarn install

  elif [[ "$1" == "yarn" ]]; then
    shift 1
    docker-compose run --rm ${NODE_SERVICE} yarn "$@"
    ownAllTheThings

  elif [[ "$1" == "node" ]]; then
    shift 1
    docker-compose run --rm ${NODE_SERVICE} node "$@"
    ownAllTheThings

  elif [[ "$1" == "vue" ]]; then
    shift 1
    docker-compose run --rm ${NODE_SERVICE} vue "$@"
    ownAllTheThings

  elif [[ "$1" == "test" ]]; then
    shift 1
    docker-compose run --rm ${NODE_SERVICE} yarn test:unit "$@"
    ownAllTheThings

  else
    docker-compose "$@"
  fi
else
  docker-compose ps
fi
