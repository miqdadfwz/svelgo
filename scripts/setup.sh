#!/bin/bash

CHALK_RED=`tput setaf 1`
CHALK_BLUE=`tput setaf 4`
CHALK_GREEN=`tput setaf 2`
CHALK_RESET=`tput sgr0`

testcmd () {
    command -v "$1" >/dev/null
}

log() {
    echo -e "${CHALK_BLUE}> Installing dependencies with $1...${CHALK_RESET}\n"
}

if [[ -d "$PWD"/"ssl" ]]; then
    echo -e "\n${CHALK_GREEN}> You are good to go!${CHALK_RESET}"
else
    echo -e "\n${CHALK_BLUE}> Preparing SSL certificate...${CHALK_RESET}"
    if ! command -v mkcert &> /dev/null; then
        echo "${CHALK_BLUE}> Installing mkcert...${CHALK_RESET}"
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "${CHALK_RED}>>> Could not install mkcert using linux, please install manually.${CHALK_RESET}"
            exit;
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install mkcert
        fi
    fi

    mkdir ssl && cd ssl
    mkcert localhost 127.0.0.1 ::1
    
    if testcmd pnpm; then
        log pnpm
        pnpm install
    elif testcmd yarn; then
        log yarn
        yarn install
    elif testcmd npm; then
        log npm
        npm install
    fi

    echo -e "\n${CHALK_BLUE}> Preparing package.json...${CHALK_RESET}"

    if testcmd pnpm; then
        node ../scripts/update-build-script.js pnpm
    elif testcmd yarn; then
        node ../scripts/update-build-script.js yarn
    elif testcmd npm; then
        node ../scripts/update-build-script.js npm
    fi

    echo -e "\n${CHALK_GREEN}> You are good to go!${CHALK_RESET}"
    exit;
fi