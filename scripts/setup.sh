#!/bin/bash

CHALK_RED=`tput setaf 1`
CHALK_BLUE=`tput setaf 4`
CHALK_GREEN=`tput setaf 2`
CHALK_RESET=`tput sgr0`

if [[ -d "$PWD"/"ssl" ]]; then
    echo -e "\n${CHALK_GREEN}>>> You are good to go!${CHALK_RESET}"
else
    echo -e "\n${CHALK_BLUE}>>> Preparing SSL certificate...${CHALK_RESET}"
    if ! command -v mkcert &> /dev/null; then
        echo "${CHALK_BLUE}>>> Installing mkcert...${CHALK_RESET}"
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "${CHALK_RED}>>> Could not install mkcert using linux, please install manually.${CHALK_RESET}"
            exit;
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install mkcert
        fi
    fi

    mkdir ssl && cd ssl
    mkcert localhost 127.0.0.1 ::1
    
    if ! command -v pnpm &> /dev/null; then
        echo "${CHALK_BLUE}>>> Installing pnpm package manager...${CHALK_RESET}"
        npm install -g pnpm
    fi
    
    pnpm install

    echo -e "\n${CHALK_GREEN}>>> You are good to go!${CHALK_RESET}"
    exit;
fi